using System;
using System.Text;

public static class MetaplexMetadataDecoder
{
    public static string ExtractUri(byte[] data)
    {
        // skip key + update auth + mint
        int offset = 1 + 32 + 32;

        SkipBorshString(data, ref offset); // name
        SkipBorshString(data, ref offset); // symbol

        // URI
        int uriLength = BitConverter.ToInt32(data, offset);
        offset += 4;

        string uri = Encoding.UTF8.GetString(data, offset, uriLength);
        return uri.Replace("\0", "");
    }

    private static void SkipBorshString(byte[] data, ref int offset)
    {
        int len = BitConverter.ToInt32(data, offset);
        offset += 4 + len;
    }
}