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
  (nameListDisplay = []),
  (partyListDisplay = []),
  (stateListDisplay = []),
  (genderListDisplay = []),
  (rankListDisplay = []),
  (titleListDisplay = []),
];

function displayJSON(obj) {
  let senArray = obj.objects;
  // Adds a main header to the page
  let pageHead = document.createElement("h1");

  let pageHead_left = document.createElement("div");
  let pageHead_centre = document.createElement("div");
  let pageHead_right = document.createElement("div");

  pageHead_left.innerText = String.fromCharCode(160); //same as "\xa0"
  pageHead_centre.innerText = "Senators in JSON file";
  pageHead_right.innerText = "\xa0"; //same as string from char code

  pageHead.setAttribute("class", "top_header");
  pageHead_left.setAttribute("class", "col_1");
  pageHead_centre.setAttribute("class", "col_10");
  pageHead_right.setAttribute("class", "row"); //class "row" clears rest of line

  pageHead.appendChild(pageHead_left);
  pageHead.appendChild(pageHead_centre);
  pageHead.appendChild(pageHead_right);

  document.body.appendChild(pageHead);

  let listOfSens = createFilterLists(senArray);

  // heading followed by the amount of senators in each party
  let partyHead = document.createElement("h2");
  let partyHead_left = document.createElement("div");
  let partyHead_centre = document.createElement("div");
  let partyHead_right = document.createElement("div");

  partyHead_left.innerText = String.fromCharCode(160); //same as "\xa0"
  partyHead_centre.innerText = "Number of Senators in each Party";
  partyHead_right.innerText = "\xa0"; //same as string from char code

  partyHead.setAttribute("class", "section_header");
  partyHead_left.setAttribute("class", "col_1");
  partyHead_centre.setAttribute("class", "col_10");
  partyHead_right.setAttribute("class", "row"); //class "row" clears rest of line

  partyHead.appendChild(partyHead_left);
  partyHead.appendChild(partyHead_centre);
  partyHead.appendChild(partyHead_right);

  document.body.appendChild(partyHead);
  displayParties(partySize(senArray));

  // Adds the titled senators to a list and displays with heading
  addTitledSens(senArray, listOfSens);

  // heading followed by function to create and adds the table filters
  filterHead = document.createElement("h2"); //create header box
  //create gridview elements for inside h2 box
  filterHead_left = document.createElement("div");
  filterHead_centre = document.createElement("div");
  filterHead_right = document.createElement("div");
  //set inner text for gridview, elements must not be empty
  filterHead_left.innerText = "\xa0";
  filterHead_centre.innerText = "Filters";
  filterHead_right.innerText = "\xa0";
  //set classes for divs
  filterHead_left.setAttribute("class", "col_1");
  filterHead_centre.setAttribute("class", "col_10");
  filterHead_right.setAttribute("class", "row");
  //add divs to header box
  filterHead.append(filterHead_left);
  filterHead.append(filterHead_centre);
  filterHead.append(filterHead_right);

  filterHead.setAttribute("class", "section_header");

  document.body.append(filterHead);
  addTableFilters(listOfSens);

  // adds the Table to the page
  displayTable(senTable(senArray, listOfSens));
}

// Creates a list of all senators with titles and displays them in the body
function addTitledSens(senArray, filterLists) {
  // adds a title to the section
  let titletableHead = document.createElement("h2"); //create header box

  //create gridview elements for inside h2 box
  titletableHead_left = document.createElement("div");
  titletableHead_centre = document.createElement("div");
  titletableHead_right = document.createElement("div");
  //set inner text for gridview, elements must not be empty
  titletableHead_left.innerText = "\xa0";
  titletableHead_centre.innerText = "Senators with Titles";
  titletableHead_right.innerText = "\xa0";
  //set classes for divs
  titletableHead_left.setAttribute("class", "col_1");
  titletableHead_centre.setAttribute("class", "col_10");
  titletableHead_right.setAttribute("class", "row");
  //add divs to header box
  titletableHead.append(titletableHead_left);
  titletableHead.append(titletableHead_centre);
  titletableHead.append(titletableHead_right);

  titletableHead.setAttribute("class", "section_header");

  document.body.appendChild(titletableHead);

  let titledTable_left = document.createElement("div");
  titledTable_left.innerText = "\xa0";
  titledTable_left.setAttribute("class", "col_1");

  let titledTable_right = document.createElement("div");
  titledTable_right.innerText = "\xa0";
  titledTable_right.setAttribute("class", "row");

  let titledTable = document.createElement("ul");
  titledTable.setAttribute("class", "col_10");
  // iterates through the lists supplied by the function
  // uses the lists to iterate through any party name in the list
  // adds to the ul if the senator has a title
  // using lists keeps the searches ordered - i.e. dems, indes, repubs
  for (let j = 0; j < filterLists[1].length; j++) {
    for (let i = 0; i < senArray.length; i++) {
      if (
        senArray[i].leadership_title != null &&
        senArray[i].party == filterLists[1][j]
      ) {
        let newListEle = document.createElement("li");
        newListEle.setAttribute(
          "class",
          "titled_senators_list_" + senArray[i].party
        );
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
  // adds it to the body

  document.body.appendChild(titledTable_left);
  document.body.appendChild(titledTable);
  document.body.appendChild(titledTable_right);
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
    // using !list.includes checks if there is an object with matching values in array and adds it if there isn't
    if (
      !names.includes(
        senArray[i].person.firstname + senArray[i].person.lastname
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
      "<div " +
      "class = 'parties_" +
      key +
      " col_3'>" +
      partyDict[key] +
      " " +
      key +
      "</div>"; //have added values inside divs in order to create a box. Class is parties_
  }
  document.getElementById("partyNums").innerHTML +=
    "<div class = 'row' ></div>"; //clear line after boxes
}

// function to create a dictionary of the party sizes
function partySize(senArray) {
  // creates a dictionary
  let partyDict = {};

  // iterates through all senators in JSON
  for (let i = 0; i < senArray.length; i++) {
    // sets the party for each
    let party = senArray[i].party;
    // creates it in the dictionary if it's not been created yet
    if (partyDict[party] === undefined) {
      partyDict[party] = 1;
    } else {
      // adds 1 to value in dictionary if it has been created already
      partyDict[party]++;
    }
  }
  return partyDict;
}

// function to display the table of senators
function displayTable(table) {
  // creates a div for the table to be in and assigns id at ID
  let elemDiv = document.createElement("div");
  let elemDiv_left = document.createElement("div");
  let elemDiv_centre = document.createElement("div");
  let elemDiv_right = document.createElement("div");

  elemDiv_left.innerText = "\xa0";
  elemDiv_right.innerText = "\xa0";
  elemDiv_left.setAttribute("class", "col_1");
  elemDiv_right.setAttribute("class", "row");
  elemDiv_centre.setAttribute("id", "senTable");
  elemDiv_centre.setAttribute("class", "col_10 shadowbox");

  elemDiv.appendChild(elemDiv_left);
  elemDiv.appendChild(elemDiv_centre);
  elemDiv.appendChild(elemDiv_right);

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
    row.setAttribute("class","tablerow_"+senArray[i].party)
    let tdNametd = document.createElement("td");

    tdName = document.createElement("button");
    tdName.setAttribute("class","table_button_"+senArray[i].party);
    // keeps the name as the buttons text
    tdName.innerText =
      senArray[i].person.firstname + " " + senArray[i].person.lastname;

    let tdNameExtra, senLink, senLinkText, addListOfItem;
    // create a div for extra senator information to be in - hidden until the button is clicked
    // adds all the information to the div
    tdNameExtra = document.createElement("div");

        // used to get the image of the senator
        let senatorLink = senArray[i].person.link;
        let split = senatorLink.split("/");
        let senNum = split[split.length-1];
        let newSenatorLink = "https://www.govtrack.us/static/legislator-photos/"+senNum+"-200px.jpeg"
        console.log(newSenatorLink);
        let addToSenExtra = document.createElement("img");
        addToSenExtra.setAttribute("class","SenImage");
        addToSenExtra.src = newSenatorLink
        addToSenExtra.alt = "A picture of Senator " + senArray[i].person.firstname + " " + senArray[i].person.lastname
        tdNameExtra.appendChild(addToSenExtra)

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
    // adds an anonymous function to display/ hide the div on click
    tdName.addEventListener("click", () => {
      if (tdNameExtra.style.display == "none") {
        tdNameExtra.style.display = "block";
      } else {
        tdNameExtra.style.display = "none";
      }
    });

    // adds the rest of the data to the row as new data points
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

    // adds the name to the main td element
    tdNametd.appendChild(tdName);

    // adds all td elements to the tr
    row.appendChild(tdNametd);
    row.appendChild(tdParty);
    row.appendChild(tdState);
    row.appendChild(tdGender);
    row.appendChild(tdSenRank);
    row.appendChild(tdSenTitle);

    return row;
  }

  // This code iterates through the colorArray and writes html code to put the color information in a table.
  let senTable = document.createElement("table");
  senTable.setAttribute("class", "panel-group");
  let rowhead = document.createElement("tr");

  // uses a list to create the headers for the table
  headerlist = ["Name", "Party", "State", "Gender", "Rank", "Senator Title"];
  for (let i = 0; i < headerlist.length; i++) {
    th = document.createElement("th");
    th.innerText = headerlist[i];
    rowhead.appendChild(th);
  }

  senTable.appendChild(rowhead);

  // loops through the items in the filters list to input the senators by title and then by party (dem+title, dem, inde+title, inde etc.)
  for (let j = 0; j < filterLists[1].length; j++) {
    for (let i = 0; i < senArray.length; i++) {
      if (
        // checks for a title first and adds to table
        senArray[i].leadership_title != null &&
        senArray[i].party == filterLists[1][j]
      ) {
        row = addToTable(i, senArray);
        senTable.appendChild(row);
      }
    }
    // checks for no title and adds to table
    for (let i = 0; i < senArray.length; i++) {
      if (
        senArray[i].leadership_title == null &&
        senArray[i].party == filterLists[1][j]
      ) {
        row = addToTable(i, senArray);
        senTable.appendChild(row);
      }
    }
  }

  // returns the table
  return senTable;
}

// creates checkboxes for all the possible options
// adds the checkboxes to hidden dropdowns
function addTableFilters(filterlist) {
  let divTitle = ["name", "party", "state", "gender", "rank", "senatortitle"];

  let filterDiv = document.createElement("div");
  let filterDiv_left = document.createElement("div");
  let filterDiv_centre = document.createElement("div");
  let filterDiv_right = document.createElement("div");

    filterDiv_left.setAttribute("class", "col_1");
    filterDiv_centre.setAttribute("class", "col_10 shadowbox filtercolor");
    filterDiv_right.setAttribute("class", "row");
  

  for (let i = 1; i < filterlist.length; i++) {
    // uses the list to add titles
    let containerDropdown = document.createElement("div");
    containerDropdown.setAttribute("class", "filter_button_styling");

    let filterTitle = document.createElement("button");
    filterTitle.innerText = divTitle[i].toLocaleUpperCase();
    containerDropdown.appendChild(filterTitle);
    filterDiv_centre.appendChild(containerDropdown);

    filterTitle.addEventListener("click", () => {
      let showHide = filterTitle.parentNode.childNodes[1];
      if (showHide.style.display != "none") {
        showHide.style.display = "none";
      } else {
        showHide.style.display = "block";
      }
    });

    // adds the required information to the div using divTitle items for IDs
    let dropDownDiv = document.createElement("div");
    dropDownDiv.setAttribute("id", divTitle[i]);
    dropDownDiv.setAttribute("class", "dropdown-content");
    dropDownDiv.style.display = "none";
    containerDropdown.appendChild(dropDownDiv);

    let newDropdown = document.createElement("ul");
    newDropdown.setAttribute("class", "filter_dropdown");
    dropDownDiv.appendChild(newDropdown);
    let showAll = document.createElement("li");
    showAll.setAttribute("class", "filter_dropdown_content");

    showAllInput = document.createElement("input");
    showAllLabel = document.createElement("label");
    let row_ender = document.createElement("div");
    showAllInput.setAttribute("class", "filter_dropdown_1_content_button");
    showAllLabel.setAttribute("class", "filter_dropdown_1_content_text");
    row_ender.setAttribute("class", "row");

    showAllInput.setAttribute("id", "showAll" + divTitle[i]);
    showAllInput.setAttribute("type", "checkbox");
    showAllInput.setAttribute("name", "showAll");
    showAllInput.setAttribute("value", "showAll");
    showAllInput.setAttribute("checked", "checked");
    showAllInput.setAttribute("onchange", "changeTable(this)");

    showAllLabel.setAttribute("for", "showAll" + divTitle[i]);
    showAllLabel.innerHTML = "Show All";

    //  showAllInput.setAttribute("class", "testing");
    //  showAllLabel.setAttribute("class", "testing");

    newDropdown.appendChild(showAll);
    showAll.appendChild(showAllLabel);
    showAll.appendChild(showAllInput);
    showAll.appendChild(row_ender);

    for (let j = 0; j < filterlist[i].length; j++) {
      let drop = document.createElement("li");
      drop.setAttribute("class", "filter_dropdown_content");
      let dropItem = document.createElement("input");
      let dropItemLabel = document.createElement("label");
      let row_ender = document.createElement("div");
      row_ender.setAttribute("class", "row");
      dropItem.setAttribute("class", "filter_dropdown_1_content_button"); //class for drop down other items text
      dropItemLabel.setAttribute("class", "filter_dropdown_1_content_text"); //class for drop down other items button
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
      newDropdown.appendChild(drop);
      drop.appendChild(dropItemLabel);
      drop.appendChild(dropItem);
      drop.appendChild(row_ender);
    }
  }

  filterDiv.append(filterDiv_left);
  filterDiv.append(filterDiv_centre);
  filterDiv.append(filterDiv_right);

  document.body.appendChild(filterDiv);
  let lineBreak = document.createElement("div");
  lineBreak.innerText = "\xa0"
  lineBreak.setAttribute("class","row")
  document.body.appendChild(lineBreak);
}

// function to change the table based on which checkbox filters are clicked
function changeTable(location) {
  // parent is the div that the tickbox was ticked in
  // tableRowToSearch is the ID of the div
  // i is then the index used for while row to apply the changes to
  let parentDiv = location.parentNode.parentNode.parentNode;
  let tableRowToSearch = parentDiv.id;

  let divTitle = ["name", "party", "state", "gender", "rank", "senatortitle"];

  let i = divTitle.indexOf(tableRowToSearch);

  // taken from W3 Schools Table Filter
  // Declare variables
  let input, table, tr, td, txtValue;
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
      let topLevel = document.getElementById(tableRowToSearch);
      let secondLevel = topLevel.getElementsByTagName("li");

      for (let p = 1; p < secondLevel.length; p++) {
        secondLevel[p].childNodes[1].checked = false;
        senDisplayList[i].push(secondLevel[p].childNodes[1].id);
      }
      // hides all rows
      for (let j = 1; j < tr.length; j++) {
        tr[j].style.display = "none";
      }
    } else {
      // when clickStatus true
      // untick all boxes
      let tickList = document.getElementById(tableRowToSearch);
      let newTickList = tickList.getElementsByTagName("li");
      for (let p = 1; p < newTickList.length; p++) {
        newTickList[p].childNodes[1].checked = true;
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
  senDisplayList.forEach((senList) => {
    if (senList.length != 0) {
      console.log(1);
      let showButton = "showAll" + tableRowToSearch;
      let showToChange = document.getElementById(showButton);
      showToChange.checked = false;
    }
  });

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
