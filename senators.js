// function to assemble data from the JSON file
async function getSenatorData() {
  try {
    // const url = "http://127.0.0.1:5500/senators.json";
    const url = "/senators.json";
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

let data = getSenatorData()
  .then(x => {
    data = x;
  });


let button = document.createElement('button')
button.innerText = 'PLEASE WORK'
button.addEventListener('click', () => {
  console.log(data)})
document.querySelector('body').append(button)