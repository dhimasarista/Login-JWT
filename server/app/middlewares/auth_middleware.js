const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    // Ambil token dari header Authorization
    const token = req.headers['authorization'];

    if (typeof token !== 'undefined') {
    // Split token dari format 'Bearer <token>'
    const tokenParts = token.split(' ');
    const tokenValue = tokenParts[1];
    jwt.verify(tokenValue, 'secretkey', (err, authData) => {
        if (err) {
        // Jika token tidak valid, kirim respons error
        res.status(403).json({ error: 'Forbidden' });
        } else {
        // Jika token valid, simpan data otentikasi di objek request dan lanjutkan ke middleware berikutnya
        req.authData = authData;
        next();
        }
    });
    } else {
    // Jika tidak ada token, kirim respons error
    res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = verifyToken;