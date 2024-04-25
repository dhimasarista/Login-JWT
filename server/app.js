const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const bodyParser = require('body-parser');
const verifyToken = require("./app/middlewares/auth_middleware");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing body dari permintaan HTTP
app.use(bodyParser.json());
app.use(cors());

// Contoh database pengguna (bisa diganti dengan database sesungguhnya)
const users = [
  { id: 1, username: 'admin', password: 'admin' },
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
