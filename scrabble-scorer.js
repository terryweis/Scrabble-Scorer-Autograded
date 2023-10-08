// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 const oldPointStructure = {
   
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
   
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
   return word;
};


let simpleScorer = function(word){
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++){
      
      for (pointValue in simpleScorerStructure)

         if (simpleScorerStructure[pointValue].includes(word[i])){
            letterPoints += `points for '${word[i]}':${pointValue}\n`
         }
      

   }
   return letterPoints;
}
const simpleScorerStructure = {

   1: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
};

let vowelBonusScorer = function(word){
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++){
      
      for (pointValue in vowelBonusScorerStructure)

         if (vowelBonusScorerStructure[pointValue].includes(word[i])){
            letterPoints += `points for '${word[i]}':${pointValue}\n`
         }
      

   }
   return letterPoints;
};

const vowelBonusScorerStructure = {
   
   1: ['B','C','D',,'F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'],
   3: ['A','E','I','O','U']
};
let Scrabble = {
   "Name": "Scrabble:",
   "Description": " Uses scrabble point system",
   "scoringFunction" : oldScrabbleScorer
};

let singlePoint = {
   "Name": "Simple:",
   "Description": " One point per character",
   "scoringFunction" : simpleScorer
};

let vowelweighted = {
    "Name": "Vowel Bonus:",
    "Description": " Vowels are worth 3 points",
    "scoringFunction" : vowelBonusScorer
};

let scrabbleScorer;
// array to house the scoring objects
const scoringAlgorithms = [singlePoint, vowelweighted, Scrabble]
// protmpt (function) to determine scoring system including a word
function scorerPrompt(arr,word) {
   let option = Number(input.question(`Which scoring algorithim would you like to use?
   0 - ${scoringAlgorithms[0].Name}${scoringAlgorithms[0].Description}
   1 - ${scoringAlgorithms[1].Name}${scoringAlgorithms[1].Description}
   2 - ${scoringAlgorithms[2].Name}${scoringAlgorithms[2].Description}
   Enter 0, 1, or 2:`));

   return scoringAlgorithms[option].scoringFunction(word);
}

function transform() {};

let newPointStructure;

function runProgram() {
   //initialPrompt();
   scorerPrompt(scoringAlgorithms,initialPrompt());
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
