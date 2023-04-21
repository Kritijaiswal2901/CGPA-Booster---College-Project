// Coded by Harshit

document.addEventListener('DOMContentLoaded', function() {

    const gameBoard = document.querySelector(".game-board");
    const createButton = document.querySelector(".btn-create");
  
    // Choosing the Level for the Game:
    const levelMenu = document.querySelector("#level_menu");
  
    let selectedOption = levelMenu.value;
  
  // default images:
    let allColors = [
      "images/bird.png",
      "images/butterfly.png",
      "images/cat.png",
      "images/giraffe.png",
      "images/lion.png",
      "images/dog.png",
    ];
  
    //custom image selection:
    const customImageBtn = document.querySelector(".btn-custom");
    const imageUploadModal = document.querySelector("#imageModal");
    customImageBtn.onclick = () => {
      imageUploadModal.style.display = "block";
      uploadImage();
    }
    // Upload Images:
    const uploadImageSection = document.querySelector(".custom-image__container");
    const inpFile = [...uploadImageSection.getElementsByTagName("input")];
  
    function uploadImage() {
  
      allColors = []; // empty the default array that has animals as default.
      //  Grab Uploaded files:
  
  
      inpFile.forEach((item, index) => {
        
        var previewImage = document.createElement("img");
        previewImage.classList.add("previewImag");
        previewImage.setAttribute("id", "image" + index);
        console.log("previewImage", previewImage)
        
        item.onchange = function() {
          const file = this.files[0];
          let parentNodetoAppend = this.parentElement;
  
          if (file) {
            const reader = new FileReader();
            reader.onload = function() {
              previewImage.src = this.result;
              parentNodetoAppend.appendChild(previewImage);  // show the image preview.
              previewImage.style.display = "block";
              allColors.push(this.result); //replace the new images with the default ones (animals).
  
            }
            reader.readAsDataURL(file);
          }
        }
      });
    }
  
  
    let colors = [];
  
    levelMenu.addEventListener("change", function() {
      selectedOption = this.value;
      colors = []; // clear the array content to prevent overriding when user changes the option everytime.
      switch (selectedOption) {
        case "easy": // choose 4 random colors
          chooseRandomColors(4);
          break;
        case "medium":
          chooseRandomColors(5);
          break;
        case "hard":
          chooseRandomColors(6);
          break;
        default:
          chooseRandomColors(4);
      }
  
  
    });
  
  
    // if selectedOption = easy. Choose random 4 colors from allColors
    // if selectedOption = medium. Choose ramdom 5 colors from allColors
    // if selectedOption = hard. Use allColors array directly..
  
  
    // function that chooses random colors from allColors, using the number parameters:
  
    function chooseRandomColors(numberOfCards) {
      // choose 4 random index numbers
      let tempAllColors = []; // Create a temporary array.
      allColors.forEach(item => {
        tempAllColors.push(item)
      }); // duplice the allColors array as tempAllColors.
  
      shuffle(tempAllColors); // shuffle the array to choose random colors.
  
      for (let i = 0; i < numberOfCards; i++) {
        colors.push(tempAllColors[i]);
      }
    }
  
  
    createButton.addEventListener("click", createBoard);
  
  
  
    let pickedColors = [];
  
  
    let firstCard;
    let secondCard;
  
    let firstCardColor;
    let secondCardColor;
  
    let scoreCounter = 0;
  
    // Shuffle the cards so that the order of the color will be different.
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  
    // function that creates the Board:
    // CREATE THE BOARD
  
    function createBoard() {
      // First check whether an option is selected. Warn the user if not.
      scoreCounter = 0;
      updateScore(scoreCounter);
  
      if (selectedOption === "choose") {
        document.querySelector(".modal-content p").innerText = "Choose an Option!";
        modalWarning.style.display = "block";
        return false;
      }
  
      let pickedColors = [];
  
      for (let i = 0; i < colors.length; i++) {
        // tempPickedColors.push(colors[i]);
        // tempPickedColors.push(colors[i]); // duplicate the elements inside the array.
  
        pickedColors.push(colors[i]);
        pickedColors.push(colors[i]); // duplicate the elements inside the array.
        // ["red", "red", "blue", "blue", "green", "green"]
  
      }
  
  
      shuffle(pickedColors); // shuffle the cards.
      // First, check if a set of cards already exist. IF they do, delete them all and replace with new ones.
  
      if (gameBoard.children.length === 0) {
        // If no cards exist in the board, create them:
  
        for (let i = 0; i < pickedColors.length; i++) {
          // let colorContainer = document.createElement("div");
          let cardContainer = document.createElement("div");
          let innerCard = document.createElement("div");
          let frontCard = document.createElement("div");
          let backCard = document.createElement("div");
  
          cardContainer.setAttribute("id", i);
          cardContainer.setAttribute("class", "flip-card");
          innerCard.setAttribute("class", "flip-card-inner");
  
  
          frontCard.setAttribute("class", "flip-card-front");
          // frontCard.style.backgroundImage = pickedColors[i]; /// THIS IS THE PART WHERE THE IMAGE IS ATTACHED TO THE FRONT OF THE CARD.
          frontCard.style.backgroundImage = 'url(' + pickedColors[i] + ')'; /// THIS IS THE PART WHERE THE IMAGE IS ATTACHED TO THE FRONT OF THE CARD.
  
          backCard.setAttribute("class", "flip-card-back");
  
          gameBoard.appendChild(cardContainer);
          cardContainer.appendChild(innerCard);
  
          innerCard.appendChild(backCard); // the order of appending front and back cards are crucial here. DO NOT CHANGE IT.
          innerCard.appendChild(frontCard);
          // cardContainer.onclick = flip;
          //
          // function flip() {
          //   this.firstElementChild.classList.toggle("animate");
          // }
  
  
  
  
  
  
  
  
          // colorContainer.style.backgroundColor = pickedColors[i];
          // colorContainer.classList.add("card");
          // colorContainer.classList.add("flipped-over");
          gameBoard.appendChild(cardContainer);
        }
  
        document.querySelectorAll(".flip-card").forEach(item => {
          item.addEventListener("click", handleClick); // add event listener for all the cards on the board.
        });
  
  
        function handleClick(event) {
  
          // this: .flip-card
          // First,to avoid a logical error, check if the clicked card has already been matched before:
          if (this.classList.contains("matched")) {
            console.log("do nothing.");
          } else {
  
            // check if any card has been clicked and is up already.
  
            const numberOfOnCards = CardsOn(); // returns the number of ON cards.
            console.log("numberOfOnCardsss: ", numberOfOnCards);
            // if a card is already flipped:
            if (numberOfOnCards === 0) {
              this.firstElementChild.classList.toggle("animate"); // if none or one card is already on, you can flip over another card.
              firstCardColor = this.firstElementChild.childNodes[1].style.backgroundImage; // keep the first card's color in a variable.
              firstCard = this;
  
            } else if (numberOfOnCards === 1) {
              console.log("here i am:", this.firstElementChild);
              this.firstElementChild.classList.toggle("animate"); // if none or one card is already on, you can flip over another card.
              secondCardColor = this.firstElementChild.childNodes[1].style.backgroundImage;
              secondCard = this;
              setTimeout(checkSameCards, 1000); // if they are equal change their color ( by adding a css class.)
  
            } else {
  
            }
  
          }
  
  
        }
  
      } else {
        // If some cards exist in the board, clear the contents and replace them with new cards by re-calling the createBoard function.
        gameBoard.innerHTML = "";
        createBoard();
      }
  
  
    }
  
  
  
    function CardsOn() {
      // if the selected card is not a member of matched cards and it is on, increment the counter.
      // açıksa animate var.
      let counter = 0;
  
      const allCards = document.querySelectorAll(".flip-card");
      // element.firstElementChild
      allCards.forEach(item => {
        if (item.firstElementChild.classList.contains("animate") && !item.classList.contains("matched")) {
          counter++;
          console.log(counter);
        }
  
      });
      return counter;
  
    }
  
  
  
    function checkSameCards() {
      if (firstCard !== secondCard && firstCardColor === secondCardColor) {
        // firstCard.classList.remove("flipped-over");
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        checkMatchedCards(); // check if all cards have been matched.
        // secondCard.classList.remove("flipped-over");
        scoreCounter ++;
        updateScore(scoreCounter);
      } else {
        // if they are not the same cards. Flip them back off
        firstCard.firstElementChild.classList.toggle("animate");
        secondCard.firstElementChild.classList.toggle("animate");
        console.log("I'm hereeee", secondCard.firstElementChild);
        hasMatchedCards = false;
      }
    }
  
  });
  
  function checkMatchedCards() {
  
    const allCards = [...document.querySelectorAll(".flip-card")];
    // element.firstElementChild
    const isAllOn = allCards.every(item => {
      // if (item.classList.contains("matched")) {
      //   counter++;
      //   console.log(counter);
      return item.classList.contains("matched");
  
  
    });
  
    if (isAllOn) {
      modal.style.display = "block";
    }
  }
  
  function updateScore(value) {
    document.querySelector(".score-value").innerHTML = value;
  }
  
  
  //modal
  
  // Get the modal
  const modal = document.querySelector(".modal");
  const modalWarning = document.getElementById("warningModal");
  const modalImage = document.getElementById("imageModal");
  
  // // Get the button that opens the modal
  // var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  const spanWarning = document.getElementsByClassName("close")[0];
  const spanImage = document.getElementsByClassName("close")[1];
  
  // // When the user clicks the button, open the modal
  // btn.onclick = function() {
  //   modal.style.display = "block";
  // }
  
  // When the user clicks on <span> (x), close the modal
  spanWarning.onclick = function() {
    modalWarning.style.display = "none";
  }
  spanImage.onclick = function() {
    modalImage.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modalWarning) {
      modalWarning.style.display = "none";
    } else if (event.target == modalImage) {
      modalImage.style.display = "none";
  
    }
  }
  
  
  
  
  
  
  
  
  // Coded by Harshit
  