const ShareSaleException = require("./ShareSaleException");

//2.8
test('Testing ShareSaleException() -- success', () => {
    expect(() => new ShareSaleException("error!")).not.toThrow();
});