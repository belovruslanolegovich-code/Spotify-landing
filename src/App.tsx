import { useEffect } from "react";

const META_PIXEL_ID = "YOUR_META_PIXEL_ID";
const SPOTIFY_URL =
  "https://open.spotify.com/playlist/7fsg3M9SrKGcuVp4uwmfNX?si=23c26d2aba7543ae";

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: unknown;
  }
}

interface MetaPixelFunction {
  (...args: unknown[]): void;
  queue: unknown[][];
  push: MetaPixelFunction;
  loaded: boolean;
  version: string;
}

function initialiseMetaPixel() {
  if (!META_PIXEL_ID || META_PIXEL_ID === "YOUR_META_PIXEL_ID" || window.fbq) return;

  const fbq = function (...args: unknown[]) {
    fbq.queue.push(args);
  } as MetaPixelFunction;

  Object.assign(fbq, {
    push: fbq,
    loaded: true,
    version: "2.0",
    queue: [],
  });

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
  fbq("track", "ViewContent", {
    content_name: "Your Love Was A Light",
    content_category: "Music",
  });
}

export default function App() {
  useEffect(() => {
    initialiseMetaPixel();
  }, []);

  const openSpotify = () => {
    window.fbq?.("trackCustom", "SpotifyClick", {
      content_name: "Your Love Was A Light",
      artist: "fedor pate",
      destination: "Spotify",
    });
    window.fbq?.("track", "Lead", { content_name: "Spotify Play" });

    window.setTimeout(() => {
      window.location.href = SPOTIFY_URL;
    }, window.fbq ? 180 : 0);
  };

  return (
    <main className="release-page">
      <section className="art-panel" aria-label="Обложка релиза">
        <div className="cover-art" role="img" aria-label="Your Love Was A Light — fedor pate" />
      </section>

      <section className="info-panel">
        <div className="release-content">
          <header className="release-heading">
            <h1>Your Love Was A Light</h1>
            <p>fedor pate</p>
          </header>

          <div className="service-card">
            <div className="spotify-brand" aria-label="Spotify">
              <span className="spotify-icon" aria-hidden="true" />
              <span>Spotify</span>
            </div>
            <button type="button" onClick={openSpotify} aria-label="Слушать Your Love Was A Light в Spotify">
              Play
            </button>
          </div>
        </div>

        <footer>
          <span>© 2026 fedor pate</span>
          <span aria-hidden="true">·</span>
          <a href="mailto:prigidabreven@gmail.com">Contact</a>
        </footer>
      </section>
    </main>
  );
}
