
async function loadLastFM() {
  const output = document.getElementById("lastfm");

  try {
    const res = await fetch("https://www.thillith.net/php/lastfmapi.php?user=thillith");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const text = await res.text();
    console.log("RAW:", text);

    const data = JSON.parse(text);

    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      output.innerHTML = "No track found.";
      return;
    }

    const artist = track.artist?.["#text"] ?? "Unknown Artist";
    const name = track.name ?? "Unknown Track";
    const image = track.image?.[3]?.["#text"] ?? "";
    const nowPlaying = track["@attr"]?.nowplaying === "true";

    output.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin: 1% ">
        ${image ? `<img src="${image}" width="20%" height="20%">` : ""}
        <div>
          <div>${nowPlaying ? "Listening to:" : "Last Listened to:"}</div>
          <div> ${name}</div> <b>${artist}</b>
        </div>
      </div>
    `;

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load Last.fm 3:";
  }
}

loadLastFM();
setInterval(loadLastFM, 10000);
