import _ from "lodash";

const bingoAudio = new Audio("./assets/bingo.mp3");
const cardContainerPlayer = document.querySelector(".player");
const cardContainerCPU = document.querySelector(".cpu");
const rollButton = document.querySelector(".button");
const drumNumber = document.querySelector(".drumNumber");

const drum = _.shuffle(_.range(1, 91));
const cardPlayer = _.shuffle(_.range(1, 91)).slice(0, 16);
const cardCPU = _.shuffle(_.range(1, 91)).slice(0, 16);

const generateCard = (cardContainer, cardNumbers) => {
  cardNumbers.forEach(number => {
    const div = document.createElement("div");
    div.classList.add("number");
    div.classList.add(`number-${number}`);
    div.textContent = number;
    cardContainer.appendChild(div);
  });
};

const dropNumber = (drum) => {
  const number = drum.pop();
  drumNumber.textContent = number;

  checkNumber(cardPlayer, number);
  checkNumber(cardCPU, number);

  checkWinner([cardPlayer, cardCPU]);
};

const checkNumber = (card, number) => {
  card.forEach((e, i) => {
    if (e === number) {
      card.splice(i, 1);
      const element = document.querySelector(`.number-${e}`);
      if (element) {
        element.classList.add("checked");
      }
    }
  });
};

const checkWinner = (cardboards) => {
  if (cardboards[0].length < 1) {
    cardContainerPlayer.classList.add("winner");
    bingoAudio.play();
    rollButton.remove();
  } else if (cardboards[1].length < 1) {
    cardContainerCPU.classList.add("winner");
    bingoAudio.play();
    rollButton.remove();
  } else if (cardboards[0].length < 1 && cardboards[1].length < 1) {
    cardContainerPlayer.classList.add("winner");
    cardContainerCPU.classList.add("winner");
    bingoAudio.play();
    rollButton.remove();
  }
};

generateCard(cardContainerPlayer, cardPlayer);
generateCard(cardContainerCPU, cardCPU);

rollButton.addEventListener("click", () => dropNumber(drum));
