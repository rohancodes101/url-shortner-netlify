async function shorten() {
  const longUrl = document.getElementById("longUrl").value;

  const res = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl }),
  });

  const data = await res.json();

  document.getElementById("result").innerText =
    window.location.origin + "/" + data.code;
}