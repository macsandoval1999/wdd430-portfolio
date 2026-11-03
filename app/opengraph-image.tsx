import { ImageResponse } from "next/og";

const previewSize = {
    width: 1200,
    height: 630,
};

export default function previewImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "64px",
                    background: "#100c10",
                    color: "#fff7f2",
                    border: "12px solid #e85a66",
                    fontFamily: "Arial",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        color: "#ff8992",
                        fontSize: 24,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                    }}
                >
                    <span
                        style={{
                            width: 18,
                            height: 18,
                            background: "#e85a66",
                            borderRadius: 9,
                        }}
                    />
                    PORTFOLIO
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        Marco Sandoval
                    </div>
                    <div
                        style={{
                            marginTop: 16,
                            color: "#ff8992",
                            fontSize: 34,
                            fontWeight: 600,
                        }}
                    >
                        Full-Stack Developer
                    </div>
                    <div
                        style={{
                            marginTop: 24,
                            color: "#c7b9c0",
                            fontSize: 25,
                        }}
                    >
                        Software Engineering · BYU-Idaho
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#c7b9c0",
                        fontSize: 20,
                    }}
                >
                    <span>Projects · Experience · Education</span>
                    <span>macsandoval1999</span>
                </div>
            </div>
        ),
        previewSize,
    );
}
