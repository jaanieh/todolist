window.addEventListener("load", function()
{
	
let table = document.getElementById("taskTable");
let tableBody = document.getElementById("tableBody");

// Sort by 
let sortByTaskName = document.getElementById("taskNameSort");
let sortByDeadline = document.getElementById("deadLineSort");
let sortByLastAdded = document.getElementById("lastAddedSort");
let showCompletedTasks = document.getElementById("completedTasks");
let showUnCompletedTasks = document.getElementById("unCompletedTasks");

let tasksToShowInput = document.getElementById("tasksToShow");
let tasksToShowButton = document.getElementById("tasksToShowButton");

let taskNameInput = document.getElementById("taskName");
let taskDeadLineInput = document.getElementById("taskDeadline");
let addTaskButton = document.getElementById("addNewTask");

let taskName; 
let taskNameLow;
let deadLine;
let tasksToShow; 

firebase.database();

console.log("hejhej");




/********************** ADD NEW TASK BUTTON ****************************/
addTaskButton.addEventListener("click", function(event)
{
	table.innerHTML = "";
	
		taskName = taskNameInput.value;
		taskNameLow = taskNameInput.value.toLowerCase();
		deadLineDate = taskDeadLineInput.value;
	
	let task = {
		name: capitalizeFirstLetter(taskNameLow),
		deadline: deadLineDate, 
		added: currentTime()
	};

	firebase.database().ref('tasks/').push(task);


	console.log("task added: " + task.added);
	console.log(" current task: " + task);
	console.log("taskname: " + task.name);
	console.log("taskdeadline: " + task.deadline);


});

sortByTaskName.addEventListener("click", function(event){
	console.log("You clicked sorted by task name");
	
	table.innerHTML = "";
	
firebase.database().ref('tasks/').orderByChild('name').on('value', function(snapshot) {

	snapshot.forEach( child => {
		let lastTask = child.val();  // objekten kommer i ordning
		
		let tr = document.createElement('tr');
		tr.innerHTML = `<td style="width: 20px;"> <input type="checkbox" id="${child.key}"> </td> <td style="width: 300px;"> ${lastTask.name}</td> <td> ${lastTask.deadline}</td><td>${lastTask.added}</td>` ;
		
		table.appendChild(tr);
		
	});
	
	
});


});


//******************** SORT BY DEADLINE **************************//
sortByDeadline.addEventListener("click", function(event){
	console.log("You clicked sorted by deadline");
	
	table.innerHTML = "";
	
firebase.database().ref('tasks/').orderByChild('deadline').on('value', function(snapshot) {

	snapshot.forEach( child => {
		let lastTask = child.val(); 
		
		let tr = document.createElement('tr');
		tr.innerHTML = `<td style="width: 20px;"> <input type="checkbox" id="${child.key}"> </td> <td>${lastTask.name}</td> <td> ${lastTask.deadline}</td><td>${lastTask.added}</td>` ;
		
		table.appendChild(tr);
		
	});
});
	
	
});

//************************* SORT BY LAST ADDED ********************//
sortByLastAdded.addEventListener("click", function(event){
	console.log("you clicked sort by last added");
	table.innerHTML = "";
	
firebase.database().ref('tasks/').orderByChild('added').on('value', function(snapshot) {

	snapshot.forEach( child => {
		let lastTask = child.val(); 
		
		let tr = document.createElement('tr');
		tr.innerHTML = `<td style="width: 20px;"> <input type="checkbox" id="${child.key}"> </td> <td>${lastTask.name}</td> <td> ${lastTask.deadline}</td><td>${lastTask.added}</td>` ;
		
		table.appendChild(tr);
		
		table.insertBefore(tr, table.childNodes[0]);
					
	});
});
});


//*********************** TASKS TO SHOW *************************//
tasksToShowButton.addEventListener("click", function(event){
	
	table.innerHTML = "";
	
	tasksToShow = Number(tasksToShowInput.value);
	
firebase.database().ref('tasks/').orderByChild('added').limitToFirst(tasksToShow).on("value", function(snapshot) {
  
  
  snapshot.forEach( child => 
	{
		
		let lastTask = child.val();
		
		let tr = document.createElement('tr');
		tr.innerHTML = `<td style="width: 20px;"> <input type="checkbox" id="${child.key}"> </td> <td style="width: 300px;"> ${lastTask.name}</td> <td> ${lastTask.deadline}</td><td>${lastTask.added}</td>` ;
		
		table.appendChild(tr);
		
		console.log("nyckel i forloopen: " + child.key);
	});
  
  console.log(snapshot.key);
});

//console.log("Tasks to show" + tasksToShow);

showCompletedTasks.addEventListener("click", function(event){
	
	
	
});

});

/********************* HÄMTA FRÅN DATABASEN ***************************/

table.innerHTML = "";

firebase.database().ref('tasks/').on('value', function(snapshot){
	let allTasks = snapshot.val();
	
	snapshot.forEach( child =>
	//for (let task in allTasks)
	{
		
		let lastTask = child.val();
		
		let tr = document.createElement('tr');
		tr.innerHTML = `<td style="width: 20px;"> <input type="checkbox"> </td> <td style="width: 300px;"> ${lastTask.name}</td> <td> ${lastTask.deadline}</td><td>${lastTask.added}</td>`;
		
		table.appendChild(tr);
		
		console.log("nyckel i forloopen: " + child.key);
	});
	
});




//console.log("nyckel utanför knappen: " + child.key);




// Gör ett objekt för varje task
// låt varje objekt ha ett taskname, en deadline och ett id. 
// skall deadline vara ett datum? 


// sätta id på varje checkbox och kontrollera sedan vid sorteringen om den är checked eller inte?? 

// sortering ligger i slide 10  på sidan 8

// hämta och lägga till saker i databas finns i slide 7 och slide 10 

/* filtrering: googla filterfunktionen. (higher order functions) (ger en ny lista).
väljer ut vilka som skall behållas. Här kan man välja hur många items man skall visa (limitTofirst(3)) behålller de 3 första resultaten. 
finns på "filtrering 1" i slide 10 */

//***************** CURRENT TIME FUNCTION ************************/

function currentTime() { 

	var currentDate = new Date();
	var time = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
	
	return time;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

});