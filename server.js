
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, 'orders.json');

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API to receive orders
app.post('/api/order', (req, res) => {
    const orders = JSON.parse(fs.readFileSync(DATA_FILE));
    const newOrder = {
        id: Date.now(),
        ...req.body
    };
    orders.push(newOrder);
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
    res.json({ success: true, message: "Commande enregistrée !" });
});

app.get('/', (req, res) => {
    res.send("Backend running...");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
