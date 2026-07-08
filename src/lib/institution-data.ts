export interface Branch {
  id: string;
  name: string;
  location: string;
  head: string;
  contactEmail: string;
  contactPhone: string;
  status: 'Active' | 'Inactive';
  totalStudents: number;
  totalFaculty: number;
}

export interface Department {
  id: string;
  name: string;
  branchId: string;
  headOfDepartment: string;
  budget: number;
  coursesCount: number;
}

export interface Program {
  id: string;
  name: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate';
  durationYears: number;
  departmentId: string;
  totalCredits: number;
  status: 'Active' | 'Archived';
}

export interface InstitutionCourse {
  id: string;
  code: string;
  title: string;
  programId: string;
  credits: number;
  instructorId: string;
  maxCapacity: number;
  currentEnrollment: number;
  status: 'Active' | 'Draft' | 'Archived';
}

export interface Student {
  id: string;
  enrollmentNo: string;
  name: string;
  email: string;
  programId: string;
  branchId: string;
  admissionDate: string;
  status: 'Active' | 'Graduated' | 'Suspended' | 'Dropped';
  cgpa: number;
  attendancePercentage: number;
}

export interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  departmentId: string;
  branchId: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer';
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

// MOCK DATA

export const mockBranches: Branch[] = [
  { id: 'br_01', name: 'Main Campus', location: 'New York, NY', head: 'Dr. Sarah Connor', contactEmail: 'main@eduai.com', contactPhone: '+1-555-0101', status: 'Active', totalStudents: 4500, totalFaculty: 320 },
  { id: 'br_02', name: 'Westside Campus', location: 'Los Angeles, CA', head: 'Prof. John Smith', contactEmail: 'west@eduai.com', contactPhone: '+1-555-0102', status: 'Active', totalStudents: 2100, totalFaculty: 150 },
  { id: 'br_03', name: 'Online Global', location: 'Virtual', head: 'Alice Wonderland', contactEmail: 'online@eduai.com', contactPhone: '+1-555-0103', status: 'Active', totalStudents: 8500, totalFaculty: 400 },
];

export const mockDepartments: Department[] = [
  { id: 'dept_01', name: 'Computer Science', branchId: 'br_01', headOfDepartment: 'Dr. Alan Turing', budget: 1500000, coursesCount: 45 },
  { id: 'dept_02', name: 'Business Administration', branchId: 'br_01', headOfDepartment: 'Dr. Mary Johnson', budget: 1200000, coursesCount: 38 },
  { id: 'dept_03', name: 'Design', branchId: 'br_02', headOfDepartment: 'Prof. Jony Ive', budget: 800000, coursesCount: 22 },
];

export const mockPrograms: Program[] = [
  { id: 'prog_01', name: 'B.Sc. Computer Science', level: 'Undergraduate', durationYears: 4, departmentId: 'dept_01', totalCredits: 120, status: 'Active' },
  { id: 'prog_02', name: 'MBA Finance', level: 'Postgraduate', durationYears: 2, departmentId: 'dept_02', totalCredits: 60, status: 'Active' },
  { id: 'prog_03', name: 'B.Des. UX Design', level: 'Undergraduate', durationYears: 4, departmentId: 'dept_03', totalCredits: 120, status: 'Active' },
];

export const mockCourses: InstitutionCourse[] = [
  { id: 'crs_01', code: 'CS101', title: 'Introduction to Programming', programId: 'prog_01', credits: 4, instructorId: 'fac_01', maxCapacity: 120, currentEnrollment: 115, status: 'Active' },
  { id: 'crs_02', code: 'BUS201', title: 'Corporate Finance', programId: 'prog_02', credits: 3, instructorId: 'fac_02', maxCapacity: 60, currentEnrollment: 58, status: 'Active' },
  { id: 'crs_03', code: 'DES105', title: 'Fundamentals of UI', programId: 'prog_03', credits: 3, instructorId: 'fac_03', maxCapacity: 40, currentEnrollment: 40, status: 'Active' },
];

export const mockStudents: Student[] = [
  { id: 'stu_01', enrollmentNo: 'ENR2023001', name: 'Emily Davis', email: 'emily.d@student.eduai.com', programId: 'prog_01', branchId: 'br_01', admissionDate: '2023-08-15', status: 'Active', cgpa: 3.8, attendancePercentage: 92 },
  { id: 'stu_02', enrollmentNo: 'ENR2023002', name: 'Michael Chang', email: 'michael.c@student.eduai.com', programId: 'prog_02', branchId: 'br_01', admissionDate: '2023-08-15', status: 'Active', cgpa: 3.5, attendancePercentage: 88 },
  { id: 'stu_03', enrollmentNo: 'ENR2023003', name: 'Sophia Martinez', email: 'sophia.m@student.eduai.com', programId: 'prog_03', branchId: 'br_02', admissionDate: '2023-08-15', status: 'Active', cgpa: 3.9, attendancePercentage: 95 },
];

export const mockFaculty: Faculty[] = [
  { id: 'fac_01', employeeId: 'EMP001', name: 'Dr. Alan Turing', email: 'alan.turing@eduai.com', departmentId: 'dept_01', branchId: 'br_01', designation: 'Professor', joinDate: '2015-06-01', status: 'Active' },
  { id: 'fac_02', employeeId: 'EMP002', name: 'Dr. Mary Johnson', email: 'mary.j@eduai.com', departmentId: 'dept_02', branchId: 'br_01', designation: 'Associate Professor', joinDate: '2018-01-15', status: 'Active' },
  { id: 'fac_03', employeeId: 'EMP003', name: 'Prof. Jony Ive', email: 'jony.i@eduai.com', departmentId: 'dept_03', branchId: 'br_02', designation: 'Professor', joinDate: '2020-09-01', status: 'Active' },
];

export const metrics = {
  totalRevenue: 2450000,
  revenueGrowth: 12.5,
  activeStudents: 15100,
  studentGrowth: 5.2,
  averageAttendance: 89.4,
  coursesActive: 342,
};
