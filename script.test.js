const { Ship } = require("./script.js");

describe("Ship", () => {
  let myShip;

  beforeEach(() => {
    myShip = new Ship(5, 3, false);
  });

  test("ship test 1", () => {
    expect(myShip).toEqual({ length: 5, hits: 3, isSunk: false });
  });
});
