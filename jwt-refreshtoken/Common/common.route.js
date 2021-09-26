const express = require('express');
const router = express.Router();

// routes
router.get('/', (req, res) => {
    res.send('<h1>Server Test</h1>')
});

module.exports = router;