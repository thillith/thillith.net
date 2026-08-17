
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
    const track1 = data?.recenttracks?.track?.[1];
    const track2 = data?.recenttracks?.track?.[2];
    const track3 = data?.recenttracks?.track?.[3];
    const track4 = data?.recenttracks?.track?.[4];
    

    if (!track) {
      output.innerHTML = "No track found.";
      return;
    }

    const artist = track.artist?.["#text"] ?? "Unknown Artist";
    const name = track.name ?? "Unknown Track";
    const image = track.image?.[3]?.["#text"] ?? "";
    const nowPlaying = track["@attr"]?.nowplaying === "true";

    const artist1 = track1?.artist?.["#text"] ?? "Unknown Artist";
    const name1 = track1?.name ?? "Unknown Track";
    const image1 = track1?.image?.[1]?.["#text"] ?? "";

    const artist2 = track2?.artist?.["#text"] ?? "Unknown Artist";
    const name2 = track2?.name ?? "Unknown Track";
    const image2 = track2?.image?.[1]?.["#text"] ?? "";

    const artist3 = track3?.artist?.["#text"] ?? "Unknown Artist";
    const name3 = track3?.name ?? "Unknown Track";
    const image3 = track3?.image?.[1]?.["#text"] ?? "";

    const artist4 = track4?.artist?.["#text"] ?? "Unknown Artist";
    const name4 = track4?.name ?? "Unknown Track";
    const image4 = track4.image?.[1]?.["#text"] ?? "";

    output.innerHTML = `
		<div class="music-grids">
    <div class="music-now">
      <div style="display: flex; align-items: center; gap: 12px; margin: 1% ">
        ${image ? `<img src="${image}" width="25%">` : ""}

        <div>
          <div>${nowPlaying ? "Listening to:" : "Last Listened to:"}</div>
        
          <div> ${name}</div> <b>${artist}</b>

        </div>
        </div>
    </div>
    
    <div class="music-history">
    <div class="music-entry">
      <img src="${image1}"
      <div class="music-text">
      ${name1} - <br>
      ${artist1}
    </div>
      <div class="music-entry">
      <img src="${image2}"
      <div class="music-text">
      ${name2} - <br>
      ${artist2}
    </div>
      <div class="music-entry">
      <img src="${image3}"
      <div class="music-text">
      ${name3} - <br>
      ${artist3}
    </div>
      <div class="music-entry">
      <img src="${image4}"
      <div class="music-text">
      ${name4} - <br>
      ${artist4}
    </div>
		</div>
		</div>
    `;

  // ${image1 ? `<img src="${image1}" width="32px" height="32px">` : ""} ${name1} - <br> <b>${artist1}</b> 

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load Last.fm 3:";
  }
}

loadLastFM();
setInterval(loadLastFM, 10000);
