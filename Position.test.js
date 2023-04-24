const Position = require("./Position");

//2.1
test('Testing Position() -- success', () => {
    expect(() => new Position('GOOG', 1)).not.toThrow();
});

test('Testing Position(ticker, amount) -- success', () => {
    testPostion = new Position('GOOG', 1);
    expect(testPostion.ticker).toBe('GOOG');
    expect(testPostion.amount).toBe(1);
});
