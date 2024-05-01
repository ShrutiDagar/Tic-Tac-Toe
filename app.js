let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-game");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
const winPatterns =
[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

let turnO = true;
let isFirstClick = true;
let flag = false;
let prevBox = null;

function removeButtonsFromBox(box) {
    let buttons = box.querySelectorAll("button");
    buttons.forEach(button => button.remove());
}
const resetGame = () => {
    turnO = true;
    isFirstClick = true;
    enableAllBoxes();
    msgContainer.classList.add("hide");  

}
const disableAllBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
}
const enableAllBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) =>{
    msg.innerText = `Congratulations ! Winner is ${winner}`;
    msgContainer.classList.remove("hide");  
    disableAllBoxes();
}
function createButton(text) {
    let button = document.createElement("button");
    button.innerText = text;   
    button.style.padding = "15px"; // Example CSS style
    button.style.backgroundColor = "#b2dfdb";
    button.style.color = "#00796b";
    // Add more CSS styles as needed
    return button;
}

boxes.forEach((box) =>{
    box.addEventListener("click", ()=> {
        if(isFirstClick)
        {
            if (prevBox != null && prevBox !== box) {
                removeButtonsFromBox(prevBox);
            }
            let xButton = createButton("X");
            let oButton = createButton("O");
            box.appendChild(xButton);
            box.appendChild(oButton);

            xButton.addEventListener("click", () => {
                turnO = false;
                box.disabled = true;
                isFirstClick = false;
                flag = true;
            })
            oButton.addEventListener("click", () => {
                turnO = true;  
                box.disabled = true;
                isFirstClick = false;
                flag = true;
            }) 
            prevBox = box;
        }
        else{
            if(turnO)
            {
                box.innerText = "O";
                turnO = false;
            }
            else{
                box.innerText = "X";
                turnO = true;     
            }
            box.disabled = true;
            checkWinner();
        }
    })
})
const checkWinner = () => {
    for(let pattern of winPatterns)
    {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerHTML, boxes[pattern[1]].innerHTML, boxes[pattern[2]].innerHTML);
        val1 = boxes[pattern[0]].innerHTML;
        val2 = boxes[pattern[1]].innerHTML;
        val3 = boxes[pattern[2]].innerHTML;
        if( val1 != "" && val2 != "" && val3 != "")
        {
            if( val1 === val2 && val2 === val3)
            {
                showWinner(val1);
            }
        }

    }
}
newgame.addEventListener("click", resetGame); 
reset.addEventListener("click", resetGame); 
