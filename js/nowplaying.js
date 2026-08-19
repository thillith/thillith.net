async function nowplaying() {
  const output = document.getElementById("nowplaying");

  try {
    const res = await fetch("https://www.thillith.net/php/lastfmapi.php?user=thillith");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const text = await res.text();
    const data = JSON.parse(text);

    const track = data?.recenttracks?.track?.[0];

    const artist = track.artist?.["#text"] ?? "Unknown Artist";
    const name = track.name ?? "Unknown Track";
    const image = track.image?.[3]?.["#text"] ?? "";
    const nowPlaying = track["@attr"]?.nowplaying === "true";
    const url = track.url;
    const artisturl = track.url.split('/_/')[0];

    //Idk how this one works lol, I found it...
    const albumurl = `https://last.fm/music/${encodeURIComponent(track.artist["#text"])}/${encodeURIComponent(track.album["#text"])}`;

    window.nowPlaying = nowPlaying;



    output.innerHTML = `
        <div class="container">

            <div><p>&gt;<a href="https://last.fm/user/thillith">${nowPlaying ? "Listening to:" : "Last Listened to:"}</a> <a href=${url}>${name} - <a href=${artisturl}><b>${artist}</b></a></p></div>

            <div style="display: flex; flex-wrap: wrap; flex-basis: content; align-items: flex-end;
            padding: 4px; background-color: #00000020; border-radius: 12px;"><a href=${albumurl}>${image ? `<img src="${image}" width="96px" height="96">` : ""}</a></div>
            </div>

        </div>
    `;

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load playing:";
  }
}

nowplaying();
setInterval(nowplaying, 15000);