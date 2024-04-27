const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;


async function init(){
    
    let currentGuess = '';
    let currentRow = 0;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split('');


    setLoading(false);

    function addLetter(letter){
        if(currentGuess.length < ANSWER_LENGTH){
            currentGuess += letter;
        }else{
            // if the guess is already 5 letters long, take the word - last letter + add new letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
        
        letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
    }


    async function commitAnswer(){
        if(currentGuess.length !== ANSWER_LENGTH){
            //do nothing
            return;
        }

        // TODO: validate the word

        // TODO: do the marking of letters

        const guessParts = currentGuess.split('');
        const map = makeMap(wordParts);



        for(let i = 0 ; i < ANSWER_LENGTH; i++){
            //mark as correct

            if(guessParts[i] === wordParts[i]){
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
                map[guessParts[i]]--;
            }
        }

        for(let i = 0 ; i < ANSWER_LENGTH; i++){

            if(guessParts[i] === wordParts[i]){
                // we already did

            }else if(wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0){
                //mark as incorrect
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
                map[guessParts[i]]--;

            }else{
                //mark as incorrect
                letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
            }
        }

        // TODO: did they win or lose?


        currentRow++;
        currentGuess = '';
    }


    function removeLetter(){
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';
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

function setLoading(isLoading){
    loadingDiv.classList.toggle('hidden', !isLoading);
}
function makeMap(array){
    const obj = {};

    for(let i = 0 ; i < array.length; i++){
        const letter = array[i];
        if(obj[letter]){
            obj[letter]++;
        }else{
            obj[letter] = 1;
        }

        return obj;

    }


}



init();