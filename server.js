require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes — each POST /api/:fn loads ./api/:fn.js
app.post('/api/:fn', async (req, res) => {
    try {
        const handlerPath = path.join(__dirname, 'api', req.params.fn + '.js');
        // Clear require cache in dev so edits hot-reload
        delete require.cache[require.resolve(handlerPath)];
        const handler = require(handlerPath);
        await handler(req, res);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return res.status(404).json({ error: `API function not found: ${req.params.fn}` });
        }
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static site files
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`\nDev server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop.\n');
});
