
// function to assemble data from the JSON file
async function getSenatorData() {
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


let data = getSenatorData();
console.log(data);
