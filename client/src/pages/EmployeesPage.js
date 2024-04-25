import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material/';
import '../App.css';

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data pegawai dari server dengan menyertakan token JWT
  const fetchEmployees = async () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('JWT token not found.');
      }

      const response = await fetch('http://localhost:5000/employees', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees.');
      }

      const data = await response.json();
      console.log(data)
      setEmployees(data);
      setLoading(false); // Set loading menjadi false setelah data diterima
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      setLoading(false); // Set loading menjadi false jika terjadi error
    }
  };

  const logout = () => {
    // Simpan token ke sessionStorage
    sessionStorage.clear('jwtToken');

    // Alihkan ke halaman /employees setelah berhasil login
    // history('/employees');
    window.location.href = '/login';
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan indikator loading saat data sedang dimuat
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employees</h1>
        <h3>{employees && employees.user.username}</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {/* Tambahkan kolom lain jika diperlukan */}
              </tr>
            </thead>
            <tbody>
              {employees && employees.data.map(employee => (
              <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              {/* Tambahkan sel lain jika diperlukan */}
              </tr>
              ))}
            </tbody>
          </table>
        <Button variant="contained" onClick={logout}>Logout</Button>
      </header>
    </div>
  );
}

export default EmployeesPage;
