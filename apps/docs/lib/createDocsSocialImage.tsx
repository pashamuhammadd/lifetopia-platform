import { ImageResponse } from "next/og";

export const docsSocialImageSize = {
  width: 1200,
  height: 630,
};

export function createDocsSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #fffaf0 0%, #f8edd6 52%, #e7f2ec 100%)",
          color: "#38271e",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            left: -160,
            top: -170,
            borderRadius: 999,
            background:
              "rgba(241, 193, 91, 0.3)",
            filter: "blur(20px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            right: -130,
            bottom: -190,
            borderRadius: 999,
            background:
              "rgba(111, 166, 190, 0.25)",
            filter: "blur(24px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 32,
            display: "flex",
            borderRadius: 32,
            border:
              "2px solid rgba(117, 83, 52, 0.14)",
            background:
              "rgba(255, 253, 248, 0.72)",
            boxShadow:
              "0 28px 80px rgba(79, 53, 34, 0.12)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "stretch",
            padding: 58,
          }}
        >
          <div
            style={{
              width: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 28,
              background:
                "linear-gradient(145deg, #5d422f, #38271e)",
              color: "white",
              boxShadow:
                "0 28px 60px rgba(56, 39, 30, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 108,
                  height: 108,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 26,
                  border:
                    "2px solid rgba(255,255,255,0.15)",
                  background:
                    "rgba(255,255,255,0.08)",
                  fontSize: 54,
                  color: "#ffe09a",
                }}
              >
                ◫
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#ffe09a",
                }}
              >
                OFFICIAL DOCS
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 58,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#946c25",
              }}
            >
              LIFETOPIA WORLD
            </div>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                maxWidth: 700,
                fontSize: 72,
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: "-0.055em",
                color: "#38271e",
              }}
            >
              Lifetopia Documentation
            </div>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                maxWidth: 700,
                fontSize: 27,
                lineHeight: 1.4,
                fontWeight: 600,
                color: "#756654",
              }}
            >
              Project, product, development,
              architecture, funding, economy, and
              community documentation.
            </div>

            <div
              style={{
                marginTop: 34,
                display: "flex",
                alignItems: "center",
                gap: 13,
                fontSize: 21,
                fontWeight: 800,
                color: "#647653",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#8da27a",
                }}
              />

              docs.lifetopiaworld.io
            </div>
          </div>
        </div>
      </div>
    ),
    docsSocialImageSize,
  );
}