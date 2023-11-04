# WAD-ASS2
Web App Dev, Assignment2

Step 1
The number of senators in each party objective is met through the use of partySize function and displayed with the displayParties function.

partySize iterates through a dictionary and checks all the JSONdata.party objects. It then checks a dictionary to see if the object is a key. If it isnt a key it creates it, else it adds 1 to that key:value pair. After the loop it returns the dictionary.

displayParties then creates the div, assigns it an ID and adds it to the body along with the appropriate text.

Adding the list of titled senators is met dynamically in a similar fashion with the addTitledSens function. This function iterates through two for loops. The outer loop is a loop using the parties (filterLists[1]) which is taken from the createFilterLists function stored in listOfSens. The inner loop iterates through all the senators checking if they have a title and are from that party. If they are a new "li" element is created and they are added to the overall unordered list.


Step 2.
The function senTable creates the table of the senators. It takes input as the JSON data and the filter lists.

Inside senTable is another function, addToTable. This function takes input of i (the current iteration) and the JSON data. It then creates a row and adds the necessary data. This includes the requirements for step 4. addToTable returns the row to be added to the table.

senTable creates the Table and headers. It adds the rows by Party and title.

Step 3.
addTableFilters adds the filter lists to the page and takes input of a filter list.
It adds a div for each row excluding name and adds a button with an anonymous function to show / hide the details inside on click. 

The filters are made by adding a checkbox and label for each item in the filter lists.

The function for the filters is added in the changeTable function. This takes the location as input through the "this" argument. 

changeTable checks which ID to use by using parentNodes. It then operates on that filter and gets the index of the row by checking the index in divTitle list.

First it checks the showall button, then if it isn't it will filter the rest. If a button is unchecked it is added to the lists. 

The final loop in the function hides all items that are in a list.

Step 4.
This was added during step 2. It is a button with a div below it. The div is hidden / shown using an anonymous function in the addToTable function.
