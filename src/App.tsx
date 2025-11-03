import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeesPage from './pages/Employees/EmployeesPage';
import EmployeeForm from './pages/Employees/EmployeeForm';
import HRPage from './pages/HR/HRPage';
import FinancialPage from './pages/Financial/FinancialPage';
import ReportsPage from './pages/Reports/ReportsPage';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="funcionarios" element={<EmployeesPage />} />
              <Route path="funcionarios/novo" element={<EmployeeForm />} />
              <Route path="funcionarios/editar/:id" element={<EmployeeForm />} />
              <Route path="rh" element={<HRPage />} />
              <Route path="financeiro" element={<FinancialPage />} />
              <Route path="relatorios" element={<ReportsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;