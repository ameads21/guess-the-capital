const modal = document.querySelector(".modal-body");
const modalTitle = document.getElementById("exampleModalLabel");
const startBtn = document.getElementById("startGame");
const startBtn2 = document.getElementById("startGame2");
const userCreateBtn = document.getElementById("userCreateBtn");
const primaryDiv = document.getElementById("primaryDiv");
const userRow = document.getElementById("userRow");
const topDiv = document.getElementById("topDiv");
let answerBtn = document.getElementById("answerButton");

answerBtn.addEventListener("click", showAnswer);
startBtn.addEventListener("click", () => startGame1());
startBtn2.addEventListener("click", () => startGame2());

userCreateBtn.addEventListener("click", () => createUser());

let columnSelected = null;

let stateDoc = null;
let imageLocation = null;

function startGame1() {
  let randomizedStates = [];
  while (states.length !== 0) {
    let randomIndex = Math.floor(Math.random() * states.length);
    randomizedStates.push(states[randomIndex]);
    states.splice(randomIndex, 1);
  }
  states = randomizedStates;

  while (primaryDiv.firstChild) {
    primaryDiv.removeChild(primaryDiv.firstChild);
  }
  let backBtn = document.createElement("button");
  backBtn.setAttribute("id", "back-button");
  backBtn.setAttribute("class", "btn btn-primary float-left ml-md-3 mt-md-2");
  backBtn.addEventListener("click", differentGame);
  backBtn.innerText = "Back";
  topDiv.prepend(backBtn);
  createCategories();
  createRows(states);
  createButtons(states);
  stateDoc = states;
  imageLocation = 1;
}

function startGame2() {
  let randomizedStates = [];
  while (states2.length !== 0) {
    let randomIndex = Math.floor(Math.random() * states2.length);
    randomizedStates.push(states2[randomIndex]);
    states2.splice(randomIndex, 1);
  }
  states2 = randomizedStates;

  while (primaryDiv.firstChild) {
    primaryDiv.removeChild(primaryDiv.firstChild);
  }
  let backBtn = document.createElement("button");
  backBtn.setAttribute("id", "back-button");
  backBtn.setAttribute("class", "btn btn-primary float-left ml-md-3 mt-md-2");
  backBtn.addEventListener("click", differentGame);
  backBtn.innerText = "Back";
  topDiv.prepend(backBtn);
  createCategories();
  createRows(states2);
  createButtons(states2);
  stateDoc = states2;
  imageLocation = 2;
}

function createCategories() {
  let div = document.querySelector("#categories");
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  for (c in categories) {
    let topic = document.createElement("h3");
    topic.setAttribute("class", "col categories");
    topic.innerText = categories[c];
    row.append(topic);
  }
  div.append(row);
}

function createRows(stateDoc) {
  let counter = 0;
  for (let i = 0; i < stateDoc.length; i++) {
    if (i % 5 == 0) {
      counter += 1;
      let newRow = document.createElement("div");
      newRow.setAttribute("id", `row-${counter}`);
      newRow.setAttribute("class", "rows row");
      primaryDiv.append(newRow);
    }
  }
}

function createButtons(stateDoc) {
  let columnCounter = 1;
  let rowCounter = 1;
  for (let i = 0; i < stateDoc.length; i++) {
    if (rowCounter % 6 == 0) {
      rowCounter = 1;
      columnCounter += 1;
    }
    let currRow = document.querySelector(`#row-${rowCounter}`);
    newBtn = document.createElement("button");
    newBtn.setAttribute("id", `btn-${i}`);
    newBtn.setAttribute("data-toggle", "modal");
    newBtn.setAttribute("data-target", "#exampleModal");
    newBtn.column = columnCounter;
    newBtn.addEventListener("click", function () {
      showQuestion(this, stateDoc);
    });
    newBtn.setAttribute("class", `qButtons btn btn-success p-md-4 col`);
    newBtn.innerText = columnCounter != 2 ? rowCounter * 100 : rowCounter * 200;
    currRow.append(newBtn);
    rowCounter += 1;
  }
}

function showQuestion(e, stateDoc) {
  e.style.backgroundColor = "teal";
  modalTitle.innerText = e.innerText;
  modal.innerHTML = "";
  currentQuestionId = e.id.match(/\d+/);
  columnSelected = e.column;

  modal.innerHTML =
    e.column == 1
      ? `<p>${questions[e.column]} ${stateDoc[currentQuestionId].name}</p>`
      : e.column == 2
      ? `<p>${
          questions[e.column]
        }</p><img src="./images/part ${imageLocation}/${stateDoc[
          currentQuestionId
        ].name
          .replace(/\s/g, "")
          .toLowerCase()}-outline.jpg"/>`
      : e.column == 3
      ? `<p>${questions[e.column]} ${stateDoc[currentQuestionId].abbr}</p>`
      : e.column == 4
      ? `<p>${questions[e.column]} ${stateDoc[currentQuestionId].capital}</p>`
      : `<p>${questions[e.column]} ${stateDoc[currentQuestionId].name}</p>`;
}

function showAnswer() {
  modal.innerHTML = "";
  modal.innerHTML =
    columnSelected == 4
      ? `<p>${stateDoc[currentQuestionId].name}</p>`
      : `<p>${stateDoc[currentQuestionId].capital}</p>`;
}

function differentGame() {
  while (primaryDiv.firstChild) {
    primaryDiv.removeChild(primaryDiv.firstChild);
  }
  let div = document.querySelector("#categories");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  document.querySelector("button").remove();
  let firstBtn = document.createElement("button");
  let secondBtn = document.createElement("button");
  firstBtn.setAttribute("id", "startGame");
  secondBtn.setAttribute("id", "startGame2");
  firstBtn.setAttribute("class", "btn btn-primary p-5 mr-1");
  secondBtn.setAttribute("class", "btn btn-primary p-5");
  firstBtn.addEventListener("click", () => startGame1());
  secondBtn.addEventListener("click", () => startGame2());
  firstBtn.innerText = "First Half";
  secondBtn.innerText = "Second Half";
  primaryDiv.append(firstBtn);
  primaryDiv.append(secondBtn);
}

function createUser() {
  let newPerson = prompt("Please Enter Your Name:", "James Bond");
  if (newPerson == null || newPerson == "") {
    return null;
  }
  let id = newPerson.replace(/\s/g, "");

  while (id == null || id == "" || document.getElementById(`${id}`) != null) {
    id = prompt("Please pick a different name");
    newPerson = id;
  }

  let newColumn = document.createElement("div");
  let btnDelete = document.createElement("button");
  btnDelete.innerText = "X";
  btnDelete.setAttribute("class", "btn-danger float-right btn-delete");
  btnDelete.addEventListener("click", removeScoreSystem);
  newColumn.setAttribute("class", "col-md-4 col-lg-2 score-div");
  newColumn.setAttribute("id", id);
  let userNameBtn = document.createElement("button");
  userNameBtn.innerText = newPerson;
  userNameBtn.setAttribute("class", "btn btn-info btn-name");
  userNameBtn.addEventListener("click", editUser);
  newColumn.append(btnDelete);
  newColumn.append(userNameBtn);
  userRow.append(newColumn);
  createUserScoreBoard(newColumn.id);
}

function editUser() {
  let newName = prompt("Please Enter Your Name:", this.innerText);
  this.innerText = newName;
}

function createUserScoreBoard(id) {
  let columnId = document.getElementById(id);
  let newDiv = document.createElement("div");

  let btnPlus = document.createElement("button");
  let score = document.createElement("p");
  let btnMinus = document.createElement("button");

  btnPlus.innerText = "+";
  score.innerText = 0;
  btnMinus.innerText = "-";

  newDiv.setAttribute("class", "mt-3");
  btnPlus.setAttribute("class", "btn-add btn-success ml-3");
  btnPlus.addEventListener("click", () => {
    addScore(`${id}Score`);
  });
  score.setAttribute("id", `${id}Score`);
  btnMinus.setAttribute("class", "btn-minus btn-danger mr-3");
  btnMinus.addEventListener("click", () => {
    minusScore(`${id}Score`);
  });
  newDiv.append(score);
  newDiv.append(btnMinus);
  newDiv.append(btnPlus);
  columnId.append(newDiv);
}

function removeScoreSystem() {
  this.parentElement.remove();
}

function addScore(id) {
  let test = document.getElementById(`${id}`);
  test.innerText = Number(test.innerText) + 100;
}

function minusScore(id) {
  let test = document.getElementById(`${id}`);
  test.innerText = Number(test.innerText) - 100;
}
