export async function fetchDownloadData(data) {
  await fetch(
    "https://pixf-services.onrender.com/api/v1/rc-hydrolase/download",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RC-Hydrolase_data.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => console.error("Error downloading zip file:", error));
}
