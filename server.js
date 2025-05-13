const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Missing message input.' });
    }

    try {
        const response = await axios.get(
            `https://betadash-api-swordslush-production.up.railway.app/assistant?chat=${encodeURIComponent(message)}`
        );

        res.json({ reply: response.data.reply || 'No response from bot.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to connect to chatbot API.' });
    }
});

app.listen(PORT, () => {
    console.log(`🤖 Server running at http://localhost:${PORT}`);
});
          
