import express from 'express';
import { nanoid } from 'nanoid';
import URL from '../models/url.js';
import validator from 'validator';

const router = express.Router();

// POST /shorten - Create a short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl || !validator.isURL(longUrl)) return res.status(400).json({ error: 'Invalid URL format' });

    const id = nanoid(6); // Generate a short code (6 characters)
    try {
        const newUrl = await URL.create({ id, longUrl });
        res.json({ shortUrl: `http://localhost:3000/${id}` });
    } catch (error) {
        res.status(500).json({ error: 'Error saving URL' });
    }
});

// GET /:id - Redirect to the original URL
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const url = await URL.findByPk(id);
        if (!url) return res.status(404).json({ error: 'URL not found' });
        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving URL' });
    }
});

export default router;
