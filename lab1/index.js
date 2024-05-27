const fs = require('fs');

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions;
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getAllTransactions() {
        return this.transactions;
    }

    getUniqueTransactionTypes() {
        const types = new Set();
        this.transactions.forEach(transaction => {
            types.add(transaction.transaction_type);
        });
        return Array.from(types);
    }

    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => {
            return total + parseFloat(transaction.transaction_amount);
        }, 0);
    }

    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            if ((!year || transactionDate.getFullYear() === year) &&
                (!month || transactionDate.getMonth() === month - 1) &&
                (!day || transactionDate.getDate() === day)) {
                return total + parseFloat(transaction.transaction_amount);
            } else {
                return total;
            }
        }, 0);
    }

    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionsByType('debit');
        return debitTransactions.reduce((total, transaction) => {
            return total + parseFloat(transaction.transaction_amount);
        }, 0);
    }

    findMostTransactionsMonth() {
        const transactionsByMonth = {};
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            transactionsByMonth[month] = (transactionsByMonth[month] || 0) + 1;
        });
        const maxMonth = Object.keys(transactionsByMonth).reduce((a, b) => transactionsByMonth[a] > transactionsByMonth[b] ? a : b);
        return parseInt(maxMonth) + 1; // Adding 1 to convert month index (0-based) to month number (1-based)
    }

    findMostDebitTransactionMonth() {
        const debitTransactions = this.getTransactionsByType('debit');
        const transactionsByMonth = {};
        debitTransactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            transactionsByMonth[month] = (transactionsByMonth[month] || 0) + 1;
        });
        const maxMonth = Object.keys(transactionsByMonth).reduce((a, b) => transactionsByMonth[a] > transactionsByMonth[b] ? a : b);
        return parseInt(maxMonth) + 1; // Adding 1 to convert month index (0-based) to month number (1-based)
    }

    mostTransactionTypes() {
        const debitCount = this.getTransactionsByType('debit').length;
        const creditCount = this.getTransactionsByType('credit').length;
        if (debitCount > creditCount) {
            return 'debit';
        } else if (creditCount > debitCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    getTransactionsBeforeDate(date) {
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < date);
    }

    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

// Example transaction
const transaction = {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: "100.00",
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
};

// Load transactions from JSON file
const transactionsData = fs.readFileSync('./transaction.json', 'utf8');
const transactions = JSON.parse(transactionsData);

// Create TransactionAnalyzer instance
const analyzer = new TransactionAnalyzer(transactions);

// Test methods
console.log("Unique Transaction Types:", analyzer.getUniqueTransactionTypes());
/*console.log("Total Amount:", analyzer.calculateTotalAmount());
console.log("Total Amount in 2019:", analyzer.calculateTotalAmountByDate(2019));
console.log("Debit Transactions:", analyzer.getTransactionsByType('debit'));
console.log("Transactions in Date Range:", analyzer.getTransactionsInDateRange(new Date('2019-01-01'), new Date('2019-12-31')));
console.log("Transactions by Merchant:", analyzer.getTransactionsByMerchant('SuperMart'));
console.log("Average Transaction Amount:", analyzer.calculateAverageTransactionAmount());
console.log("Transactions in Amount Range:", analyzer.getTransactionsByAmountRange(50, 200));
console.log("Total Debit Amount:", analyzer.calculateTotalDebitAmount());
console.log("Most Transactions Month:", analyzer.findMostTransactionsMonth());
console.log("Most Debit Transaction Month:", analyzer.findMostDebitTransactionMonth());
console.log("Most Transaction Types:", analyzer.mostTransactionTypes());
console.log("Transactions Before Date:", analyzer.getTransactionsBeforeDate(new Date('2019-06-01')));
console.log("Transaction by ID:", analyzer.findTransactionById('1'));
console.log("Transaction Descriptions:", analyzer.mapTransactionDescriptions());*/
