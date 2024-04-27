const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;


async function init(){
    
    let currentGuess = '';

    function addLetter(letter){
        if(currentGuess.length < ANSWER_LENGTH){
            currentGuess += letter;
        }else{
            // if the guess is already 5 letters long, take the word - last letter + add new letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
        
        letters[currentGuess.length - 1].innerText = letter;
    }



    document.addEventListener('keydown', function handleKeyPress(event){
        const action = event.key;

        console.log(action);

        if(action === 'Enter'){
            commitAnswer();
        }else if(action === 'Backspace'){
            removeLetter();
        }else if (isLetter(action)){
            addLetter(action.toUpperCase());
        }else{
            //do nothing
        }

    });

}

function isLetter(letter){
    //this returns true if the key input is between a-z or A-Z
    return /^[a-zA-Z]$/.test(letter);
}


init();