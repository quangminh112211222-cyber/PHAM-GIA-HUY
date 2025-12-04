import { Question, StudentResult } from '../types';

const KEYS = {
  QUESTIONS: 'SQ_QUESTIONS',
  RESULTS: 'SQ_RESULTS',
};

// Seed data if empty
const seedData = () => {
  if (!localStorage.getItem(KEYS.QUESTIONS)) {
    const initialQuestions: Question[] = [
      // --- TOÁN HỌC 9 (10 câu) ---
      {
        id: 't9_1',
        text: 'Điều kiện xác định của biểu thức √(x - 2024) là:',
        options: ['x ≠ 2024', 'x ≤ 2024', 'x < 2024', 'x ≥ 2024'],
        correctIndex: 3,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_2',
        text: 'Hàm số nào sau đây là hàm số bậc nhất?',
        options: ['y = x²', 'y = √x', 'y = 2x - 1', 'y = 1/x'],
        correctIndex: 2,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_3',
        text: 'Cặp số nào là nghiệm của hệ phương trình: x + y = 5 và x - y = 1?',
        options: ['(2; 3)', '(3; 2)', '(4; 1)', '(1; 4)'],
        correctIndex: 1,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_4',
        text: 'Phương trình bậc hai x² - 5x + 6 = 0 có biệt thức Delta (Δ) bằng:',
        options: ['1', '25', '49', '-1'],
        correctIndex: 0,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_5',
        text: 'Trong tam giác vuông, sin α bằng:',
        options: ['Cạnh đối / Cạnh huyền', 'Cạnh kề / Cạnh huyền', 'Cạnh đối / Cạnh kề', 'Cạnh kề / Cạnh đối'],
        correctIndex: 0,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_6',
        text: 'Góc nội tiếp chắn nửa đường tròn có số đo bằng:',
        options: ['60°', '90°', '120°', '180°'],
        correctIndex: 1,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_7',
        text: 'Công thức tính diện tích hình tròn bán kính R là:',
        options: ['C = 2πR', 'S = πR²', 'S = 4πR²', 'V = (4/3)πR³'],
        correctIndex: 1,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_8',
        text: 'Đồ thị hàm số y = 2x² đi qua điểm nào sau đây?',
        options: ['(1; 1)', '(1; 2)', '(-1; -2)', '(2; 4)'],
        correctIndex: 1,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_9',
        text: 'Hình nón có bán kính đáy r, chiều cao h. Thể tích V được tính bằng công thức:',
        options: ['V = πr²h', 'V = 2πrh', 'V = (1/3)πr²h', 'V = (4/3)πr³'],
        correctIndex: 2,
        topic: 'Toán học',
        createdAt: Date.now(),
      },
      {
        id: 't9_10',
        text: 'Phương trình x² = -1 có bao nhiêu nghiệm thực?',
        options: ['1 nghiệm', '2 nghiệm', 'Vô nghiệm', 'Vô số nghiệm'],
        correctIndex: 2,
        topic: 'Toán học',
        createdAt: Date.now(),
      },

      // --- VẬT LÝ 9 (10 câu) ---
      {
        id: 'l9_1',
        text: 'Hệ thức của định luật Ohm là:',
        options: ['I = U.R', 'R = U.I', 'I = U/R', 'U = I/R'],
        correctIndex: 2,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_2',
        text: 'Điện trở của dây dẫn KHÔNG phụ thuộc vào yếu tố nào?',
        options: ['Chiều dài dây', 'Tiết diện dây', 'Vật liệu làm dây', 'Khối lượng dây'],
        correctIndex: 3,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_3',
        text: 'Đơn vị đo công suất điện là:',
        options: ['Jun (J)', 'Oát (W)', 'Vôn (V)', 'Ampe (A)'],
        correctIndex: 1,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_4',
        text: 'Định luật Jun - Len-xơ cho biết điện năng được biến đổi thành:',
        options: ['Cơ năng', 'Quang năng', 'Nhiệt năng', 'Hóa năng'],
        correctIndex: 2,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_5',
        text: 'Để nhận biết từ trường, người ta dùng:',
        options: ['Kim nam châm', 'Ampe kế', 'Vôn kế', 'Điện trở'],
        correctIndex: 0,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_6',
        text: 'Quy tắc bàn tay trái dùng để xác định chiều của:',
        options: ['Dòng điện', 'Đường sức từ', 'Lực điện từ', 'Cực nam châm'],
        correctIndex: 2,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_7',
        text: 'Máy biến thế là thiết bị dùng để:',
        options: ['Giữ nguyên hiệu điện thế', 'Thay đổi hiệu điện thế xoay chiều', 'Biến đổi dòng một chiều', 'Tạo ra điện năng'],
        correctIndex: 1,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_8',
        text: 'Hiện tượng khúc xạ ánh sáng là hiện tượng tia sáng:',
        options: ['Bị hắt lại môi trường cũ', 'Truyền thẳng', 'Bị gãy khúc tại mặt phân cách', 'Đổi màu'],
        correctIndex: 2,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_9',
        text: 'Thấu kính hội tụ có đặc điểm hình dạng là:',
        options: ['Phần rìa dày hơn phần giữa', 'Phần rìa mỏng hơn phần giữa', 'Dày đều', 'Mỏng đều'],
        correctIndex: 1,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },
      {
        id: 'l9_10',
        text: 'Ảnh ảo tạo bởi thấu kính phân kì luôn:',
        options: ['Lớn hơn vật', 'Bằng vật', 'Nhỏ hơn vật', 'Ngược chiều vật'],
        correctIndex: 2,
        topic: 'Vật lý',
        createdAt: Date.now(),
      },

      // --- HÓA HỌC 9 (10 câu) ---
      {
        id: 'h9_1',
        text: 'Dãy chất nào sau đây chỉ gồm các oxit bazơ?',
        options: ['CaO, Na₂O, CuO', 'SO₂, CO₂, P₂O₅', 'CaO, SO₂, CuO', 'HCl, NaOH, NaCl'],
        correctIndex: 0,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_2',
        text: 'Dung dịch nào sau đây làm quỳ tím hóa đỏ?',
        options: ['NaOH', 'HCl', 'NaCl', 'H₂O'],
        correctIndex: 1,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_3',
        text: 'Phản ứng giữa Axit và Bazơ được gọi là phản ứng:',
        options: ['Phân hủy', 'Thế', 'Trung hòa', 'Oxi hóa - khử'],
        correctIndex: 2,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_4',
        text: 'Kim loại nào sau đây KHÔNG tác dụng với dung dịch H₂SO₄ loãng?',
        options: ['Fe', 'Al', 'Mg', 'Cu'],
        correctIndex: 3,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_5',
        text: 'Nhôm (Al) bền trong không khí là do:',
        options: ['Al là kim loại yếu', 'Có lớp oxit Al₂O₃ mỏng bền bảo vệ', 'Al không tác dụng với oxi', 'Al có tính dẻo'],
        correctIndex: 1,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_6',
        text: 'Dãy kim loại được sắp xếp theo chiều hoạt động hóa học giảm dần là:',
        options: ['K, Mg, Al, Fe', 'Fe, Al, Mg, K', 'Cu, Fe, Zn, Al', 'Ag, Cu, H, Pb'],
        correctIndex: 0,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_7',
        text: 'Hợp chất hữu cơ nào sau đây là Hidrocacbon?',
        options: ['C₂H₅OH', 'CH₃COOH', 'CH₄', 'C₆H₁₂O₆'],
        correctIndex: 2,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_8',
        text: 'Khí Metan (CH₄) có nhiều trong:',
        options: ['Khí quyển', 'Khí thiên nhiên, khí bùn ao', 'Nước biển', 'Núi lửa'],
        correctIndex: 1,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_9',
        text: 'Etilen (C₂H₄) có khả năng làm mất màu dung dịch nào?',
        options: ['Quỳ tím', 'Phenolphtalein', 'Brom (Br₂)', 'Muối ăn (NaCl)'],
        correctIndex: 2,
        topic: 'Hóa học',
        createdAt: Date.now(),
      },
      {
        id: 'h9_10',
        text: 'Bảng tuần hoàn các nguyên tố hóa học được sắp xếp theo chiều tăng dần của:',
        options: ['Khối lượng nguyên tử', 'Điện tích hạt nhân', 'Số notron', 'Số oxi hóa'],
        correctIndex: 1,
        topic: 'Hóa học',
        createdAt: Date.now(),
      }
    ];
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(initialQuestions));
  }
};

seedData();

export const StorageService = {
  getQuestions: (): Question[] => {
    const data = localStorage.getItem(KEYS.QUESTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveQuestion: (question: Question) => {
    const questions = StorageService.getQuestions();
    const existingIndex = questions.findIndex((q) => q.id === question.id);
    if (existingIndex >= 0) {
      questions[existingIndex] = question;
    } else {
      questions.push(question);
    }
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
  },

  deleteQuestion: (id: string) => {
    const questions = StorageService.getQuestions().filter((q) => q.id !== id);
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
  },

  getResults: (): StudentResult[] => {
    const data = localStorage.getItem(KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
  },

  saveResult: (result: StudentResult) => {
    const results = StorageService.getResults();
    results.push(result);
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
  },
  
  clearAllData: () => {
      localStorage.removeItem(KEYS.QUESTIONS);
      localStorage.removeItem(KEYS.RESULTS);
      seedData();
  }
};