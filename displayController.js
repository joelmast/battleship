function renderBoard(gameboard, isPlayerBoard, containerID, attackHandler) {
	let boardContainer = document.getElementById(containerID);
	boardContainer.innerHTML = "";

	for (let i = 0; i < gameboard.grid.length; i++) {
		for (let j = 0; j < gameboard.grid[i].length; j++) {
			let cell = document.createElement("div");
			// Add cell class
			cell.classList.add("cell");
			// Set data coordinates
			cell.setAttribute("data-x", j);
			cell.setAttribute("data-y", i);
			// Add event listener for the computers board
			if (isPlayerBoard === false) {
				if (
					gameboard.grid[i][j] !== "hit" &&
					gameboard.grid[i][j] !== "miss"
				) {
					cell.addEventListener("click", () => {
						attackHandler(j, i);
					});
				} else {
					// Change to DOM later
					alert("already attacked!");
				}
			}
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
