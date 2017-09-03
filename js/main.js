console.log("Hangman!")

function Game(word) {
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
  var startWord = word;
  var tries = 6;
  var blanks = startWord.length;
  var gameOverMessage = '';
  var gameOverLetters = ['U', 'R', 'D', 'E', 'A', 'D'];
  var uniq = [];

  var createGameOverMessage = function() {
    var gameOverElem = document.createElement('h4');
    gameOverElem.className = 'game-over-section';
    gameOverElem.id = 'game-over-message';
    var rootElem = document.getElementById("root");
    rootElem.append(gameOverElem);
  }

  var showWinMessage =  function() {
    var gameWinElem = document.createElement('h4');
    gameWinElem.className = 'game-win-section';
    gameWinElem.id = 'game-win-message';
    gameWinElem.innerHTML = 'YOU WON!!!'
    var rootElem = document.getElementById("root");
    rootElem.append(gameWinElem);
  }

  var wrongGuess = function() {
    var gameOverElem = document.getElementById('game-over-message');
    gameOverElem.innerHTML = gameOverMessage
  }

   var _findUniq = function() {
    return startWord.split('').reduce(function(uniqueList, current) {
      if(uniqueList.indexOf(current) === -1) {
        uniqueList.push(current)
      }
      return uniqueList
    }, []);
  }

  var removeLetterButton = function(letter) {
    var letterButton = document.getElementById('letter-'+letter);
    letterButton.parentNode.removeChild(letterButton);
  }

  var showLetter = function (letter) {
    var indices = [];
    for (var i = 0; i < startWord.length; ++i) {
      if (startWord[i] === letter) {
        blanks--;
        var maskElem = document.getElementById('letter-mask-'+i);
        maskElem.innerHTML = ' '+letter+' ';
      }
    }

    removeLetterButton(letter);

    if (blanks === 0) {
      showWinMessage();
    }
  }

  var solveForLetter = function(letter) {
    if(tries) {
      if (startWord.indexOf(letter) !== -1) {
        showLetter(letter);
      } else {
        gameOverMessage = gameOverMessage.concat(gameOverLetters[gameOverLetters.length - tries]);
        wrongGuess()
        removeLetterButton(letter);
        tries--;
      }
    }
  }

  var createButton = function (letter) {
    var letterButton = document.createElement('button');
    letterButton.innerHTML = letter;
    letterButton.id = 'letter-'+letter;
    letterButton.onclick = function() {
      solveForLetter(letter)
    }
    var rootElem = document.getElementById("buttonSection");
    rootElem.appendChild(letterButton);
  }

  var createMask = function () {
    var maskDiv = document.createElement('div');
    maskDiv.id = 'maskDiv';
    maskDiv.className = 'mask-section'
    for (var i = 0; i < word.length; ++i) {
      var letterMask = document.createElement('span');
      letterMask.className = 'letter-mask'
      letterMask.id = 'letter-mask-'+i;
      letterMask.innerHTML = '   -   '
      maskDiv.appendChild(letterMask)
    }

    var rootElem = document.getElementById("root");
    rootElem.appendChild(maskDiv);
  }

  var createButtonSection = function() {
    var rootElem = document.getElementById('root');
    var buttonSection = document.createElement('div');
    buttonSection.className = 'button-section';
    buttonSection.id = 'buttonSection';
    rootElem.appendChild(buttonSection);
  }

  var start = function() {
    createButtonSection();

    uniq = _findUniq();
    createMask();

    var letters = alpha.split('');
    letters.forEach(function(letter){
      createButton(letter);
    });

    createGameOverMessage();
  }

  return {
    start: start
  }
}


const game =  new Game('MONUMENTAL')
game.start();
