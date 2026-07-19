import { type MouseEvent } from "react";

const SPOTIFY_URL =
  "https://open.spotify.com/playlist/7fsg3M9SrKGcuVp4uwmfNX?si=23c26d2aba7543ae";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function App() {
  const openSpotify = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.fbq?.("track", "Lead", {
      content_name: "Spotify Play",
      destination: "Spotify",
    });

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

          <a
            className="service-card"
            href={SPOTIFY_URL}
            onClick={openSpotify}
            aria-label="Слушать Your Love Was A Light в Spotify"
          >
            <div className="spotify-brand" aria-label="Spotify">
              <span className="spotify-icon" aria-hidden="true" />
              <span>Spotify</span>
            </div>
            <span className="play-button" aria-hidden="true">Play</span>
          </a>
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
