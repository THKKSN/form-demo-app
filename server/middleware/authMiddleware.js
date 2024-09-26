const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    // ตรวจสอบ token จาก body, query หรือ Authorization header
    const token = req.body.token || req.query.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }

    // ตรวจสอบว่ามี TOKEN_KEY ใน environment variable
    const tokenKey = process.env.TOKEN_KEY;
    if (!tokenKey) {
        return res.status(500).json({ message: "Internal Server Error: Missing token key" });
    }

    try {
        // ตรวจสอบ token ด้วย secret key
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded; // เก็บข้อมูลจาก token ใน req.user
        next();
    } catch (err) {
        console.error('Token verification failed:', err);

        // ตรวจสอบว่าข้อผิดพลาดเกิดจาก Token หมดอายุหรือไม่
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired, please log in again" });
        }

        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;
