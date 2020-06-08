setTimeout(function () {
  document.getElementsByClassName("instructions")[0].classList.add("fadeOut");
}, 10 * 1000);

let audioFile = document.querySelector(".audioFile");
let getEnter = document.querySelector("#btnEnter");
let start = 0;
let diceValue = 0;
let state = "notInTurnState";
//******************** */ Getting value from the text box and storing it in "diceValue"
let getDiceValue = function () {
  if (state != "ongoingTurn") {
    if (document.querySelector("#inputBox").value == "") {
      let roll = function () {
        diceValue = Math.floor(Math.random() * 10) + 1;
        if (diceValue > 6) {
          roll();
        } else {
          document.querySelector(".diceNo").innerHTML = diceValue;
        }
      };
      roll();
      if (start == 0) {
        turn = "red";
        start = 1;
        state = "ongoingTurn";
        document.querySelector(".audioFile").play();
        turnDecider();
      } else {
        state = "ongoingTurn";
        turnDecider();
      }
    } else {
      diceValue = parseInt(document.querySelector("#inputBox").value);
      console.log("the dice value is " + diceValue);
      document.querySelector(".diceNo").innerHTML = diceValue;
      // document.querySelector(".btn").style.visibility = "hidden";
      if (start == 0) {
        turn = "red";
        start = 1;
        state = "ongoingTurn";
        document.querySelector(".audioFile").play();
        turnDecider();
      } else {
        document.querySelector("#inputBox").value = "";
        state = "ongoingTurn";
        turnDecider();
      }
    }
  }
};
getEnter.addEventListener("click", getDiceValue);

let clearDiceNo = function () {
  document.querySelector(".diceNo").innerHTML = "";
};
// variables initialization for redpawnA
let newDivRedPawnA;
let tokenRedPawnA = document.querySelector("#redPawnA");
let classNoAddRedPawnA = 0;

// variables initialization for redpawnB
let newDivRedPawnB;
let tokenRedPawnB = document.querySelector("#redPawnB");
let classNoAddRedPawnB = 0;

// variables initialization for bluepawnA
let newDivBluePawnA;
let tokenBluePawnA = document.querySelector("#bluePawnA");
let classNoAddBluePawnA = 0;

// variables initialization for bluepawnB
let newDivBluePawnB;
let tokenBluePawnB = document.querySelector("#bluePawnB");
let classNoAddBluePawnB = 0;

//variables

let turnRed = function () {
  let eventRemoverToDivWithRedPawns = function () {
    for (let index = 0; index < 33; index++) {
      let childrenOfDiv = document.querySelector(".red" + index);
      childrenOfDiv.removeEventListener("click", moveRedPawnA);
      childrenOfDiv.removeEventListener("click", moveRedPawnB);
      childrenOfDiv.classList.remove("active");
    }
  };
  //movement function of red pawn A
  let moveRedPawnA = function () {
    //moving the pawn
    let loopStarter = classNoAddRedPawnA;
    classNoAddRedPawnA += diceValue;
    //loop for the transition
    for (let index = loopStarter; index <= classNoAddRedPawnA; index++) {
      newDivRedPawnA = document.querySelector(".red" + index);
      tokenRedPawnA.classList.add("animated", "fadeIn");
      newDivRedPawnA.appendChild(tokenRedPawnA);
    }
    console.log("after loop");
    if (classNoAddRedPawnA == 33) {
      document.querySelector(".endForRedPawnA").appendChild(tokenRedPawnA);
      if (document.querySelector(".endForRedPawnB").children.length == 1) {
        // alert("RED WINS!");
        document.querySelector(".mid").innerHTML =
          "Red Wins<br>Refresh The Page To Play Again";
        document.querySelector(".mid").style.textAlign = "center";
        document.querySelector(".triumph").play();
        document.querySelector(".audioFile").pause();
      }
    }
    if (classNoAddRedPawnA > 0 && classNoAddRedPawnA < 6) {
      classNoAddRedPawnA = 0;
    }
    //function to send the blue tokens back
    if (
      newDivRedPawnA.children.length == 2 &&
      newDivRedPawnA.children[0].id == "bluePawnA"
    ) {
      classNoAddBluePawnA = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnA);
      document.querySelector(".jumpBack").play();
    } else if (
      newDivRedPawnA.children.length == 2 &&
      newDivRedPawnA.children[0].id == "bluePawnB"
    ) {
      classNoAddBluePawnB = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnB);
      document.querySelector(".jumpBack").play();
    } else if (newDivRedPawnA.children.length == 3) {
      classNoAddBluePawnA = 0;
      classNoAddBluePawnB = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnA);
      document.querySelector(".blue0").appendChild(tokenBluePawnB);
      document.querySelector(".jumpBack").play();
    }
    //eventAdderToDivWithRedPawns();
    turn = "blue";
    state = "notInTurnState";
    console.log(state);
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Blue";
    text.style.color = "#6fa8dc";
    setTimeout(clearDiceNo, 2000);
    eventRemoverToDivWithRedPawns();
    turnDecider();
  };

  //movement function of red pawn B
  let moveRedPawnB = function () {
    //moving the pawn
    let loopStarter = classNoAddRedPawnB;
    classNoAddRedPawnB += diceValue;
    //loop for the transition
    for (let index = loopStarter; index <= classNoAddRedPawnB; index++) {
      newDivRedPawnB = document.querySelector(".red" + index);
      tokenRedPawnB.classList.add("animated", "fadeIn");
      newDivRedPawnB.appendChild(tokenRedPawnB);
    }
    if (classNoAddRedPawnB == 33) {
      document.querySelector(".endForRedPawnB").appendChild(tokenRedPawnB);
      if (document.querySelector(".endForRedPawnA").children.length == 1) {
        //alert("RED WINS!");
        document.querySelector(".mid").innerHTML =
          "Red Wins<br>Refresh The Page To Play Again";
        document.querySelector(".mid").style.textAlign = "center";
        document.querySelector(".triumph").play();
        document.querySelector(".audioFile").pause();
      }
    }
    if (classNoAddRedPawnB > 0 && classNoAddRedPawnB < 6) {
      classNoAddRedPawnB = 0;
    }
    //function to send the blue tokens back
    if (
      newDivRedPawnB.children.length == 2 &&
      newDivRedPawnB.children[0].id == "bluePawnA"
    ) {
      classNoAddBluePawnA = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnA);
      document.querySelector(".jumpBack").play();
    } else if (
      newDivRedPawnB.children.length == 2 &&
      newDivRedPawnB.children[0].id == "bluePawnB"
    ) {
      classNoAddBluePawnB = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnB);
      document.querySelector(".jumpBack").play();
    } else if (newDivRedPawnB.children.length == 3) {
      classNoAddBluePawnA = 0;
      classNoAddBluePawnB = 0;
      document.querySelector(".blue0").appendChild(tokenBluePawnA);
      document.querySelector(".blue0").appendChild(tokenBluePawnB);
      document.querySelector(".jumpBack").play();
    }
    //eventAdderToDivWithRedPawns();
    turn = "blue";
    state = "notInTurnState";
    eventRemoverToDivWithRedPawns();
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Blue";
    text.style.color = "#6fa8dc";
    setTimeout(clearDiceNo, 2000);
    turnDecider();
  };

  //Adding eventlisteners to the active boxes--------WORKSSSSSS
  let eventAdderToDivWithRedPawns = function () {
    for (let index = 0; index < 33; index++) {
      let childrenOfDiv = document.querySelector(".red" + index);
      if (
        childrenOfDiv.children.length == 2 &&
        (childrenOfDiv.children[0].id == "redPawnA" ||
          childrenOfDiv.children[1].id == "redPawnA")
      ) {
        childrenOfDiv.addEventListener("click", moveRedPawnA);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveRedPawnB);
      } else if (
        childrenOfDiv.children.length == 1 &&
        childrenOfDiv.children[0].id == "redPawnA"
      ) {
        childrenOfDiv.addEventListener("click", moveRedPawnA);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveRedPawnB);
      } else if (
        childrenOfDiv.children.length == 1 &&
        childrenOfDiv.children[0].id == "redPawnB"
      ) {
        childrenOfDiv.addEventListener("click", moveRedPawnB);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveRedPawnA);
      } else {
        childrenOfDiv.removeEventListener("click", moveRedPawnA);
        childrenOfDiv.removeEventListener("click", moveRedPawnB);
        childrenOfDiv.classList.remove("active");
      }
    }
  };
  if (
    classNoAddRedPawnA + diceValue > 33 &&
    classNoAddRedPawnB + diceValue > 33
  ) {
    turn = "blue";
    state = "notInTurnState";
    eventRemoverToDivWithRedPawns();
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Blue";
    text.style.color = "#6fa8dc";
    setTimeout(clearDiceNo, 2000);
    turnDecider();
  } else if (
    classNoAddRedPawnA + diceValue > 33 &&
    classNoAddRedPawnB + diceValue < 34
  ) {
    moveRedPawnB();
  } else if (
    classNoAddRedPawnB + diceValue > 33 &&
    classNoAddRedPawnA + diceValue < 34
  ) {
    moveRedPawnA();
  } else if (
    classNoAddRedPawnA == 0 &&
    classNoAddRedPawnB == 0 &&
    diceValue > 5
  ) {
    moveRedPawnA();
  } else if (
    classNoAddRedPawnA == 0 &&
    classNoAddRedPawnB == 0 &&
    diceValue < 6
  ) {
    moveRedPawnA();
  } else if (classNoAddRedPawnA == 33 && classNoAddRedPawnB + diceValue < 34) {
    moveRedPawnB();
  } else if (classNoAddRedPawnB == 33 && classNoAddRedPawnA + diceValue < 34) {
    moveRedPawnA();
  } else if (
    (classNoAddRedPawnA == 33 && classNoAddRedPawnB + diceValue > 33) ||
    (classNoAddRedPawnB == 33 && classNoAddRedPawnA + diceValue > 33)
  ) {
    turn = "blue";
    state = "notInTurnState";
    eventRemoverToDivWithRedPawns();
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Blue";
    text.style.color = "#6fa8dc";
    setTimeout(clearDiceNo, 2000);
    turnDecider();
  } else if (
    classNoAddRedPawnA == 0 &&
    classNoAddRedPawnB != 0 &&
    diceValue < 6
  ) {
    moveRedPawnB();
  } else if (
    classNoAddRedPawnB == 0 &&
    classNoAddRedPawnA != 0 &&
    diceValue < 6
  ) {
    moveRedPawnA();
  } else {
    eventAdderToDivWithRedPawns();
  }
};

//for the love of Blue

let turnBlue = function () {
  let eventRemoverToDivWithBluePawns = function () {
    for (let index = 0; index < 33; index++) {
      let childrenOfDiv = document.querySelector(".blue" + index);
      childrenOfDiv.removeEventListener("click", moveBluePawnA);
      childrenOfDiv.removeEventListener("click", moveBluePawnB);
      childrenOfDiv.classList.remove("active");
    }
  };
  //movement function of blue pawn A
  let moveBluePawnA = function () {
    //statement to check if the movement is to be beyond the last div
    if (classNoAddBluePawnA + diceValue > 33) {
      turn = "red";
      state = "notInTurnState";
      eventRemoverToDivWithBluePawns();
      turnDecider();
    } else {
      //moving the pawn
      let loopStarter = classNoAddBluePawnA;
      classNoAddBluePawnA += diceValue;
      for (let index = loopStarter; index <= classNoAddBluePawnA; index++) {
        newDivBluePawnA = document.querySelector(".blue" + classNoAddBluePawnA);
        tokenBluePawnA.classList.add("animated", "fadeIn");
        newDivBluePawnA.appendChild(tokenBluePawnA);
      }
      if (classNoAddBluePawnA == 33) {
        document.querySelector(".endForBluePawnA").appendChild(tokenBluePawnA);
        if (document.querySelector(".endForBluePawnB").children.length == 1) {
          //alert("BLUE WINS!");
          document.querySelector(".mid").innerHTML =
            "Blue wins<br>Refresh The Page To Play Again";
          document.querySelector(".mid").style.textAlign = "center";
          document.querySelector(".triumph").play();
          document.querySelector(".audioFile").pause();
        }
      }
      if (classNoAddBluePawnA > 0 && classNoAddBluePawnA < 6) {
        classNoAddBluePawnA = 0;
      }
      //function to send the red tokens back
      if (
        newDivBluePawnA.children.length == 2 &&
        newDivBluePawnA.children[0].id == "redPawnA"
      ) {
        classNoAddRedPawnA = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnA);
        document.querySelector(".jumpBack").play();
      } else if (
        newDivBluePawnA.children.length == 2 &&
        newDivBluePawnA.children[0].id == "redPawnB"
      ) {
        classNoAddRedPawnB = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnB);
        document.querySelector(".jumpBack").play();
      } else if (newDivBluePawnA.children.length == 3) {
        classNoAddRedPawnA = 0;
        classNoAddRedPawnB = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnA);
        document.querySelector(".red0").appendChild(tokenRedPawnB);
        document.querySelector(".jumpBack").play();
      }
      //eventAdderToDivWithBluePawns();
      turn = "red";
      state = "notInTurnState";
      eventRemoverToDivWithBluePawns();
      diceValue = 0;
      let text = document.querySelector(".instBar");
      text.innerHTML = "Turn:Red";
      text.style.color = "#e06666";
      setTimeout(clearDiceNo, 2000);
      turnDecider();
    }
  };

  //movement function of blue pawn B
  let moveBluePawnB = function () {
    //statement to check if the movement is to be beyond the last div
    if (classNoAddBluePawnB + diceValue > 33) {
      turn = "red";
      state = "notInTurnState";
      eventRemoverToDivWithBluePawns();
      turnDecider();
    } else {
      //moving the pawn
      let loopStarter = classNoAddBluePawnB;
      classNoAddBluePawnB += diceValue;
      for (let index = loopStarter; index <= classNoAddBluePawnB; index++) {
        newDivBluePawnB = document.querySelector(".blue" + classNoAddBluePawnB);
        tokenBluePawnB.classList.add("animated", "fadeIn");
        newDivBluePawnB.appendChild(tokenBluePawnB);
      }
      if (classNoAddBluePawnB == 33) {
        document.querySelector(".endForBluePawnB").appendChild(tokenBluePawnB);
        if (document.querySelector(".endForBluePawnA").children.length == 1) {
          //alert("BLUE WINS!");
          document.querySelector(".mid").innerHTML =
            "Refresh The Page To Play Again";
          document.querySelector(".mid").style.textAlign = "center";
          document.querySelector(".triumph").play();
          document.querySelector(".audioFile").pause();
        }
      }
      if (classNoAddBluePawnB > 0 && classNoAddBluePawnB < 6) {
        classNoAddBluePawnB = 0;
      }
      //function to send the red tokens back
      if (
        newDivBluePawnB.children.length == 2 &&
        newDivBluePawnB.children[0].id == "redPawnA"
      ) {
        classNoAddRedPawnA = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnA);
        document.querySelector(".jumpBack").play();
      } else if (
        newDivBluePawnB.children.length == 2 &&
        newDivBluePawnB.children[0].id == "redPawnB"
      ) {
        classNoAddRedPawnB = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnB);
        document.querySelector(".jumpBack").play();
      } else if (newDivBluePawnB.children.length == 3) {
        classNoAddRedPawnA = 0;
        classNoAddRedPawnB = 0;
        document.querySelector(".red0").appendChild(tokenRedPawnA);
        document.querySelector(".red0").appendChild(tokenRedPawnB);
        document.querySelector(".jumpBack").play();
      }
      //eventAdderToDivWithBluePawns();
      turn = "red";
      state = "notInTurnState";
      eventRemoverToDivWithBluePawns();
      diceValue = 0;
      let text = document.querySelector(".instBar");
      text.innerHTML = "Turn:Red";
      text.style.color = "#e06666";
      setTimeout(clearDiceNo, 2000);
      turnDecider();
    }
  };

  //Adding eventlisteners to the active boxes--------WORKSSSSSS
  let eventAdderToDivWithBluePawns = function () {
    for (let index = 0; index < 33; index++) {
      let childrenOfDiv = document.querySelector(".blue" + index);
      if (
        childrenOfDiv.children.length == 2 &&
        (childrenOfDiv.children[0].id == "bluePawnA" ||
          childrenOfDiv.children[1].id == "bluePawnA")
      ) {
        childrenOfDiv.addEventListener("click", moveBluePawnA);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveBluePawnB);
      } else if (
        childrenOfDiv.children.length == 1 &&
        childrenOfDiv.children[0].id == "bluePawnA"
      ) {
        childrenOfDiv.addEventListener("click", moveBluePawnA);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveBluePawnB);
      } else if (
        childrenOfDiv.children.length == 1 &&
        childrenOfDiv.children[0].id == "bluePawnB"
      ) {
        childrenOfDiv.addEventListener("click", moveBluePawnB);
        childrenOfDiv.classList.add("active");
        childrenOfDiv.removeEventListener("click", moveBluePawnA);
      } else {
        childrenOfDiv.removeEventListener("click", moveBluePawnA);
        childrenOfDiv.removeEventListener("click", moveBluePawnB);
        childrenOfDiv.classList.remove("active");
      }
    }
  };
  if (
    classNoAddBluePawnA + diceValue > 33 &&
    classNoAddBluePawnB + diceValue > 33
  ) {
    turn = "red";
    state = "notInTurnState";
    eventRemoverToDivWithBluePawns();
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Red";
    text.style.color = "#e06666";
    setTimeout(clearDiceNo, 2000);
    turnDecider();
  } else if (
    classNoAddBluePawnA + diceValue > 33 &&
    classNoAddBluePawnB + diceValue < 34
  ) {
    moveBluePawnB();
  } else if (
    classNoAddBluePawnB + diceValue > 33 &&
    classNoAddBluePawnA + diceValue < 34
  ) {
    moveBluePawnA();
  } else if (
    classNoAddBluePawnA == 0 &&
    classNoAddBluePawnB == 0 &&
    diceValue > 5
  ) {
    moveBluePawnA();
  } else if (
    classNoAddBluePawnA == 0 &&
    classNoAddBluePawnB == 0 &&
    diceValue < 6
  ) {
    moveBluePawnA();
  } else if (
    classNoAddBluePawnA == 33 &&
    classNoAddBluePawnB + diceValue < 34
  ) {
    moveBluePawnB();
  } else if (
    classNoAddBluePawnB == 33 &&
    classNoAddBluePawnA + diceValue < 34
  ) {
    moveBluePawnA();
  } else if (
    (classNoAddBluePawnA == 33 && classNoAddBluePawnB + diceValue > 33) ||
    (classNoAddBluePawnB == 33 && classNoAddBluePawnA + diceValue > 33)
  ) {
    turn = "red";
    state = "notInTurnState";
    eventRemoverToDivWithBluePawns();
    diceValue = 0;
    let text = document.querySelector(".instBar");
    text.innerHTML = "Turn:Red";
    text.style.color = "#e06666";
    setTimeout(clearDiceNo, 2000);
    turnDecider();
  } else if (
    classNoAddBluePawnA == 0 &&
    classNoAddBluePawnB != 0 &&
    diceValue < 6
  ) {
    moveBluePawnB();
  } else if (
    classNoAddBluePawnB == 0 &&
    classNoAddBluePawnA != 0 &&
    diceValue < 6
  ) {
    moveBluePawnA();
  } else {
    eventAdderToDivWithBluePawns();
  }
};

let turn;
let turnDecider = function () {
  if (diceValue != 0) {
    if (turn == "red") {
      let text = document.querySelector(".instBar");
      text.innerHTML = "Turn:Red";
      text.style.color = "#e06666";
      turnRed();
    } else if (turn == "blue") {
      let text = document.querySelector(".instBar");
      text.innerHTML = "Turn:Blue";
      text.style.color = "#6fa8dc";
      turnBlue();
    }
  }
};
//music bg
let bgStatus = 1;
let pauseButton = function () {
  if (bgStatus == 1) {
    document.querySelector(".audioFile").pause();
    bgStatus = 0;
  } else if (bgStatus == 0) {
    document.querySelector(".audioFile").play();
    bgStatus = 1;
  }
};
document.querySelector(".bgmusic").addEventListener("click", pauseButton);
