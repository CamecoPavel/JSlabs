/**
 * @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор транзакции
 * @property {Date} date - Дата и время добавления транзакции
 * @property {number} amount - Сумма транзакции
 * @property {string} category - Категория транзакции
 * @property {string} description - Описание транзакции
 */

/** @type {Transaction[]} */
let transactions = [];

let currentId = 0;

/**
 * Генерирует уникальный идентификатор.
 * @returns {string} Уникальный идентификатор
 */
function generateId() {
    currentId += 1;
    return currentId.toString();
}

/**
 * Добавляет новую транзакцию.
 * @param {Event} event - Событие формы
 */
function addTransaction(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(transaction);
    appendTransactionToTable(transaction);
    calculateTotal();
    document.getElementById('transaction-form').reset();
}

/**
 * Добавляет строку транзакции в таблицу.
 * @param {Transaction} transaction - Объект транзакции
 */
function appendTransactionToTable(transaction) {
    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.classList.add(transaction.amount >= 0 ? 'green' : 'red');
    row.dataset.id = transaction.id;

    row.insertCell(0).textContent = transaction.id;
    row.insertCell(1).textContent = transaction.date.toLocaleString();
    row.insertCell(2).textContent = transaction.category;
    row.insertCell(3).textContent = transaction.description.split(' ').slice(0, 4).join(' ');
    
    const actionCell = row.insertCell(4);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => {
        deleteTransaction(transaction.id);
    };
    actionCell.appendChild(deleteButton);

    row.onclick = () => {
        displayFullDescription(transaction);
    };
}

/**
 * Удаляет транзакцию.
 * @param {string} id - Уникальный идентификатор транзакции
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const row = document.querySelector(`tr[data-id='${id}']`);
    row.parentNode.removeChild(row);
    calculateTotal();
}

/**
 * Подсчитывает общую сумму транзакций.
 */
function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total').textContent = `Общая сумма: ${total}`;
}

/**
 * Отображает полное описание транзакции.
 * @param {Transaction} transaction - Объект транзакции
 */
function displayFullDescription(transaction) {
    const fullDescriptionDiv = document.getElementById('full-description');
    fullDescriptionDiv.textContent = `Полное описание: ${transaction.description}`;
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);
