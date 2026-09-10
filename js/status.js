async function fetchstatus() {
  const output = document.getElementById("status");

  try {
    const res = await fetch("https://www.thillith.net/php/steam.php");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const text = await res.text();
    const data = JSON.parse(text);
    //This one may be a lil bad...
    const personastate = data.response.players[0].personastate;
    const nowPlaying = window.nowPlaying === true;

    const statusText =
    (personastate === 1 || nowPlaying) ? "<a>online</a>" : "offline";

    output.innerHTML = `
      <div class="main">
        <h3>thillith is: ${statusText}</h3>
      </div>
    `;

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to fetch status 3:";
  }
}

fetchstatus();
setInterval(fetchstatus, 1000);