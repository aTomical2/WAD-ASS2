// function to assemble data from the JSON file
async function getSenatorData() {
  try {
    const url = "http://127.0.0.1:5500/senators.json";
    const promise = await fetch(url);

    // Check if the request was successful
    if (!promise.ok) {
      throw new Error(`HTTP error! status: ${promise.status}`);
    }

    const data = await promise.json();
    return data;

    // return data;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {

  let rawData = await getSenatorData();
  console.log(rawData)
  let senatorList = rawData.objects;
  console.log(senatorList)
}
);

