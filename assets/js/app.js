// J-FUCKIN-S
// ♫ LET'S GROOVE ♫
// ♫ feat DJ KLAVN ♫


// initialize global variables

var limit = 6;
var counter = limit; // counting down for colorblocks
var colors = ['blue', 'yellow', 'red', 'orange', 'green', 'purple']; // colors of color blocks

var colorBlocks = document.querySelectorAll('.colorBlock'); // setting color block color

var groovy = false;


// randomize Gameplay variables

function getRandomColor() {
  return colors[Math.floor(colors.length * Math.random())];
}

function getNewCount(counter) {
  return 1 + Math.floor(Math.random() * counter * .5);
}

function switchRandomColor(currentColor) {
  var newcolor = getRandomColor();

  while (newcolor == currentColor) newcolor = getRandomColor();

  return newcolor;
}


// initializing Gameplay variables

var instructions = document.getElementById('instructions');
var fruitNumber = document.getElementById('fruitNumber');
var fruitColor = document.getElementById('fruitColor');
var fruitWord = document.getElementById('fruitWord');
var count = document.getElementById('count');


// update Gameplay text

function updateText() {
  var instructionsAreHidden = instructions.classList.contains("hidden");
  instructions.className = "message " + currentColor + (instructionsAreHidden ? " hidden" : "");
  fruitNumber.innerHTML = currentCount.toString();
  fruitColor.innerHTML = currentColor;
  fruitWord.innerHTML = (currentCount == 1) ? "item" : "items";
  count.innerHTML = limit - counter;
}


// initializing color + number of fruit

var currentColor = getRandomColor();
var currentCount = getNewCount(counter);
updateText();



//--------------------------------------- dispatch shunt event --> gameplay --> transition screen

var transitionFrame = document.getElementById('transition');


function blend() {
  if (groovy) {
    document.getElementById('game').dispatchEvent(new Event('shunt'));

      // triggers gameplay --> transition --> result
      setTimeout(function(){
      console.log("transitioning");
          transitionFrame.dispatchEvent(new Event('shunt'));
      }, 5000);
  } else {
  }
}

// drag + drop fruits

function fruitdrag(e, colors) {
  e.dataTransfer.setData("colors", JSON.stringify(colors));
}

function fruitdrop(e) {
  e.preventDefault();

  c = JSON.parse(e.dataTransfer.getData("colors"));
  console.log(c);
  if ((c.indexOf(currentColor) != -1) && (!groovy)) {
    --currentCount;
    --counter;

    cb = colorBlocks[counter];
    cb.classList.remove('clear');
    cb.classList.add(currentColor);

    // check if all 6 fruits have been placed in cup

    if (counter == 0) {
        document.getElementById('blendButton').classList.remove('inactive');
        document.getElementById('congrats').classList.remove('hidden');
        document.getElementById('instructions').classList.add('hidden');
        groovy = true;
    }


    // update new colors + number of fruits

    if (currentCount == 0) {
      currentColor = switchRandomColor(currentColor);
      currentCount = getNewCount(counter);
    }

    updateText();

  } else {

  }
}


// we got this

function fruitallowdrop(e) {
  e.preventDefault();
}


// resetting the GAME

var blendButton = document.getElementById('blendButton');
var congrats = document.getElementById('congrats');
var instructions = document.getElementById('instructions');

document.getElementById('blendAnother').addEventListener('click', function() {
    for (var i = colorBlocks.length-1; i >= 0; --i) {
        cb = colorBlocks[i];
        cb.className = "colorBlock clear";
    }

    counter = limit;
    groovy = false;
    currentColor = getRandomColor();
    currentCount= getNewCount(counter);
    updateText();
    blendButton.classList.add('inactive');
    congrats.classList.add('hidden');
    instructions.classList.remove('hidden');
});
