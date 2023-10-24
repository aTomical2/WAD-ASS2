getColorData();

async function getColorData() {
  try {
    const url = "senators.json";
    const promise = await fetch(url);

    // Check if the request was successful
    if (!promise.ok) {
      throw new Error(`HTTP error! status: ${promise.status}`);
    }

    const data = await promise.json();
    displayJSON(data);
  } catch (error) {
    document.getElementById("senTable").innerText = error;
  }
}

function displayJSON(obj) {
  let senArray = obj.objects;

  displayParties(partySize(senArray));

  displayTable(senTable(senArray));
}

// Function to display the dictionary data for parties
function displayParties(partyDict) {
  let partyNums = document.createElement("div");
  partyNums.setAttribute("id", "partyNums");
  document.body.appendChild(partyNums);

  for (const key in partyDict) {
    document.getElementById("partyNums").innerHTML +=
      "There are " + partyDict[key] + " " + key + "<br>";
  }
}

// function to create a dictionary of the party sizes
function partySize(senArray) {
  let partyDict = {};
  for (let i = 0; i < senArray.length; i++) {
    let party = senArray[i].party;
    if (partyDict[party] === undefined) {
      partyDict[party] = 1;
    } else {
      partyDict[party]++;
    }
  }
  return partyDict;
}

// function to display the table of senators
function displayTable(table) {
  let elemDiv = document.createElement("div");
  elemDiv.setAttribute("id", "senTable");
  document.body.appendChild(elemDiv);

  // Add the new html code to the div element with id = 'id01'.
  document.getElementById("senTable").innerHTML = table;
}

// function to create a table holding all the senator details
function senTable(senArray) {
  // adds the required information to the table
  function addToTable(i, senArray) {
    let firstname = senArray[i].person.firstname;
    let surname = senArray[i].person.lastname;
    let party = senArray[i].party;
    let state = senArray[i].state;
    let gender = senArray[i].person.gender;
    let rank = senArray[i].senator_rank;
    let sentitle = senArray[i].leadership_title;
    if (sentitle == null) {
      sentitle = "-";
    }

    senTable +=
      "<tr><td>" +
      firstname +
      " " +
      surname +
      "</td><td>" +
      party +
      "</td><td>" +
      state +
      "</td><td>" +
      gender +
      "</td><td>" +
      rank +
      "</td><td>" +
      sentitle +
      "</td></tr>";
  }

  // This code iterates through the colorArray and writes html code to put the color information in a table.
  let senTable = "<table>";

  senTable +=
    "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>Senator Title</th>";

  // uses first for loop to check for dem + title
  // second for repub + title
  // third for dem no title
  // fourth for repub no title
  for (let i = 0; i < senArray.length; i++) {
    if (
      senArray[i].leadership_title != null &&
      senArray[i].party == "Democrat"
    ) {
      addToTable(i, senArray);
    }
  }
  for (let i = 0; i < senArray.length; i++) {
    if (
      senArray[i].leadership_title != null &&
      senArray[i].party == "Republican"
    ) {
      addToTable(i, senArray);
    }
  }
  for (let i = 0; i < senArray.length; i++) {
    if (
      senArray[i].leadership_title == null &&
      senArray[i].party == "Democrat"
    ) {
      addToTable(i, senArray);
    }
  }
  for (let i = 0; i < senArray.length; i++) {
    if (
      senArray[i].leadership_title == null &&
      senArray[i].party == "Republican"
    ) {
      addToTable(i, senArray);
    }
  }

  // Close the table element.
  senTable += "</table>";
  return senTable;
}

// addTableFilters() {

// }
