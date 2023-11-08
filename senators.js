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

    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("id01").innerHTML = senTable;
  }







































// // function to assemble data from the JSON file
// async function getSenatorData() {
//   try {
//     // const url = "http://127.0.0.1:5500/senators.json";
//     const url = "/senators.json";
//     const promise = await fetch(url);

//     // Check if the request was successful
//     if (!promise.ok) {
//       throw new Error(`HTTP error! status: ${promise.status}`);
//     }

//     const data = await promise.json();
//     return data;

//     // return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// let data = getSenatorData()
//   .then(x => {
//     data = x;
//   });


// let button = document.createElement('button')
// button.innerText = 'PLEASE WORK'
// button.addEventListener('click', () => {
//   console.log(data)})
// document.querySelector('body').append(button)













  // .then(x => {
  //   let body = document.querySelector("body")
  //   body.innerText = JSON.stringify(x)
  // })
// document.addEventListener("DOMContentLoaded", async () => {
//   rawData = await getSenatorData();
//   senator = rawData.objects;

//   // for (let i=0; i < rawData.meta.limit; i++) {
//     let senName = new Senator(
//       senator[i].caucus,
//       senator[i].congress_number,
//       senator[i].current,
//       senator[i].description,
//       senator[i].district,
//       senator[i].enddate,
//       senator[i].extra,
//       senator[i].leadership_title,
//       senator[i].party,
//       senator[i].person,
//       senator[i].phone,
//       senator[i].role_type,
//       senator[i].role_type_label,
//       senator[i].senator_class,
//       senator[i].senator_class_label,
//       senator[i].senator_rank,
//       senator[i].senator_rank_label,
//       senator[i].state,
//       senator[i].title,
//       senator[i].title_long,
//       senator[i].website,
//       )
//     senatorClassArray.push(senName)
// }








// class Senator{
//   constructor(caucus,congress_number,current,description,district,enddate,extra,leadership_title,party,person,phone,role_type,role_type_label,senator_class,senator_class_label,senator_rank,senator_rank_label,state,title,title_long,website) {
//     this.caucus = caucus
//     this.congress_number = congress_number
//     this.current = current
//     this.description = description
//     this.district = district
//     this.enddate = enddate
//     this.extra = extra
//     this.leadership_title = leadership_title
//     this.party = party
//     this.person = person
//     this.phone = phone
//     this.role_type = role_type
//     this.role_type_label = role_type_label
//     this.senator_class = senator_class
//     this.senator_class_label = senator_class_label
//     this.senator_rank = senator_rank
//     this.senator_rank_label = senator_rank_label
//     this.state = state
//     this.title = title
//     this.title_long = title_long
//     this.website = website
//   }
// }



