using System.IO;
using UnityEngine;

public static class SpriteDiskLoader
{
    public static Sprite LoadPNG(string relativeToProjectAssets, float pixelsPerUnit = 64f)
    {
        string projectRoot = Directory.GetParent(Application.dataPath)?.FullName ?? Application.dataPath;
        string absolute = Path.Combine(projectRoot, relativeToProjectAssets.Replace('/', Path.DirectorySeparatorChar));
        if (!File.Exists(absolute)) return null;

        byte[] bytes = File.ReadAllBytes(absolute);
        Texture2D tex = new Texture2D(2, 2, TextureFormat.RGBA32, false);
        tex.filterMode = FilterMode.Point;
        tex.wrapMode = TextureWrapMode.Clamp;
        if (!tex.LoadImage(bytes)) return null;

        Rect rect = new Rect(0, 0, tex.width, tex.height);
        return Sprite.Create(tex, rect, new Vector2(0.5f, 0.0f), pixelsPerUnit);
    }
}
