let timeLine = [tl1, tl2];

const imageFade = (fade) => {
    let visible = 0.0;
    let intervalID = setInterval(function() {
      if (visible !== 1) {
          fade.style.opacity = visible;
          visible += 0.1;
          visible = Math.round(10 * visible) / 10;
          console.log(visible);
      } else{
          clearInterval(intervalID);
      }
  }, 30);
};

const templateCore = (situation, choices, character, background, audio) => {
    document.querySelector("body").innerHTML = "";
    let myDiv = document.createElement('div');
     myDiv.innerHTML = `
        <section class="core">
            <div class="container">
                <img class="imgSituation" src="${background}">
                <div class="characterContainer">
                    <img class="characterImg" src="${character}">
                </div>
                <div class="bubbleText">
                   <p class="text situation">${situation}</p>
                   <div class="answerContainer">
                   </div>
                   <div class="arrow-left"></div>
                   </div>
             </div>
        </section>`;
    document.querySelector('body').appendChild(myDiv);
    let answerContainer = document.querySelector(".answerContainer");
    for (let i = 0; i < choices.length; i++) {
        let myAnswer = document.createElement('p');
        myAnswer.dataset.target = choices[i].target;
        myAnswer.innerHTML = choices[i].content;
        myAnswer.classList.add('text', 'answer');
        answerContainer.appendChild(myAnswer);
    }
    if (audio !== false) {
        let aud = document.createElement("audio");
        aud.src = audio;
        aud.play();
        console.log(aud);
        myDiv.appendChild(aud);
    }
    return myDiv;
};

const display = (situation, choices, character, background, audio = false) => {
    let body = document.querySelector('body');
    let newChoice = templateCore(situation, choices, character, background, audio);
    body.appendChild(newChoice);
    let fade = document.querySelector(".imgSituation");
    imageFade(fade);
    let but = document.querySelectorAll(".answer");
    for (let i = 0; i < but.length; i++) {
        but[i].addEventListener("click", function() {
            let target = this.getAttribute("data-target");
            let redirection = target.split(',');
            display(timeLine[redirection[0]][redirection[1]].situation,
                timeLine[redirection[0]][redirection[1]].answers,
                timeLine[redirection[0]][redirection[1]].character,
                timeLine[redirection[0]][redirection[1]].background,
                timeLine[redirection[0]][redirection[1]].audio);
        });
    }
};

//display(timeLine[0][0].situation, timeLine[0][0].answers, timeLine[0][0].character, timeLine[0][0].background);