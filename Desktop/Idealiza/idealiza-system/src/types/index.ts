// Tipos globais para o sistema Idealiza

export interface Employee {
  id: string;
  name: string;
  email: string;
  cpf: string;
  rg?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  position: string;
  department: string;
  admissionDate: string;
  contractType: 'CLT' | 'PJ' | 'Temporário' | 'Estágio';
  salary: number;
  client: string;
  status: 'active' | 'inactive' | 'vacation';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'financial' | 'supervisor' | 'view';
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  employee: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  type: 'ferias' | 'licenca';
  observations?: string;
}

export interface TrainingRecord {
  id: string;
  title: string;
  description?: string;
  employees: number;
  completed: number;
  dueDate: string;
  status: 'active' | 'completed' | 'cancelled';
  category?: string;
}

export interface PayrollData {
  month: string;
  year: number;
  employees: number;
  grossSalary: number;
  benefits: number;
  taxes: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

export interface ClientCost {
  clientId: string;
  client: string;
  employees: number;
  totalCost: number;
  avgCost: number;
  contractValue: number;
  margin: number;
  status: 'active' | 'inactive';
}

export interface Benefit {
  id: string;
  name: string;
  type: 'transport' | 'meal' | 'health' | 'life' | 'other';
  value: number;
  mandatory: boolean;
  description?: string;
}

export interface Document {
  id: string;
  employeeId: string;
  type: 'rg' | 'cpf' | 'ctps' | 'titulo' | 'aso' | 'comprovante' | 'other';
  name: string;
  status: 'pending' | 'received' | 'expired';
  dueDate?: string;
  uploadDate?: string;
  filePath?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  hoursWorked: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'partial';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  userId?: string;
}