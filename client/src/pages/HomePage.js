import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material/';
import '../App.css';

function HomePage() {
  const [message, setMessage] = useState('');

  // Fungsi untuk mengambil pesan dari server
  const fetchMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Failed to fetch message:', error);
    }
  };

  useEffect(() => {
    // Panggil fetchApi saat komponen di-mount
    fetchMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Express + React Example</h1>
        <p>{message}</p>
        {/* Jalankan fetchApi saat tombol ditekan */}
        <Button variant="contained" href='/login'>Login</Button>
      </header>
    </div>
  );
}

export default HomePage;
