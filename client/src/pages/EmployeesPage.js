import React, { useEffect, useState } from 'react';

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  // Fungsi untuk mengambil data pegawai dari server
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      const data = await response.json();
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
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesPage;
