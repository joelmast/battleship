function renderBoard(gameboard, isPlayerBoard) {
	let boardContainer = document.getElementById("board-container");

	for (let i = 0; i < gameboard.grid.length; i++) {
		for (let j = 0; j < gameboard.grid[i].length; j++) {
			let cell = document.createElement("div");
			if (isPlayerBoard === false) {
				cell.addEventListener("click", () => {
					let dataX = cell.getAttribute("data-x");
					let dataY = cell.getAttribute("data-y");

					// Pass coordinates to Human Player attack

					// Computer player make counterattack

					// Check for win

					// Re-render boards
				});
			}
			cell.setAttribute("data-x", j);
			cell.setAttribute("data-y", i);
			cell.classList.add("cell");
			if (gameboard.grid[i][j] === "miss") {
				cell.classList.add("miss");
			} else if (gameboard.grid[i][j] === "hit") {
				cell.classList.add("hit");
			} else if (gameboard.grid[i][j] === 0) {
				cell.classList.add("nothing");
			} else if (isPlayerBoard) {
				cell.classList.add("ship");
			}
			boardContainer.appendChild(cell);
		}
	}
}

module.exports = { renderBoard };
