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
    console.log(error);
    errorP = document.createElement("p");
    errorP.innerText = "There was an error: " + error;
    document.body.appendChild(errorP);
  }
}
senDisplayList = [
  (partyListDisplay = []),
  (stateListDisplay = []),
  (genderListDisplay = []),
  (rankListDisplay = []),
  (titleListDisplay = []),
];

function displayJSON(obj) {
  let senArray = obj.objects;

  let listOfSens = createFilterLists(senArray);

  displayParties(partySize(senArray));

  addTitledSens(senArray, listOfSens);

  addTableFilters(listOfSens);

  displayTable(senTable(senArray, listOfSens));
}

// Creates a list of all senators with titles and displays them in the body
function addTitledSens(senArray, filterLists) {
  let titledTable = document.createElement("ul");

  for (let j = 0; j < filterLists[0].length; j++) {
    for (let i = 0; i < senArray.length; i++) {
      if (
        senArray[i].leadership_title != null &&
        senArray[i].party == filterLists[0][j]
      ) {
        let newListEle = document.createElement("li")
        newListEle.innerText =
          senArray[i].leadership_title +
          ": " +
          senArray[i].person.firstname +
          " " +
          senArray[i].person.lastname +
          " (" +
          senArray[i].party +
          ")";
        titledTable.appendChild(newListEle);
      }
    }
  }
  document.body.appendChild(titledTable);
}

// creates lists of all the table elements sorted alphabetically for use in table filters
function createFilterLists(senArray) {
  party = [];
  state = [];
  gender = [];
  rank = [];
  title = [];

  for (i = 0; i < senArray.length; i++) {
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
  return [party.sort(), state.sort(), gender.sort(), rank.sort(), title.sort()];
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
  document.getElementById("senTable").appendChild(table);
}

// function to create a table holding all the senator details
function senTable(senArray, filterLists) {
  // adds the required information to the table
  function addToTable(i, senArray) {
    let sentitle = senArray[i].leadership_title;
    if (sentitle == null) {
      sentitle = "-";
    }

    let row, tdName, tdParty, tdState, tdGender, tdSenTitle;
    row = document.createElement("tr");
    let tdNametd = document.createElement("td")
    tdName = document.createElement("button");
    tdName.innerText =
      senArray[i].person.firstname + " " + senArray[i].person.lastname;

    let tdNameExtra, senLink, senLinkText, addListOfItem;
    tdNameExtra = document.createElement("div");

    addListOfItem = [
      ["Office is: ", senArray[i].extra.office],
      ["Birthday is: ", senArray[i].person.birthday],
      ["Start date was:  ", senArray[i].startdate],
      ["Twitter is:  ", senArray[i].person.twitterid],
      ["YouTube is:  ", senArray[i].person.youtubeid],
    ];

    for (let x = 0; x < addListOfItem.length; x++) {
      if (addListOfItem[x][1] != null) {
        let para = document.createElement("p");
        para.innerText = addListOfItem[x][0] + addListOfItem[x][1];
        tdNameExtra.appendChild(para);
      }
    }

    senLink = document.createElement("a");
    senLinkText = document.createTextNode(senArray[i].website);
    senLink.appendChild(senLinkText);
    senLink.href = senArray[i].website;
    senLink.target = "_blank";
    tdNameExtra.appendChild(senLink);

    tdNameExtra.style.display = "none";

    tdNameExtra.setAttribute(
      "id",
      "div" + senArray[i].person.firstname + senArray[i].person.lastname
    );

    tdName.appendChild(tdNameExtra);
    tdName.addEventListener("click", () => {
      if (tdNameExtra.style.display == "none") {
        tdNameExtra.style.display = "block";
      } else {
        tdNameExtra.style.display = "none";
      }
    });

    tdParty = document.createElement("td");
    tdParty.innerText = senArray[i].party;

    tdState = document.createElement("td");
    tdState.innerText = senArray[i].state;

    tdGender = document.createElement("td");
    tdGender.innerText = senArray[i].person.gender;

    tdSenRank = document.createElement("td");
    tdSenRank.innerText = senArray[i].senator_rank;

    tdSenTitle = document.createElement("td");
    tdSenTitle.innerText = sentitle;

    tdNametd.appendChild(tdName);
    

    row.appendChild(tdNametd)
    row.appendChild(tdParty);
    row.appendChild(tdState);
    row.appendChild(tdGender);
    row.appendChild(tdSenRank);
    row.appendChild(tdSenTitle);

    return row;
  }

  // This code iterates through the colorArray and writes html code to put the color information in a table.
  let senTable = document.createElement("table");
  let rowhead = document.createElement("tr");

  headerlist = ["Name", "Party", "State", "Gender", "Rank", "Senator Title"];
  for (let i = 0; i < headerlist.length; i++) {
    th = document.createElement("th");
    th.innerText = headerlist[i];
    rowhead.appendChild(th);
  }

  senTable.appendChild(rowhead);

  // loops through the items in the filters list to input the senators by title and then by party (dem+title, dem, inde+title, inde etc.)
  for (let j = 0; j < filterLists[0].length; j++) {
    for (let i = 0; i < senArray.length; i++) {
      if (
        senArray[i].leadership_title != null &&
        senArray[i].party == filterLists[0][j]
      ) {
        row = addToTable(i, senArray);
        senTable.appendChild(row);
      }
    }
    for (let i = 0; i < senArray.length; i++) {
      if (
        senArray[i].leadership_title == null &&
        senArray[i].party == filterLists[0][j]
      ) {
        row = addToTable(i, senArray);
        senTable.appendChild(row);
      }
    }
  }

  // Close the table element.
  return senTable;
}

// creates checkboxes for all the possible options
// adds the checkboxes to hidden dropdowns
function addTableFilters(filterlist) {
  var divTitle = ["party", "state", "gender", "rank", "senatortitle"];
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
        dropItem.setAttribute("id", "-");
        dropItem.setAttribute("type", "checkbox");
        dropItem.setAttribute("name", "-");
        dropItem.setAttribute("value", "-");
        dropItem.setAttribute("checked", "checked");
        dropItem.setAttribute("onchange", "changeTable(this)");

        dropItemLabel.setAttribute("for", "-");
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

  var divTitle = ["party", "state", "gender", "rank", "senatortitle"];

  let i = divTitle.indexOf(tableRowToSearch);

  // taken from W3 Schools Table Filter
  // Declare variables
  let input, filter, table, tr, td, txtValue;
  input = document.getElementById(location.id); // input = button clicked
  table = document.getElementById("senTable"); // table = table
  tr = table.getElementsByTagName("tr"); // the rows in a list

  // checks the checkbox ticked - if its false adds it to the list in senDisplayList
  let clickStatus = input.checked;

  // check if its a showall - if it is and true - tick all
  // if it is and false - untick all
  // return after either to stop function
  if (input.id == "showAll" + tableRowToSearch) {
    if (clickStatus == false) {
      // untick all boxes
      let untickList = document.getElementById(tableRowToSearch).childNodes;
      for (let p = 2; p < untickList.length; p++) {
        untickList[p].childNodes[0].checked = false;
        senDisplayList[i].push(untickList[p].childNodes[0].id);
      }

      // hides all rows
      for (let j = 1; j < tr.length; j++) {
        tr[j].style.display = "none";
      }
    } else {
      // when clickStatus true
      // untick all boxes
      let tickList = document.getElementById(tableRowToSearch).childNodes;
      for (let p = 2; p < tickList.length; p++) {
        tickList[p].childNodes[0].checked = true;
        senDisplayList[i] = [];
      }

      // hides all rows
      for (let j = 1; j < tr.length; j++) {
        tr[j].style.display = "table-row";
      }

      // keeps interaction with other lists
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
    return;
  }

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
