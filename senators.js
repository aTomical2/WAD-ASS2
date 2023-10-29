getData();

async function getData() {
  try {
    const url = "senators.json";
    const promise = await fetch(url);

    // Check if the request was successful
    if (!promise.ok) {
      throw new Error(`HTTP error! status: ${promise.status}`);
    }

    const data = await promise.json();
    displayJSON(data);
    return data;
  } catch (error) {
    document.getElementById("senTable").innerText = error;
  }
}
senDisplayList = [
  (nameListDisplay = []),
  (partyListDisplay = []),
  (stateListDisplay = []),
  (genderListDisplay = []),
  (rankListDisplay = []),
  (titleListDisplay = []),
];

function displayJSON(obj) {
  let senArray = obj.objects;

  addTableFilters(createFilterLists(senArray));

  displayParties(partySize(senArray));

  displayTable(senTable(senArray));
}

// creates lists of all the table elements sorted alphabetically for use in table filters
function createFilterLists(senArray) {
  names = [];
  party = [];
  state = [];
  gender = [];
  rank = [];
  title = [];

  for (i = 0; i < senArray.length; i++) {
    if (
      !names.includes(
        senArray[i].person.firstname + " " + senArray[i].person.lastname
      )
    ) {
      names.push(
        senArray[i].person.firstname + " " + senArray[i].person.lastname
      );
    }
    if (!party.includes(senArray[i].party)) {
      party.push(senArray[i].party);
    }
    if (!state.includes(senArray[i].state)) {
      state.push(senArray[i].state);
    }
    if (!gender.includes(senArray[i].person.gender)) {
      gender.push(senArray[i].person.gender);
    }
    if (!rank.includes(senArray[i].senator_rank)) {
      rank.push(senArray[i].senator_rank);
    }
    if (!title.includes(senArray[i].leadership_title)) {
      title.push(senArray[i].leadership_title);
    }
  }
  return [
    names.sort(),
    party.sort(),
    state.sort(),
    gender.sort(),
    rank.sort(),
    title.sort(),
  ];
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

  // adds the Table to the element with the ID tag senTable
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
    "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>Senator Title</th></tr>";

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
      senArray[i].leadership_title == null &&
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
      senArray[i].party == "Republican"
    ) {
      addToTable(i, senArray);
    }
  }
  for (let i = 0; i < senArray.length; i++) {
    if (
      senArray[i].leadership_title == null &&
      senArray[i].party == "Independent"
    ) {
      addToTable(i, senArray);
    }
  }

  // Close the table element.
  senTable += "</table>";
  return senTable;
}

// creates checkboxes for all the possible options
// adds the checkboxes to hidden dropdowns
function addTableFilters(filterlist) {
  var divTitle = ["name", "party", "state", "gender", "rank", "senatortitle"];
  for (let i = 0; i < filterlist.length; i++) {
    let dropDownDiv = document.createElement("div");
    dropDownDiv.setAttribute("id", divTitle[i]);
    dropDownDiv.setAttribute("class", "dropdown");
    document.body.appendChild(dropDownDiv);

    let newDropdown = document.createElement("ul");
    dropDownDiv.appendChild(newDropdown);
    let showAll = document.createElement("li");
    showAllInput = document.createElement("input");
    showAllLabel = document.createElement("label");

    showAllInput.setAttribute("id", "showAll" + divTitle[i]);
    showAllInput.setAttribute("type", "checkbox");
    showAllInput.setAttribute("name", "showAll");
    showAllInput.setAttribute("value", "showAll");
    showAllInput.setAttribute("checked", "checked");
    showAllInput.setAttribute("onchange", "changeTable(this)");

    showAllLabel.setAttribute("for", "showAll" + divTitle[i]);
    showAllLabel.innerHTML = "Show All";

    dropDownDiv.appendChild(showAll);
    showAll.appendChild(showAllInput);
    showAll.appendChild(showAllLabel);

    for (let j = 0; j < filterlist[i].length; j++) {
      let drop = document.createElement("li");
      let dropItem = document.createElement("input");
      let dropItemLabel = document.createElement("label");

      if (filterlist[i][j] != undefined) {
        dropItem.setAttribute("id", filterlist[i][j]);
        dropItem.setAttribute("type", "checkbox");
        dropItem.setAttribute("name", filterlist[i][j]);
        dropItem.setAttribute("value", filterlist[i][j]);
        dropItem.setAttribute("checked", "checked");
        dropItem.setAttribute("onchange", "changeTable(this)");

        dropItemLabel.setAttribute("for", filterlist[i][j]);
        dropItemLabel.innerHTML = filterlist[i][j];
      } else {
        dropItem.setAttribute("id", filterlist[i][j]);
        dropItem.setAttribute("type", "checkbox");
        dropItem.setAttribute("name", filterlist[i][j]);
        dropItem.setAttribute("value", filterlist[i][j]);
        dropItem.setAttribute("checked", "checked");
        dropItem.setAttribute("onchange", "changeTable(this)");

        dropItemLabel.setAttribute("for", filterlist[i][j]);
        dropItemLabel.innerHTML = "-";
      }
      dropDownDiv.appendChild(drop);
      drop.appendChild(dropItem);
      drop.appendChild(dropItemLabel);
    }
  }
}

// function to change the table based on which checkbox filters are clicked
function changeTable(location) {
  // parent is the div that the tickbox was ticked in
  // tableRowToSearch is the ID of the div
  // i is then the index used for while row to apply the changes to
  var parentDiv = location.parentNode.parentNode;
  var tableRowToSearch = parentDiv.id;

  var divTitle = ["name", "party", "state", "gender", "rank", "senatortitle"];

  let i = divTitle.indexOf(tableRowToSearch);

  // taken from W3 Schools Table Filter
  // Declare variables
  var input, filter, table, tr, td, txtValue;
  input = document.getElementById(location.id);
  filter = input.value;
  table = document.getElementById("senTable");
  tr = table.getElementsByTagName("tr");

  // checks the checkbox ticked - if its false adds it to the list in senDisplayList
  let clickStatus = input.checked;
  if (clickStatus == false) {
    senDisplayList[i].push(input.id);

    // Previous code used to hide items as they were selected
    // taken out but maintained incase a bug is found

    // for (let j = 0; j < tr.length; j++){
    //   td = tr[j].getElementsByTagName("td")[i]
    //   if (td){
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue == input.id){
    //       tr[j].style.display = "none"
    //     }
    //   }

    // }

    // if it's true it removes it from the list and displays it
  } else {
    tempIndex = senDisplayList[i].indexOf(input.id);
    senDisplayList[i].splice(tempIndex, 1);
    for (let j = 0; j < tr.length; j++) {
      td = tr[j].getElementsByTagName("td")[i];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue == input.id) {
          tr[j].style.display = "table-row";
        }
      }
    }
  }

  // does a final loop through all the rows setting anything in the lists to display none
  for (let w = 0; w < senDisplayList.length; w++) {
    for (let n = 0; n < senDisplayList[w].length; n++) {
      for (let j = 0; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td")[w];
        if (td) {
          txtValue = td.textContent || td.innerText;
          let iteminlist = senDisplayList[w][n];

          if (txtValue == iteminlist) {
            tr[j].style.display = "none";
          }
        }
      }
    }
  }
}

function ChangeData() {
  console.log(senArray);
}
