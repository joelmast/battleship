function renderBoard(gameboard, isPlayerBoard) {
	let boardContainer = document.getElementById("board-container");

	for (let i = 0; i < gameboard.grid.length; i++) {
		for (let j = 0; j < gameboard.grid[i].length; j++) {
			let cell = document.createElement("div");
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
