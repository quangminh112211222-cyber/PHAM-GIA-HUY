export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  topic: string;
  createdAt: number;
}

export interface StudentResult {
  id: string;
  studentName: string;
  topic: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
  timestamp: number;
}

export enum ViewState {
  LANDING = 'LANDING',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  STUDENT_LOGIN = 'STUDENT_LOGIN',
  STUDENT_QUIZ = 'STUDENT_QUIZ',
  STUDENT_RESULT = 'STUDENT_RESULT'
}

export const TOPICS = ['Toán học', 'Vật lý', 'Hóa học', 'Lịch sử', 'Địa lý', 'Tiếng Anh', 'Tin học', 'Kiến thức chung'];