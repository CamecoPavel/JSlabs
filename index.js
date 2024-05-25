const fs = require("fs");

class TranzactionAnalyzer {
  constructor(transactions) {
    this.transactions = transactions;
  }

  calculateTotalAmount() {
    let total = this.transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0)
    console.log(total);
  }

  getTransactionsByMerchant(merchantName) {
    return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
  }
  getTransactionsByAmountRange(minAmount, maxAmount) {
    return this.transactions.filter(transaction =>
      transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
  }
  getTransactionByType(type) {
    return this.transactions.filter(transaction => transaction.transaction_type === type);
  }


}

const data = fs.readFileSync("./transaction.json", "utf8");
let jsonData = JSON.parse(data);

const analyzer = new TranzactionAnalyzer(jsonData);
// console.log(analyzer.getTransactionsByMerchant("SuperMart"));
//console.log(analyzer.getTransactionsByAmountRange(1, 35));
console.log(analyzer.getTransactionByType('credit'));