using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Solana.Unity.Metaplex.NFT.Library;
using Solana.Unity.Programs;
using Solana.Unity.Rpc.Models;
using Solana.Unity.Rpc.Types;
using Solana.Unity.Rpc.Builders;
using Solana.Unity.Metaplex.Utilities;
using Solana.Unity.SDK;
using Solana.Unity.Wallet;
using UnityEngine;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace Solana_Integration
{
    public static class SolanaNFTService
    {
        // Replace with your actual Program ID after deployment
        public static readonly PublicKey ProgramId = new PublicKey("82otoCGdEBr7oqCEercZSbMFM7y9fEexzYny82P5uv5z");
        
        public struct MintResult
        {
            public bool success;
            public string error;
            public string transactionHash;

            // NFT identifier (REAL identifier on Solana)
            public string mintAddress;
        }

        public static async Task<MintResult> MintNFTAsync(string packKey)
        {
            if (Web3.Account == null)
                return new MintResult { success = false, error = "Wallet not connected" };

            try
            {
                Debug.Log("[SolanaNFTService] Starting Mint");

                var mint = new Account();
                var user = Web3.Account.PublicKey;

                // ---------- PDA ----------
                PublicKey.TryFindProgramAddress(
                    new[] { Encoding.UTF8.GetBytes("mint_record"), user.KeyBytes },
                    ProgramId,
                    out var mintRecordPDA,
                    out _);

                var ata = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(user, mint.PublicKey);
                var metadataPDA = PDALookup.FindMetadataPDA(mint.PublicKey);
                var masterEditionPDA = PDALookup.FindMasterEditionPDA(mint.PublicKey);

                // ---------- Anchor discriminator ----------
                byte[] discriminator = AnchorDiscriminator("mint_nft");

                string name = "Lifetopia Starter Box";
                string symbol = "LTSB";
                string uri = "https://raw.githubusercontent.com/isonnymichael/lifetopia-nft/main/metadata.json";

                List<byte> data = new(discriminator);
                data.AddRange(EncodeString(name));
                data.AddRange(EncodeString(symbol));
                data.AddRange(EncodeString(uri));

                var blockHash = await Web3.Rpc.GetLatestBlockHashAsync();

                var tx = new TransactionBuilder()
                    .SetRecentBlockHash(blockHash.Result.Value.Blockhash)
                    .SetFeePayer(user)
                    .AddInstruction(new TransactionInstruction
                    {
                        ProgramId = ProgramId,
                        Keys = new List<AccountMeta>
                        {
                            AccountMeta.Writable(user, true),
                            AccountMeta.Writable(mintRecordPDA, false),
                            AccountMeta.Writable(mint.PublicKey, true),
                            AccountMeta.Writable(ata, false),
                            AccountMeta.Writable(metadataPDA, false),
                            AccountMeta.Writable(masterEditionPDA, false),
                            AccountMeta.ReadOnly(TokenProgram.ProgramIdKey, false),
                            AccountMeta.ReadOnly(MetadataProgram.ProgramIdKey, false),
                            AccountMeta.ReadOnly(AssociatedTokenAccountProgram.ProgramIdKey, false),
                            AccountMeta.ReadOnly(SystemProgram.ProgramIdKey, false),
                            AccountMeta.ReadOnly(SysVars.RentKey, false),
                        },
                        Data = data.ToArray()
                    });

                var transaction = Transaction.Deserialize(tx.Build(new List<Account> { Web3.Account, mint }));

                var res = await Web3.Wallet.SignAndSendTransaction(transaction);

                if (res != null && res.WasSuccessful)
                {
                    await Web3.Rpc.ConfirmTransaction(res.Result, Commitment.Confirmed);
                    return new MintResult { success = true, transactionHash = res.Result, mintAddress = mint.PublicKey };
                }

                return new MintResult { success = false, error = res?.Reason ?? "Transaction failed" };
            }
            catch (Exception e)
            {
                Debug.LogError(e);
                return new MintResult { success = false, error = e.Message };
            }
        }

        public static async Task<bool> CheckIfMintedAsync()
        {
            if (Web3.Account == null) return false;

            try
            {
                var userPubKey = Web3.Account.PublicKey;
                PublicKey.TryFindProgramAddress(
                    new[] { Encoding.UTF8.GetBytes("mint_record"), userPubKey.KeyBytes },
                    ProgramId,
                    out var mintRecordPDA,
                    out _);

                var info = await Web3.Rpc.GetAccountInfoAsync(mintRecordPDA);
                return info.WasSuccessful && info.Result.Value != null;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static async Task<string> ResolveItemIdFromMint(string mintAddress)
        {
            var mintPk = new PublicKey(mintAddress);
            var metadataPDA = PDALookup.FindMetadataPDA(mintPk);

            // retry sampai metadata muncul
            for (int i = 0; i < 15; i++)
            {
                var accInfo = await Web3.Rpc.GetAccountInfoAsync(metadataPDA, Commitment.Finalized);

                if (accInfo?.Result?.Value != null)
                {
                    byte[] raw = Convert.FromBase64String(accInfo.Result.Value.Data[0]);

                    string uri = MetaplexMetadataDecoder.ExtractUri(raw);
                    Debug.Log("[NFT] URI: " + uri);

                    using var http = new HttpClient();
                    string json = await http.GetStringAsync(uri);

                    var match = System.Text.RegularExpressions.Regex.Match(json, "\"item_id\"\\s*:\\s*\"([^\"]+)\"");
                    if (match.Success)
                        return match.Groups[1].Value;

                    match = System.Text.RegularExpressions.Regex.Match(
                        json,
                        "\"trait_type\"\\s*:\\s*\"item_id\"\\s*,\\s*\"value\"\\s*:\\s*\"([^\"]+)\""
                    );
                    if (match.Success)
                        return match.Groups[1].Value;

                    match = System.Text.RegularExpressions.Regex.Match(
                        json,
                        "\"lifetopia_metadata\"\\s*:\\s*\\{[^}]*\"id\"\\s*:\\s*\"([^\"]+)\""
                    );
                    if (match.Success)
                    {
                        Debug.Log("[NFT] item_id = " + match.Groups[1].Value);
                        return match.Groups[1].Value;
                    }

                    Debug.LogWarning("[NFT] item_id not found yet");
                }

                await Task.Delay(1500); // tunggu slot berikutnya
            }

            Debug.LogError("[NFT] metadata never appeared");
            return "starter_box_base";
        }

        private static byte[] EncodeString(string str)
        {
            byte[] strBytes = Encoding.UTF8.GetBytes(str);
            byte[] lengthBytes = BitConverter.GetBytes((uint)strBytes.Length);
            byte[] result = new byte[4 + strBytes.Length];
            Array.Copy(lengthBytes, 0, result, 0, 4);
            Array.Copy(strBytes, 0, result, 4, strBytes.Length);
            return result;
        }

        public static byte[] AnchorDiscriminator(string name)
        {
            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes($"global:{name}"));
            return hash.Take(8).ToArray();
        }
    }
}
