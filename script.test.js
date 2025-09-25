const { Ship } = require("./script.js");

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
