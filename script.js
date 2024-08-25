// Simulación de datos de operaciones
let trades = [
    { id: 1, date: '2023-05-01', pair: 'EUR/USD', type: 'Compra', entry: 1.10000, exit: 1.10500, profitLoss: 500 },
    { id: 2, date: '2023-05-02', pair: 'GBP/USD', type: 'Venta', entry: 1.25000, exit: 1.24800, profitLoss: 200 },
    { id: 3, date: '2023-05-03', pair: 'USD/JPY', type: 'Compra', entry: 110.000, exit: 110.300, profitLoss: 300 },
    { id: 4, date: '2023-05-04', pair: 'USD/CHF', type: 'Venta', entry: 0.92000, exit: 0.91850, profitLoss: 150 },
];

function populateTable() {
    const tableBody = document.querySelector('#tradeTable tbody');
    tableBody.innerHTML = '';
    trades.forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.date}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td>${trade.entry.toFixed(5)}</td>
            <td>${trade.exit.toFixed(5)}</td>
            <td>${trade.profitLoss.toFixed(2)}</td>
            <td>
                <button class="btn btn-primary" onclick="editTrade(${trade.id})" aria-label="Editar operación ${trade.id}">Editar</button>
                <button class="btn btn-danger" onclick="deleteTrade(${trade.id})" aria-label="Eliminar operación ${trade.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editTrade(id) {
    const trade = trades.find(t => t.id === id);
    if (trade) {
        document.getElementById('editId').value = trade.id;
        document.getElementById('editDate').value = trade.date;
        document.getElementById('editPair').value = trade.pair;
        document.getElementById('editType').value = trade.type;
        document.getElementById('editEntry').value = trade.entry;
        document.getElementById('editExit').value = trade.exit;
        document.getElementById('editProfitLoss').value = trade.profitLoss;
        document.getElementById('editModal').style.display = 'block';
    }
}

function deleteTrade(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta operación?')) {
        trades = trades.filter(t => t.id !== id);
        populateTable();
    }
}

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const updatedTrade = {
        id: id,
        date: document.getElementById('editDate').value,
        pair: document.getElementById('editPair').value,
        type: document.getElementById('editType').value,
        entry: parseFloat(document.getElementById('editEntry').value),
        exit: parseFloat(document.getElementById('editExit').value),
        profitLoss: parseFloat(document.getElementById('editProfitLoss').value)
    };
    const index = trades.findIndex(t => t.id === id);
    if (index !== -1) {
        trades[index] = updatedTrade;
        populateTable();
        document.getElementById('editModal').style.display = 'none';
    }
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('editModal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = 'none';
    }
};

// Inicializar la tabla
populateTable();
