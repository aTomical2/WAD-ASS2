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

document.addEventListener("DOMContentLoaded", async () => {
  let rawData = await getSenatorData();
  let senator = rawData.objects;

  senatorClassArray = []
  for (let i=0; i < rawData.meta.limit; i++) {
    let senName = new Senator(
      senator[i].caucus,
      senator[i].congress_number,
      senator[i].current,
      senator[i].description,
      senator[i].district,
      senator[i].enddate,
      senator[i].extra,
      senator[i].leadership_title,
      senator[i].party,
      senator[i].person,
      senator[i].phone,
      senator[i].role_type,
      senator[i].role_type_label,
      senator[i].senator_class,
      senator[i].senator_class_label,
      senator[i].senator_rank,
      senator[i].senator_rank_label,
      senator[i].state,
      senator[i].title,
      senator[i].title_long,
      senator[i].website,
      )
    senatorClassArray.push(senName)
}
console.log(senatorClassArray)

});



class Senator{
  constructor(caucus,congress_number,current,description,district,enddate,extra,leadership_title,party,person,phone,role_type,role_type_label,senator_class,senator_class_label,senator_rank,senator_rank_label,state,title,title_long,website) {
    this.caucus = caucus
    this.congress_number = congress_number
    this.current = current
    this.description = description
    this.district = district
    this.enddate = enddate
    this.extra = extra
    this.leadership_title = leadership_title
    this.party = party
    this.person = person
    this.phone = phone
    this.role_type = role_type
    this.role_type_label = role_type_label
    this.senator_class = senator_class
    this.senator_class_label = senator_class_label
    this.senator_rank = senator_rank
    this.senator_rank_label = senator_rank_label
    this.state = state
    this.title = title
    this.title_long = title_long
    this.website = website
  }
}



