async function loadxmr() {
  const output = document.getElementById("xmr");

  try {
    const res = await fetch("https://www.thillith.net/php/xmr.php");

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const text = await res.text();
    const data = JSON.parse(text);

    const hash2 = (data.hash2 / 1000).toFixed(1);
    const totalHash = (data.totalHash / 1).toFixed();
    const validShares =data.validShares;

    output.innerHTML = `
      <div><h2>${hash2} KH/s</h2></div>
      <div><h2>${totalHash} Total hashes</h2></div>
      <div><h2>${validShares} Valid shares</h2></div>
    `;

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load hashrate 3:";
  }
}

loadxmr();
setInterval(loadxmr, 30000);