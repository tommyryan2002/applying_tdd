const ShareSaleException = require("./ShareSaleException");

module.exports = class StockPortfolio {
    constructor() {
        this.positions = [];
    }

    isEmpty() {
        return (this.positions.length == 0);
    }
    
    uniqueTickers() {
        const names = this.positions.map(it => it.ticker);
        return new Set(names).size;
    }

    makePurchase(position) {
        const names = this.positions.map(it => it.ticker);
        const idx = names.indexOf(position.ticker);
        if (idx == -1) {
            this.positions.push(position);
        } else {
            this.positions[idx].amount += position.amount;
            console.log("DUDEE")
        }
    }
    
    makeSale(position) {
        const names = this.positions.map(it => it.ticker);
        const idx = names.indexOf(position.ticker);
        if (idx == -1) {
            throw new Error("Ticker not in portfolio!")
        } else {
            if (this.positions[idx].amount < position.amount) {
                throw new ShareSaleException("Cannot sell more shares than owned")
            } else {
                this.positions[idx].amount -= position.amount;
                if (this.positions[idx].amount == 0) {
                    //remove the stock if the updated amount is 0
                    this.positions.splice(idx, 1);
                }
            }
        }
    }

    numShares(ticker) {
        const names = this.positions.map(it => it.ticker);
        const idx = names.indexOf(ticker);
        if (idx == -1) {
            return 0;
        } else {
            return this.positions[idx].amount
        }
    }
}