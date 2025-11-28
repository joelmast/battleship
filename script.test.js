const { Ship, Gameboard } = require("./script.js");

describe("Ship", () => {
	let myShip;
	let myShip2;
	beforeEach(() => {
		myShip = new Ship(5, 3, false);
		myShip2 = new Ship(4, 4, true);
	});

	test("ship test 1", () => {
		expect(myShip).toEqual({ length: 5, hits: 3, isSunk: false });
	});
	test("ship test 2", () => {
		expect(myShip2).toEqual({ length: 4, hits: 4, isSunk: true });
	});

	test("ship hit test 1", () => {
		expect(myShip.hit()).toEqual(4);
	});

	test("ship hit test 2", () => {
		expect(myShip2.hit()).toEqual(5);
	});

	test("ship isSunked test 1", () => {
		expect(myShip.isSunked()).toEqual(false);
	});

	test("ship isSunked test 2", () => {
		expect(myShip2.isSunked()).toEqual(true);
	});
});

describe("Gameboard", () => {
	let gameboard;
	let testShip;
	let testShip2;
	beforeEach(() => {
		gameboard = new Gameboard();
		testShip = new Ship(3, 0, false);
		testShip2 = new Ship(4, 0, false);
	});

	test("gameboard placeShip horizontal test", () => {
		gameboard.placeShip(testShip, 1, 1, true);
		expect(gameboard.grid[1][1]).toEqual(testShip);
		expect(gameboard.grid[1][2]).toEqual(testShip);
		expect(gameboard.grid[1][3]).toEqual(testShip);
	});
	test("gameboard placeShip vertical test", () => {
		gameboard.placeShip(testShip2, 4, 4, false);
		expect(gameboard.grid[4][4]).toEqual(testShip2);
		expect(gameboard.grid[5][4]).toEqual(testShip2);
		expect(gameboard.grid[6][4]).toEqual(testShip2);
		expect(gameboard.grid[7][4]).toEqual(testShip2);
	});
	test("receiveAttack function test", () => {
		gameboard.receiveAttack(0, 0);
		expect(gameboard.grid[0][0]).toEqual("miss");
		gameboard.placeShip(testShip, 1, 1, true);
		gameboard.receiveAttack(1, 1);
		expect(testShip.hits).toEqual(1);
	});
	test("allShipsSunk function test", () => {
		gameboard.placeShip(testShip, 1, 1, true);
		gameboard.placeShip(testShip2, 4, 4, false);
		expect(gameboard.grid[1][1]).toEqual(testShip);
		expect(gameboard.grid[4][4]).toEqual(testShip2);
		expect(gameboard.allShipsSunk()).toEqual(false);
		for (let i = 0; i < testShip.length; i++) {
			testShip.hit();
		}
		for (let i = 0; i < testShip2.length; i++) {
			testShip2.hit();
		}
		expect(gameboard.allShipsSunk()).toEqual(true);
	});
});
