const cellElements = document.querySelectorAll('.cell');
const board = document.querySelector('.game-board');
// const restartButton = document.querySelector('.restart-button');

const winningLine = document.getElementById('winningLine');
const X_CLASS = 'x';
const O_CLASS = 'o';
let turn ;
let arr= new Array(9);
let tap = 0;
let currntPlayer ;
let afterwin  =0;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
cellElements.forEach((cell,i)=>{
    cell.id=i;
    cell.addEventListener('click',(e)=>{
             let currnt=  e.target
             if(currnt.innerHTML||afterwin) return
             currnt.classList.remove(currntPlayer)
              currntPlayer = turn?X_CLASS:O_CLASS
             arr[currnt.id] =currntPlayer;
             currnt.innerHTML = currntPlayer
             let move  = currntPlayer===X_CLASS?O_CLASS:X_CLASS
             winningLine.innerHTML =`<h4> Turn of ${move} </h4>`
             currnt.classList.add(currntPlayer);
             tap++;
            Winner()
           turn=!turn
    })
})
function Winner()
{
    for(let i  = 0 ;i<WINNING_COMBINATIONS.length;i++)
    {    let count =0;
        let count1 =0;
        for (let j = 0; j < WINNING_COMBINATIONS[0].length; j++) {
              if(arr[WINNING_COMBINATIONS[i][j]]===X_CLASS){
                count++;
              }
              if(arr[WINNING_COMBINATIONS[i][j]]===O_CLASS){
                count1++;
              }
              
            
        }   
        if(count===3) {
            endGame()
           
            return

        }
        if(count1===3)
        {
           endGame()
          
            return
        }
        if(tap===9)endGame("draw")
        
    }
}

// Update endGame function to display the winner overlay
const endGame = (draw) => {
     afterwin =1;
    if (draw) {
        showWinnerMessage("It's a draw!");
    } else {
        showWinnerMessage(`${turn ? "X" : "O"} wins!`);
    }
};

// Function to show winner message
const showWinnerMessage = (message) => {
    const gameOverMessage = document.createElement("div");
    gameOverMessage.innerHTML = `Game Over! : ${message}`;
    gameOverMessage.style.position = "fixed";
    gameOverMessage.style.top = "50%";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.transform = "translate(-50%, -50%)";
    gameOverMessage.style.background = "#fff";
    gameOverMessage.style.border = "2px solid #000";
    gameOverMessage.style.padding = "20px";
    document.body.appendChild(gameOverMessage);
    setTimeout(() => {
        
        document.body.removeChild(gameOverMessage);
        tap =0;
        afterwin =0;
        cellElements.forEach((cell,i)=>{
             cell.innerHTML ='';
             arr[i] = null;
        })
       
    }, 2000);
 
};





    

