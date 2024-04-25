import React, { useEffect, useState } from 'react';

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

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
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <h3>{employees.message}</h3>
      <ul>
        {/* {employees["data"].map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default EmployeesPage;
