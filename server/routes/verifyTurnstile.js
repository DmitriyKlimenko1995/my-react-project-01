import express from 'express';
const router = express.Router();
import rateLimit from 'express-rate-limit';
import fetch from'node-fetch';

// const app = express();
// app.set('trust proxy', true);
// app.use(express.json());

const softLimiter = rateLimit({ windowMs: 60_000, max: 60 });

async function verifyTurnstile(req, res, next) {
    try {
        const token = req.body?.token;
        if (!token) return res.status(400).json({ error: 'captcha_required' });

        const secret = process.env.TURNSTILE_SECRET_KEY;
        const body = new URLSearchParams({
            secret,
            response: token,
            remoteip: req.ip || ''
        });

        const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body
        });

        const data = await resp.json();
        if (!data.success) {
            return res.status(403).json({ error: 'captcha_failed', details: data['error-codes'] || [] });
        }

        next();
    } catch (err) {
        res.status(502).json({ error: 'captcha_verification_unavailable' });
    }
}

router.post('/', softLimiter, verifyTurnstile, (req, res) => {
    // Твоя логика регистрации
    res.json({ ok: true, user: req.body.username });
});

export default router;