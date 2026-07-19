using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using TMPro;

public static class HudPrimitives
{
    public static RectTransform TopBar(Transform canvas, string name, float height = 60f)
    {
        GameObject row = new GameObject(name);
        row.transform.SetParent(canvas, false);
        RectTransform rr = row.AddComponent<RectTransform>();
        rr.anchorMin = new Vector2(0f, 1f);
        rr.anchorMax = new Vector2(1f, 1f);
        rr.pivot = new Vector2(0.5f, 1f);
        rr.anchoredPosition = new Vector2(0f, -6f);
        rr.sizeDelta = new Vector2(0f, height);

        HorizontalLayoutGroup h = row.AddComponent<HorizontalLayoutGroup>();
        h.spacing = 6f;
        h.childAlignment = TextAnchor.MiddleCenter;
        h.childControlWidth = false;
        h.childForceExpandWidth = false;
        h.padding = new RectOffset(12, 12, 4, 4);

        return rr;
    }

    public static GameObject RowButton(RectTransform row, float width, string label,
        UnityAction onClick, bool purple = false, Sprite spriteOverride = null)
    {
        GameObject go = new GameObject(Sanitize(label) + "_BTN");
        go.transform.SetParent(row, false);

        LayoutElement le = go.AddComponent<LayoutElement>();
        le.preferredWidth = width;

        Image bg = go.AddComponent<Image>();
        if (spriteOverride != null)
        {
            bg.sprite = spriteOverride;
            bg.type = Image.Type.Simple;
            bg.color = Color.white;
        }
        else
        {
            bg.color = purple ? new Color(0.46f, 0.29f, 0.71f)
                : new Color(0.42f, 0.3f, 0.14f);
        }

        Button b = go.AddComponent<Button>();
        b.targetGraphic = bg;
        if (onClick != null) b.onClick.AddListener(onClick);

        go.AddComponent<Shadow>();
        go.AddComponent<Outline>();
        go.AddComponent<UiButtonFeedback>();

        GameObject tgo = new GameObject("Lbl");
        tgo.transform.SetParent(go.transform, false);

        RectTransform tg = tgo.AddComponent<RectTransform>();
        tg.anchorMin = Vector2.zero;
        tg.anchorMax = Vector2.one;
        tg.offsetMin = Vector2.zero;
        tg.offsetMax = Vector2.zero;

        TextMeshProUGUI tm = tgo.AddComponent<TextMeshProUGUI>();
        tm.text = label;
        tm.alignment = TextAlignmentOptions.Center;
        tm.fontSize = Mathf.Clamp(width * 0.22f, 14f, 22f);

        bool goldish = label.IndexOf("GOLD", System.StringComparison.Ordinal) >= 0;
        tm.color = (purple || goldish) ? new Color(1f, 0.93f, 0.26f) : Color.white;

        return go;
    }

    static string Sanitize(string s)
    {
        return s.Replace(" ", "").Replace("(", "").Replace(")", "").Replace("/", "");
    }

    public static GameObject ModalFullscreen(Transform canvas, string name, Vector2 panelSize,
        out RectTransform centeredPanel)
    {
        GameObject root = new GameObject(name);
        root.transform.SetParent(canvas, false);
        RectTransform rt = root.AddComponent<RectTransform>();
        rt.anchorMin = Vector2.zero;
        rt.anchorMax = Vector2.one;
        rt.offsetMin = Vector2.zero;
        rt.offsetMax = Vector2.zero;

        Image dim = root.AddComponent<Image>();
        dim.color = new Color(0f, 0f, 0f, 0.58f);
        dim.raycastTarget = true;

        CanvasGroup cg = root.AddComponent<CanvasGroup>();
        cg.blocksRaycasts = true;

        GameObject pane = new GameObject("PanelInner");
        pane.transform.SetParent(root.transform, false);

        centeredPanel = pane.AddComponent<RectTransform>();
        centeredPanel.anchorMin = centeredPanel.anchorMax = new Vector2(0.5f, 0.5f);
        centeredPanel.anchoredPosition = Vector2.zero;
        centeredPanel.sizeDelta = panelSize;

        Image pImg = pane.AddComponent<Image>();
        pImg.color = new Color(0.78f, 0.64f, 0.42f);

        Outline o = pane.AddComponent<Outline>();
        o.effectColor = new Color(0.7f, 0.55f, 0.12f);

        return root;
    }

    /// <summary>Absolute positioning inside a modal panel.</summary>
    public static Button CenterPushButton(RectTransform panel, Vector2 anchoredPos,
        Vector2 size, string label, UnityAction click, bool purple = false,
        Sprite spriteOverride = null)
    {
        GameObject go = new GameObject(Sanitize(label) + "_BTN");
        go.transform.SetParent(panel, false);

        RectTransform rr = go.AddComponent<RectTransform>();
        rr.anchorMin = rr.anchorMax = new Vector2(0.5f, 0.5f);
        rr.pivot = new Vector2(0.5f, 0.5f);
        rr.anchoredPosition = anchoredPos;
        rr.sizeDelta = size;

        Image bg = go.AddComponent<Image>();
        if (spriteOverride != null)
        {
            bg.sprite = spriteOverride;
            bg.type = Image.Type.Simple;
            bg.color = Color.white;
        }
        else
        {
            bg.color = purple ? new Color(0.46f, 0.29f, 0.71f) : new Color(0.35f, 0.26f, 0.13f);
        }

        Button b = go.AddComponent<Button>();
        b.targetGraphic = bg;
        if (click != null)
            b.onClick.AddListener(click);

        go.AddComponent<Shadow>();
        go.AddComponent<Outline>();
        go.AddComponent<UiButtonFeedback>();

        GameObject tgo = new GameObject("Lbl");
        tgo.transform.SetParent(go.transform, false);

        RectTransform tg = tgo.AddComponent<RectTransform>();
        tg.anchorMin = Vector2.zero;
        tg.anchorMax = Vector2.one;
        tg.offsetMin = Vector2.zero;
        tg.offsetMax = Vector2.zero;

        TextMeshProUGUI tm = tgo.AddComponent<TextMeshProUGUI>();
        tm.text = label;
        tm.alignment = TextAlignmentOptions.Center;
        tm.fontSize = Mathf.Clamp(size.y * 0.42f, 13f, 22f);

        tm.color = purple ? Color.white : Color.white;

        return b;
    }

    public static TextMeshProUGUI Write(RectTransform panel, Vector2 anchored, Vector2 size,
        string text, float fontsize, Color col,
        TextAlignmentOptions align)
    {
        GameObject tg = new GameObject("TXT");
        tg.transform.SetParent(panel, false);

        RectTransform rr = tg.AddComponent<RectTransform>();
        rr.anchorMin = rr.anchorMax = new Vector2(0.5f, 0.5f);
        rr.anchoredPosition = anchored;
        rr.sizeDelta = size;

        TextMeshProUGUI t = tg.AddComponent<TextMeshProUGUI>();
        t.text = text;
        t.fontSize = fontsize;
        t.color = col;
        t.alignment = align;

        return t;
    }
}
