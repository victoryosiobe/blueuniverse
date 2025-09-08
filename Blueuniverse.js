let moreman = document.getElementById("moreopen");
let more = document.getElementById("more");
let always = document.getElementById("always");
let mainContent = document.getElementById("plot");
let arrowMan = document.getElementById("arrowDown");
let butt = document.getElementById("butt");
let body = document.body;
let bscrollh = body.scrollHeight;

setTimeout(updateParaPOS, 200);
setTimeout(updateAlwaysText, 1500);
setTimeout(updatebutt, 2300);
setTimeout(updateAlwaysFormat, 2300);
setTimeout(displayMore, 2300);
window.addEventListener("scroll", reveal);

mainContent = mainContent.children;

function updateParaPOS() {
  for (eachpara of mainContent) {
    eachpara.style.marginTop = "0px";
    always.style.transition = "1s";
  }
}

function updateAlwaysText() {
  always.textContent = "Blue Universe";
}

function updatebutt() {
  // to delay
  let butt = document.getElementById("butt");
  butt.style.height = "4em";
  butt.style.lineHeight = "4em";
}

function updateAlwaysFormat() {
  let astylo = always.style;
  astylo.color = "var(--blue-sleek)";
  astylo.background = "rgba(0,0,0,0.85)";
  astylo.textAlign = "left";
  astylo.fontWeight = "bold";
}

function reveal() {
  let bodyHeight = body.scrollHeight; //kinda new height
  let windowheight = window.innerHeight;
  let windowViewAt = window.pageYOffset;
  let percent10 = bodyHeight * 0.1;
  let percent90 = bodyHeight * 0.85;
  windowViewAt > percent10
    ? (arrowMan.style.display = "block")
    : (arrowMan.style.display = "none");
  windowViewAt < percent90
    ? transformArrow("downward")
    : transformArrow("upward");
  for (eachpara of mainContent) {
    let revealtop = eachpara.getBoundingClientRect().top; //this gets the top distance from the element, although getBoundingClientRect() can get height, width, right, top, left, bottom values. so, the .top after it specifies only top position.
    let revealpoint = 70;
    revealtop < windowheight - revealpoint
      ? (eachpara.style.transform = "translateY(0%)")
      : (eachpara.style.transform = "translateY(50%)"); //lets say windowheight is 700
    // and revealpoint is 100, their value after minusing is 600. ao this code says
    //if the top value (any number) is less than 600 after scrolling, trigger the block of code below.
  }
}

function transformArrow(upORdown) {
  if (upORdown === "upward") {
    // console.log('up')
    arrowMan.style.transform = "rotateX(180deg)";
  } else {
    // console.log('down')
    arrowMan.style.transform = "rotateX(0deg)";
  }
}

arrowMan.onclick = (e) => {
  if (arrowMan.style.transform === "rotateX(0deg)") {
    window.scrollTo({
      top: Math.abs(bscrollh),
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: -bscrollh,
      behavior: "smooth",
    });
  }
};

function displayMore() {
  let more = document.getElementById("more");
  more.style.display = "block";
}
// //to remove always from fixed
// setTimeout(removefunc, 7900) //for here, i need to remove the always element from fixed to static so there'd be space, but to get this done i will add the delay for the fade code to work and the time it takes to fade that is '6800ms + 700ms = 7500ms'. This is to know the right time to change to static and i added some more time too.
// function removefunc() {
//   let help = document.getElementById('always')
//   help.style.position = 'static'
// }

// setTimeout(function() { //to delay code because of initial animation.
//   let op = 0.001
//   let shown = document.getElementById('always')
//   let timer = setInterval(function() {
//     if (op >= 1) {
//       clearInterval(timer)
//     }
//     else {
//       shown.style.opacity = op
//       op += op * 0.35 // i didn't use 0 as op, because op is multipluing 0.1
//       //  console.log(op)
//     }
//   }, 200)
// }, 6800) //this code intended to fadein, does both fade in and out, because of transition in css code. the transistion slows its change of opacity to 0.001 (fadeout), but the main job was to fade code in.

// setTimeout(function() {
//   let more = document.getElementsByName('linesup')
//   more.forEach(function(value) {
//     let op = 0.001
//     let timer = setInterval(function() {
//       if (op >= 1) {
//         clearInterval(timer)
//       }
//       else {
//         value.style.opacity = op
//         value.style.display = 'block'
//         op += op * .7
//         value.style.zIndex = 1.4 // i didn't use 0 as op, because op is multipluing 2.
//         //console.log(value)
//       }
//     }, 50)
//   })
// }, 13591)

more.addEventListener("click", function (e) {
  //function will still work, both for 'e' and the code under. see why e was added in the next code line.
  e.stopPropagation(); //this is to make sure that the code isnt triggered when opacity is 0 or less. Now, code will work only when #moreopen is clicked. if i remove it, as soon as code is fading when clicked on anywhere, it will take over, stop the prossesss and continue it, with unsteady opacity and it will hence misbehave.

  if (moreman.style.display == "none") {
    let op = 0;
    let timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      } else {
        moreman.style.opacity = op;
        moreman.style.display = "flex";
        op += 0.1;
      }
    }, 10); // chose 10 so it could slightly fade in and fade out at same rate.
  } else {
    let timed = setInterval(function () {
      //tried to do a fadeout after clicking again.
      if (moreman.style.opacity <= 0) {
        //if it's less or equal to 0 after reduction in opacity, clear interval and set display as none
        clearInterval(timed);
        moreman.style.display = "none";
      } else {
        moreman.style.opacity -= 0.1; //part for reducing opacity.
      }
    }, 20);
  }
});
("");
document.addEventListener("click", function (event) {
  //this is literally for making the menu hide when anywhere when the document is clicked, but give it some fadeout impression too.
  // console.log('user clicked: ', event.target)
  if (!moreman.contains(event.target)) {
    //meaning, if moreman does not contains the event target exceute code
    let goNow = setInterval(function () {
      let moreop = window.getComputedStyle(moreman).opacity; // with this, i can get the real value of opacity of moreman.display.opacity, i could also get other properties' value, by removing opacity in the next line and putting something like height, width (anything css, ecen animation).
      if (moreop <= 0) {
        clearInterval(goNow);
        moreman.style.display = "none";
      } else {
        moreop -= 0.1;
        moreman.style.opacity = moreop;
      }
    }, 20);
  }
});

