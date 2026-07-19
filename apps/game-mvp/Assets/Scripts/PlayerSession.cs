/// <summary>
/// In-memory store set by WalletAutoGameStarter before scene load.
/// Avoids async IndexedDB timing issues on WebGL.
/// </summary>
public static class PlayerSession
{
    public static string PlayerName = "...";
    public static string FarmName   = "...";
}
