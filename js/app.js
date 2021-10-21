/*-------------------------------- Constants --------------------------------*/
// number 4 gives winning combos
const winCombos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]

/*---------------------------- Variables (state) ----------------------------*/
// number 1 define variables
let winner, turn, board

/*------------------------ Cached Element References ------------------------*/
// number 2 selects form page for a reference
// number 2.1 gets all 9 square classes
const squares = document.querySelectorAll('section > div')
// number 2.2 gives game status (the message you see on the screen)
const message = document.querySelector('#message')
// number 6.2 resets game
const resetBtn = document.getElementById('reset')
/*----------------------------- Event Listeners -----------------------------*/
// number 5 lets users click squares
squares.forEach((square) => {
square.addEventListener('click', handleClick)
})




//  number 6 initialize variables
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
// number 3 calls the initialize function
init ()
//  numb 3.2 starts the function ""
function init() {
  // numb 3.2.1 null for 9 squares
  board = [null, null, null, null, null, null, null, null, null]
// numb 3.2.2 lets us know its player x turn
  turn = 1
// numb 3.2.3 set winner to null
  winner = null 
// numb 3.2.4 call render
  render()
// 3.3 start my render function so init will end
}
//numb 3.3.1 loop render function
function render() {
	// 3.3.1.1 loop over the board cells
	board.forEach((cell, idx) => {
		let cellColor
		if (cell === 1) {
			cellColor = 'green'
		} else if (cell === -1) {
			cellColor = 'purple'
		} else if (cell === null) {
			cellColor = 'white'
		}
		squares[idx].style.background = cellColor
	})

	if (!winner) {
		// 3.3.2.1) If winner has a value other than null (game still in progress), render whose turn it is.
		// Hint: Maybe use a ternary inside of a template literal here?
		message.innerText = `It is ${turn === 1 ? 'X' : 'O'}'s turn!`
	} else if (winner === 'T') {
		// 3.3.2.2) If winner is equal to 'T' (tie), render a tie message.
		message.innerText = `Cat's game. 🐱 MEOW!!!!`
	} else {
		// 3.3.2.3) Otherwise, render a congratulatory message to which player has won.
		// Hint (again): Maybe use a ternary inside a template literal here
		message.innerText = `Congratulations ${winner === 1 ? 'X' : 'O'}!!!!!`
	}
	// 3.4) After completing this step, you should be able to manually change the values held in the board array in the initialization function and see the style of the corresponding square change on your page.
}

// the handleClick function will...
function handleClick(evt) {
	// 5.1) Obtain the index of the square that was clicked by:
	// 5.1.1) "Extracting" the index from an id assigned to the element in the HTML
	let sqIdx = parseInt(evt.target.id.replace('sq', ''))
	// 5.2) If the board has a value at the index, immediately return because that square is already taken.
	// 5.3) If winner is not null, immediately return because the game is over.
	if (board[sqIdx] || winner) {
		return
	}
	// 5.4) Update the board array at the index with the value of turn.
	board[sqIdx] = turn

	// 5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
	turn *= -1

	// 5.6) Set the winner variable if there's a winner by calling a new function: getWinner.
	// The getWinner function will...
	winner = getWinner()

	// 5.7) All state has been updated, so render the state to the page (step 3.3).
	render()
}

function getWinner() {
	// 5.6.1) There are a couple methods you can use to find out if there is a winner.
	// This is the first, more elegant way that takes advantage of the winningCombos array you wrote above in step 4.
	// The 5.6.2 step is a little simpler to comprehend, but you'll need to write a lot more code.
	// The 5.6.2 step also won't take advantage of the winningCombos array, but using it as a reference will help you build a solution.
	// Choose only one path.

	// 5.6.1.1) Loop through the each of the winning combination arrays defined.
	// 5.6.1.2) Total up the three board positions using the three indexes in the current combo.
	// 5.6.1.3) Convert the total to an absolute value (convert any negative total to positive).
	// 5.6.1.4) If the total equals 3, we have a winner! Set the winner variable to the board's value at the index specified by the first index of that winning combination's array by returning that value.

	// More elegant approach:
	// for (let i = 0; i < winningCombos.length; i++) {
	//   if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
	// }

	// 5.6.2) This solution is less elegant, but might be easier to write on your own if you're struggling with the 5.6.1.X pseudocode.

	// 5.6.2.1) For each one of the winning combinations you wrote in step 4, find the total of each winning combination.
	// 5.6.2.2) Convert the total to an absolute value (convert any negative total to positive)
	// 5.6.2.3) If the total equals 3, we have a winner! Set the winner variable to the board's value at the index specified by the first index of that winning combination's array by returning that value.

	if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0]
	if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3]
	if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6]
	if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0]
	if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1]
	if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2]
	if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0]
	if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2]

	// 5.6.3) Next, If there's no winner, check if there's a tie:
	// 5.6.4) Set the winner varible to "T" if there are no more nulls in the board array by returning the string "T".
	// 5.6.5) Otherwise return null.

	if (board.includes(null)) {
		return null
	} else {
		return 'T'
	}
}