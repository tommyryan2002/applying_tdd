const StockPortfolio = require("./StockPortfolio");
const Position = require("./Position");
const ShareSaleException = require("./ShareSaleException");

//2.1
test('Testing StockPortfolio() -- is empty', () => {
    expected = [];
    actual = new StockPortfolio().positions;
    expect(actual).toStrictEqual(expected);
});

//2.2
test('Testing StockPortfolio().isEmpty() -- true', () => {
    testPortfolio = new StockPortfolio();
    expect(testPortfolio.isEmpty()).toBe(true);
});

test('Testing StockPortfolio().isEmpty() -- false', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 2);
    testPortfolio.positions = [testPosition];
    expect(testPortfolio.isEmpty()).toBe(false);
});


//2.3
test('Testing StockPortfolio().uniqueTickers() -- empty portfolio', () => {
    testPortfolio = new StockPortfolio();
    expect(testPortfolio.uniqueTickers()).toBe(0);
});

test('Testing StockPortfolio().uniqueTickers() -- two unique ticker', () => {
    testPortfolio = new StockPortfolio();
    testPortfolio.positions = [new Position('GOOG', 4), new Position('MSFT', 2)];
    expect(testPortfolio.uniqueTickers()).toBe(2);
});

test('Testing StockPortfolio().uniqueTickers() -- duplicate tickers', () => {
    testPortfolio = new StockPortfolio();
    testPortfolio.positions = [new Position('GOOG', 1), new Position('GOOG', 1)];
    expect(testPortfolio.uniqueTickers()).toBe(1);
});

//2.4
test('Testing StockPortfolio.makePurchase() -- new position', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 2);
    testPortfolio.makePurchase(testPosition);
    expect(testPortfolio.positions).toStrictEqual([testPosition]);
});

test('Testing StockPortfolio.makePurchase() -- add to existing position', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 2);

    testPortfolio.positions = [testPosition]
    testPortfolio.makePurchase(testPosition);

    expectedPosition = new Position('GOOG', 4);
    expect(testPortfolio.positions).toStrictEqual([testPosition]);
});

//2.5
test('Testing StockPortfolio.makeSale() -- remove from existing position', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 2);

    testPortfolio.positions = [testPosition]
    testSalePosition = new Position('GOOG', 1);
    testPortfolio.makeSale(testSalePosition);

    expectedPositions = [testSalePosition]
    expect(testPortfolio.positions).toStrictEqual(expectedPositions);
});

test('Testing StockPortfolio.makeSale() -- remove from non-existing position', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 1);
    testSalePosition = new Position('MSFT', 1);

    testPortfolio.positions = [testPosition]
    expect(() => testPortfolio.makeSale(testSalePosition)).toThrow(new Error("Ticker not in portfolio!"));
});

//2.6
test('Testing StockPortfolio.numShares() -- existing position', () => {
    testPortfolio = new StockPortfolio();
    testTicker = 'GOOG'
    testPosition = new Position(testTicker, 1);
    
    testPortfolio.positions = [testPosition]
    expect(testPortfolio.numShares(testTicker)).toBe(1);
});

test('Testing StockPortfolio.numShares() -- non-existing position', () => {
    testPortfolio = new StockPortfolio();
    testTicker = 'GOOG'
    testPosition = new Position(testTicker, 1);
    
    testPortfolio.positions = [testPosition]
    expect(testPortfolio.numShares('MSFT')).toBe(0);
});

//2.7
test('Testing StockPortfolio.makeSale() -- removes empty positions', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 2);

    testPortfolio.positions = [testPosition]
    testPortfolio.makeSale(testPosition);

    expectedPositions = []
    expect(testPortfolio.positions).toStrictEqual(expectedPositions);
});

//2.8
test('Testing StockPortfolio.makeSale() -- remove too many from existing position', () => {
    testPortfolio = new StockPortfolio();
    testPosition = new Position('GOOG', 1);
    testSalePosition = new Position('GOOG', 2);

    testPortfolio.positions = [testPosition]
    expect(() => testPortfolio.makeSale(testSalePosition)).toThrow(new ShareSaleException("Cannot sell more shares than owned"));
});

