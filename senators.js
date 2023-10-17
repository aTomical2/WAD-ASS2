

async function getColorData() {
    try {
        const url = "senators.json";
        const promise = await fetch(url);

        // Check if the request was successful
        if (!promise.ok) {
            throw new Error(
                `HTTP error! status: ${promise.status}`
            );
        }

        const data = await promise.json();

        displayJSON(data);
    } catch (error) {
        document.getElementById("id01").innerText = error;
    }
}
//My name is tom
// Michael1
//added even more text
// more text

let data = getColorData();
console.log(data);
