// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let word = ""
function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word:");
 return word
};


// simple scoring function
let simpleScorer = function(word){
    let score = 0;
    let newWord = word.toUpperCase();
    for (let i = 0; i < newWord.length; i++) {
        score += 1;
    }
    return score;
};
// vowel scoring function
let vowelBonusScorer = function(word){
    let score = 0;
    newWord = word.toUpperCase();
    for (let i = 0; i < newWord.length; i ++){
        if (newWord[i] === 'A' || newWord[i] === 'E' || newWord[i] === 'I' || newWord[i] === 'O' || newWord[i] === 'U'){
            score += 3;
        }else{
            score += 1;
        }
    }
    return score;
}

// objects for the array
let simpScore = {
    "name": "Simple Score",
    "description" : "Each letter is worth 1 point.",
    "scorerFunction": simpleScorer
}

let vowelScore = {
    "name": "Bonus Vowels",
    "description" : "Vowels are 3 pts, consonants are 1 pt.",
    "scorerFunction": vowelBonusScorer
}
// scoring function for newPointStructure
let scrabbleScorer = function (word){
   let score = 0;
   let newWord = word.toLowerCase()
   for (let i = 0; i < newWord.length; i++){
       for (key in newPointStructure){
         if (word[i] === key){
            score += newPointStructure[key];
         }
      }
   }
   return score
};
// final object for array
let scrabbleoldScore = {
   "name": "Scrabble",
   "description" : "The traditional scoring algorithm.",
   "scorerFunction": scrabbleScorer
}

// array for scorer prompt
const scoringAlgorithms = [simpScore, vowelScore, scrabbleoldScore];
// prompt for scoring method and replay if incorrect number is written
function scorerPrompt(arr) {
    let option = Number(input.question(`Which scoring algorithim would you like to use?
    0 - ${scoringAlgorithms[0].name}:  ${scoringAlgorithms[0].description}
    1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
    2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
    Enter 0, 1, or 2:`));
    if (option <= 3 && option >= 0){
        return (scoringAlgorithms[option].scorerFunction(word))
    }else{
        return `Please choose a valid number ${scorerPrompt()}`;
    }
    
};

function transform(object) {
   let newObject = {};
let letters = [];
let lowerCase = "";

for (key in object){
letters.push(object[key])
}

lowerCase = letters.join(",").toLocaleLowerCase().split(",").sort();   
for(let i = 0; i < lowerCase.length; i++) {
 newObject[`${lowerCase[i]}`] = key; 
}
for (key in newObject){
    if (key === "a" || key === "e" || key === "i" || key === "o" || key === "u" || key === "l" || key === "n" || key === "r" || key === "s" || key === "t"){
        newObject[key] = 1;
    } else if (  key === "d" || key === "g"){
        newObject[key] = 2;
    } else if ( key === "b" || key === "c" || key === "m" || key === "p"){
        newObject[key] = 3; 
    } else if ( key === "f" || key === "h" || key === "v" || key === "w" || key === "y"){
        newObject[key] = 4;
    } else if ( key === "k"){
        newObject[key] = 5;
    } else if ( key === "j" || key === "x"){
        newObject[key] = 8;
    }else if ( key === "q" || key === "z"){
        newObject[key] = 10;
    }

};
return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
    initialPrompt();
    return scorerPrompt(scoringAlgorithms);
    
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
