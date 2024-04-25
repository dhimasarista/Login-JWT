const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing body dari permintaan HTTP
app.use(bodyParser.json());
app.use(cors());

// Contoh database pengguna (bisa diganti dengan database sesungguhnya)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Endpoint untuk login
app.post('/login', (req, res) => {
  // Ambil kredensial dari body permintaan
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username dan password
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Jika pengguna ditemukan, buat token JWT
    jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '10m' }, (err, token) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Kirim token JWT sebagai respons
        res.json({ token });
      }
    });
  } else {
    // Jika pengguna tidak ditemukan, kirim respons error
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Middleware untuk verifikasi token JWT
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

app.get("/", (req,res) => {
    res.json({
        message: "Hello, NodeJS!"
    })
});

const employeesData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' }
];

// Endpoint yang memerlukan otentikasi untuk diakses
app.get('/employees', verifyToken, (req, res) => {
  res.json({ message: 'List of employees', user: req.authData, data: employeesData });
});

app.get('/employee/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const employee = employeesData.find(emp => emp.id === parseInt(id));
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.json({ message: `Details of employee ${id}`, user: req.authData, data: employee });
});

console.clear();
// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
