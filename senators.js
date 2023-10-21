getColorData();

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

function displayJSON(obj) {
    let senArray = obj.objects;

    // This code iterates through the colorArray and writes html code to put the color information in a table.
    let senTable = "<table>";


    console.log(senArray[0]);

    senTable += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th>"
    for (let i=0; i < senArray.length; i++){
      let firstname = senArray[i].person.firstname;
      let surname = senArray[i].person.lastname;
      let party = senArray[i].party;
      let state = senArray[i].state;
      let gender = senArray[i].person.gender;
      let rank = senArray[i].senator_rank;

      senTable += 
        "<tr><td>"+
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
        rank
        "</td></tr>";

    }

    
    
    // Close the table element.
    senTable += "</table>";
    console.log(senTable)
    console.log()
    

    
    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('id','id01');
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



