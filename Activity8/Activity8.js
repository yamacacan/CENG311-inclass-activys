var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };



window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	
	
};
function addScore(){
		var name = $("name").value;
		var score = parseInt($("score").value);
		
		if (name == "" || isNaN(score) || score < 0 || score > 100) {
			alert("You must enter a name and a valid score");
			return;
		}
		
		names.push(name);
		scores.push(score);
		
		$("name").value = "";
		$("score").value = "";
		$("name").focus();
}
function displayScores(){	
	
	var scoresTable = $("scores_table");
	scoresTable.innerHTML = "<h2> Scores </h2>";
	var row = scoresTable.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "<b>Name</b>";
	cell2.innerHTML = "<b>Score</b>";
	
	for(var i=0;i<scores.length;i++){
		var row = scoresTable.insertRow(i+1);
		var cell1 = row.insertCell(0);	
		var cell2 = row.insertCell(1);
		cell1.innerHTML = names[i];
		cell2.innerHTML = scores[i];
	}
}


function displayResults()
{	
	var highest = 0;
	var highestName = "";
	var average = 0;
	for(var i=0;i<scores.length;i++)
	{
		average= (average*(i)+scores[i])/(i+1);
		if(scores[i]>highest)
		{
			highest=scores[i];
			highestName=names[i];
		}
	}
	
	document.getElementById("results").innerHTML="<h2> Results </h2><br /> Average score = "+average + "<br \> <br /> Highest score ="+highestName + " with a score of " + highest + "<br \>"
}


