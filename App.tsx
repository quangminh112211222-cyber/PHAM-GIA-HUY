import React, { useState, useEffect } from 'react';
import { ViewState, Question, StudentResult, TOPICS } from './types';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { StorageService } from './services/storageService';
import { GeminiService } from './services/geminiService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Trash2, Edit2, Plus, BrainCircuit, CheckCircle, XCircle, Save, LogOut, Lock, KeyRound } from 'lucide-react';

// --- SUB-COMPONENTS (Defined here for file constraint, ideally separate) ---

// 1. Landing View
const LandingView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
    <div className="text-center max-w-2xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Hệ thống thi trắc nghiệm <span className="text-blue-600">thông minh</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Nền tảng kiểm tra kiến thức tự động, hỗ trợ quản lý ngân hàng câu hỏi và tạo đề thi nhanh chóng với AI.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
      <div 
        onClick={() => onNavigate(ViewState.STUDENT_LOGIN)}
        className="flex-1 bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all hover:shadow-xl group"
      >
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Học Sinh</h3>
        <p className="text-gray-500">Tham gia bài kiểm tra, xem kết quả và đánh giá năng lực.</p>
      </div>

      <div 
        onClick={() => onNavigate(ViewState.ADMIN_LOGIN)}
        className="flex-1 bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all hover:shadow-xl group"
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Giáo Viên</h3>
        <p className="text-gray-500">Quản lý câu hỏi, tạo đề thi AI và xem thống kê kết quả.</p>
      </div>
    </div>
  </div>
);

// 2. Admin Login View
const AdminLogin: React.FC<{ onLoginSuccess: () => void, onCancel: () => void }> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      onLoginSuccess();
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Đăng nhập Giáo viên</h2>
          <p className="text-gray-500 text-sm mt-1">Vui lòng nhập mật khẩu quản trị</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="Nhập mật khẩu..."
                autoFocus
              />
              <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><XCircle size={14}/> {error}</p>}
          </div>
          
          <Button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-lg">
            Đăng nhập
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} className="w-full">
            Quay lại
          </Button>
        </form>
      </div>
    </div>
  );
};

// 3. Admin Dashboard View
const AdminView: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [activeTab, setActiveTab] = useState<'questions' | 'results'>('questions');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formText, setFormText] = useState('');
  const [formOptions, setFormOptions] = useState(['', '', '', '']);
  const [formCorrect, setFormCorrect] = useState(0);
  const [formTopic, setFormTopic] = useState(TOPICS[0]);
  const [genTopic, setGenTopic] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setQuestions(StorageService.getQuestions());
    setResults(StorageService.getResults());
  };

  const handleSaveQuestion = () => {
    if (!formText.trim() || formOptions.some(o => !o.trim())) {
      alert("Vui lòng điền đầy đủ nội dung câu hỏi và các đáp án.");
      return;
    }

    const newQ: Question = {
      id: editingId || Date.now().toString(),
      text: formText,
      options: formOptions,
      correctIndex: formCorrect,
      topic: formTopic,
      createdAt: Date.now()
    };

    StorageService.saveQuestion(newQ);
    resetForm();
    refreshData();
  };

  const handleDelete = (id: string) => {
    if(confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      StorageService.deleteQuestion(id);
      refreshData();
    }
  };

  const handleEdit = (q: Question) => {
    setEditingId(q.id);
    setFormText(q.text);
    setFormOptions([...q.options]);
    setFormCorrect(q.correctIndex);
    setFormTopic(q.topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormText('');
    setFormOptions(['', '', '', '']);
    setFormCorrect(0);
  };

  const handleGenerateAI = async () => {
    if (!genTopic.trim()) return alert("Vui lòng nhập chủ đề muốn tạo.");
    setIsGenerating(true);
    try {
      const newQuestions = await GeminiService.generateQuestionsByTopic(genTopic, 3);
      newQuestions.forEach(q => {
        StorageService.saveQuestion({
            ...q,
            id: Date.now().toString() + Math.random().toString().slice(2,5),
            createdAt: Date.now()
        });
      });
      refreshData();
      alert(`Đã tạo thành công ${newQuestions.length} câu hỏi về ${genTopic}!`);
      setGenTopic('');
    } catch (e) {
      alert("Lỗi khi tạo câu hỏi với AI. Hãy kiểm tra API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('questions')}
          className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'questions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Ngân hàng câu hỏi
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'results' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Lịch sử thi
        </button>
      </div>

      {activeTab === 'questions' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={18}/> : <Plus size={18}/>}
                {editingId ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
                  <select 
                    value={formTopic} 
                    onChange={e => setFormTopic(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
                  >
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi</label>
                  <textarea 
                    value={formText}
                    onChange={e => setFormText(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
                    rows={3}
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                </div>

                <div className="space-y-2">
                   <label className="block text-sm font-medium text-gray-700">Các lựa chọn (Tích chọn đáp án đúng)</label>
                   {formOptions.map((opt, idx) => (
                     <div key={idx} className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="correctOpt" 
                          checked={formCorrect === idx} 
                          onChange={() => setFormCorrect(idx)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <input 
                          type="text"
                          value={opt}
                          onChange={e => {
                            const newOpts = [...formOptions];
                            newOpts[idx] = e.target.value;
                            setFormOptions(newOpts);
                          }}
                          className={`flex-1 border-gray-300 rounded-md shadow-sm border p-2 text-sm ${formCorrect === idx ? 'bg-blue-50 border-blue-200' : ''}`}
                          placeholder={`Lựa chọn ${idx + 1}`}
                        />
                     </div>
                   ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSaveQuestion} className="flex-1">
                    <Save size={16} /> Lưu câu hỏi
                  </Button>
                  {editingId && (
                    <Button variant="secondary" onClick={resetForm}>Hủy</Button>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BrainCircuit size={16} className="text-purple-600"/> 
                  Tạo nhanh bằng AI
                </h4>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Nhập chủ đề (VD: Lịch sử VN)" 
                    value={genTopic}
                    onChange={e => setGenTopic(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
                  />
                  <Button onClick={handleGenerateAI} isLoading={isGenerating} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
                    Tạo
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sử dụng Gemini AI để tự động sinh 3 câu hỏi cho chủ đề đã chọn.</p>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-4">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">Danh sách ({questions.length})</h3>
                <span className="text-sm text-gray-500">Sắp xếp: Mới nhất</span>
             </div>
             
             {questions.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                 <p className="text-gray-500">Chưa có câu hỏi nào. Hãy thêm thủ công hoặc dùng AI.</p>
               </div>
             ) : (
               questions.slice().reverse().map(q => (
                 <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                        {q.topic}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(q)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(q.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">{q.text}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => (
                        <li key={idx} className={`text-sm px-3 py-2 rounded border ${idx === q.correctIndex ? 'bg-green-50 border-green-200 text-green-800 font-medium' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                           {idx === q.correctIndex && <CheckCircle size={12} className="inline mr-1 -mt-0.5"/>}
                           {opt}
                        </li>
                      ))}
                    </ul>
                 </div>
               ))
             )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h4 className="font-bold text-gray-700 mb-4">Điểm trung bình theo chủ đề</h4>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TOPICS.map(t => {
                      const topicResults = results.filter(r => r.topic === t);
                      const avg = topicResults.length ? topicResults.reduce((a,b) => a + (b.score/b.totalQuestions)*10, 0) / topicResults.length : 0;
                      return { name: t, avg: Math.round(avg * 10) / 10 };
                    }).filter(d => d.avg > 0)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="avg" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Điểm TB (thang 10)" />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h4 className="font-bold text-gray-700 mb-4">Thống kê xếp loại</h4>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Giỏi (>80%)', value: results.filter(r => (r.score/r.totalQuestions) >= 0.8).length },
                          { name: 'Khá (>60%)', value: results.filter(r => (r.score/r.totalQuestions) >= 0.6 && (r.score/r.totalQuestions) < 0.8).length },
                          { name: 'Trung bình', value: results.filter(r => (r.score/r.totalQuestions) < 0.6).length },
                        ].filter(x => x.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {['#10B981', '#F59E0B', '#EF4444'].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3">Học sinh</th>
                    <th className="px-6 py-3">Chủ đề</th>
                    <th className="px-6 py-3">Điểm số</th>
                    <th className="px-6 py-3">Kết quả</th>
                    <th className="px-6 py-3">Ngày thi</th>
                  </tr>
                </thead>
                <tbody>
                  {results.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center">Chưa có dữ liệu thi</td></tr>
                  ) : (
                    results.slice().reverse().map(r => (
                      <tr key={r.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{r.studentName}</td>
                        <td className="px-6 py-4">{r.topic}</td>
                        <td className="px-6 py-4 font-bold text-blue-600">{r.score}/{r.totalQuestions}</td>
                        <td className="px-6 py-4">
                          {((r.score / r.totalQuestions) * 10).toFixed(1)} điểm
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(r.timestamp).toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Student View
const StudentView: React.FC<{ 
  onFinish: (result: StudentResult) => void,
  onCancel: () => void 
}> = ({ onFinish, onCancel }) => {
  const [step, setStep] = useState<'login' | 'topic' | 'quiz'>('login');
  const [name, setName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleStart = () => {
    if(!name.trim()) return alert("Vui lòng nhập tên của bạn.");
    setStep('topic');
  };

  const handleTopicSelect = (topic: string) => {
    // Get questions from storage and filter or generate random set
    const allQ = StorageService.getQuestions();
    const topicQ = allQ.filter(q => q.topic === topic);
    
    if (topicQ.length === 0) {
      alert("Hiện chưa có câu hỏi nào cho chủ đề này. Vui lòng chọn chủ đề khác hoặc báo giáo viên.");
      return;
    }

    // Shuffle and pick max 10
    const shuffled = topicQ.sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffled);
    setSelectedTopic(topic);
    setUserAnswers(new Array(shuffled.length).fill(-1));
    setStep('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.some(a => a === -1)) {
      if (!confirm("Bạn chưa trả lời hết các câu hỏi. Bạn có chắc muốn nộp bài?")) return;
    }

    // Calculate score
    let score = 0;
    const detailedAnswers = questions.map((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) score++;
      return {
        questionId: q.id,
        selectedIndex: userAnswers[idx],
        isCorrect
      };
    });

    const result: StudentResult = {
      id: Date.now().toString(),
      studentName: name,
      topic: selectedTopic,
      score,
      totalQuestions: questions.length,
      answers: detailedAnswers,
      timestamp: Date.now()
    };

    onFinish(result);
  };

  if (step === 'login') {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Thông tin học sinh</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <Button onClick={handleStart} className="w-full py-3 text-lg">Bắt đầu</Button>
          <Button variant="ghost" onClick={onCancel} className="w-full">Quay lại</Button>
        </div>
      </div>
    );
  }

  if (step === 'topic') {
    // Get unique topics that actually have questions
    const availableTopics = Array.from(new Set(StorageService.getQuestions().map(q => q.topic)));
    
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Chọn chủ đề bài thi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableTopics.length > 0 ? availableTopics.map(t => (
            <button 
              key={t}
              onClick={() => handleTopicSelect(t)}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
            >
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">{t}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {StorageService.getQuestions().filter(q => q.topic === t).length} câu hỏi
              </p>
            </button>
          )) : (
            <div className="col-span-2 text-center py-10 bg-white rounded-xl">
               <p className="text-gray-500">Hệ thống đang bảo trì hoặc chưa có câu hỏi.</p>
               <Button variant="ghost" onClick={onCancel} className="mt-4">Quay lại</Button>
            </div>
          )}
        </div>
         <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => setStep('login')}>Quay lại bước nhập tên</Button>
         </div>
      </div>
    );
  }

  // Quiz Interface
  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Info */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Thí sinh: <span className="font-bold text-gray-900">{name}</span></p>
          <p className="text-sm text-gray-500">Chủ đề: <span className="font-medium">{selectedTopic}</span></p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">{currentQIndex + 1}</span>
          <span className="text-gray-400">/{questions.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mb-8 min-h-[300px] flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
          {currentQ.text}
        </h3>
        
        <div className="space-y-3 flex-1">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group
                ${userAnswers[currentQIndex] === idx 
                  ? 'border-blue-500 bg-blue-50 text-blue-800' 
                  : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-700'}
              `}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold border transition-colors
                ${userAnswers[currentQIndex] === idx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-500 group-hover:border-gray-400'}
              `}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-medium text-lg">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="secondary" 
          onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQIndex === 0}
        >
          Câu trước
        </Button>
        
        {currentQIndex === questions.length - 1 ? (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Nộp bài
          </Button>
        ) : (
          <Button 
            onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
          >
            Câu tiếp theo
          </Button>
        )}
      </div>
    </div>
  );
};

// 5. Result View
const ResultView: React.FC<{ result: StudentResult, onHome: () => void }> = ({ result, onHome }) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  let message = '';
  let color = '';
  
  if (percentage >= 80) { message = 'Xuất sắc!'; color = 'text-green-600'; }
  else if (percentage >= 60) { message = 'Làm tốt lắm!'; color = 'text-blue-600'; }
  else { message = 'Cần cố gắng hơn!'; color = 'text-yellow-600'; }

  // Pie chart data
  const data = [
    { name: 'Đúng', value: result.score },
    { name: 'Sai', value: result.totalQuestions - result.score },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Kết quả bài thi</h2>
        <p className="text-gray-500 mb-8">Chủ đề: {result.topic} • Thí sinh: {result.studentName}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div className="flex flex-col items-center justify-center">
              <div className="text-6xl font-extrabold text-gray-900 mb-2">{result.score}<span className="text-3xl text-gray-400">/{result.totalQuestions}</span></div>
              <div className={`text-xl font-bold ${color} mb-6`}>{message}</div>
              <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                 Điểm số: {(result.score / result.totalQuestions * 10).toFixed(1)} / 10
              </div>
           </div>
           
           <div className="h-48 w-full flex justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#EF4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="w-full mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Chi tiết đáp án</h3>
        <div className="space-y-4">
           {result.answers.map((ans, idx) => {
             // We need to fetch the question text (it might have changed in DB, but usually ID persists)
             // In a real app, result should snapshot the question text. Here we look it up.
             const q = StorageService.getQuestions().find(q => q.id === ans.questionId);
             if (!q) return null;

             return (
               <div key={idx} className={`p-4 rounded-xl border ${ans.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex gap-3">
                    <div className={`mt-0.5 min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs text-white font-bold ${ans.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{q.text}</p>
                      <div className="text-sm space-y-1">
                        <p className={ans.isCorrect ? 'text-green-700' : 'text-red-700'}>
                          Bạn chọn: <span className="font-semibold">{q.options[ans.selectedIndex]}</span>
                        </p>
                        {!ans.isCorrect && (
                          <p className="text-gray-600">
                            Đáp án đúng: <span className="font-semibold text-green-700">{q.options[q.correctIndex]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
               </div>
             )
           })}
        </div>
      </div>

      <Button onClick={onHome} size="lg" className="px-8">
        <LogOut size={18} /> Về trang chủ
      </Button>
    </div>
  );
};


// Main App Component
function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [currentResult, setCurrentResult] = useState<StudentResult | null>(null);

  const handleFinishQuiz = (result: StudentResult) => {
    StorageService.saveResult(result);
    setCurrentResult(result);
    setView(ViewState.STUDENT_RESULT);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.LANDING:
        return <LandingView onNavigate={setView} />;
      case ViewState.ADMIN_LOGIN:
        return <AdminLogin onLoginSuccess={() => setView(ViewState.ADMIN_DASHBOARD)} onCancel={() => setView(ViewState.LANDING)} />;
      case ViewState.ADMIN_DASHBOARD:
        return <AdminView />;
      case ViewState.STUDENT_LOGIN:
        return <StudentView onFinish={handleFinishQuiz} onCancel={() => setView(ViewState.LANDING)} />;
      case ViewState.STUDENT_RESULT:
        return currentResult ? <ResultView result={currentResult} onHome={() => setView(ViewState.LANDING)} /> : null;
      default:
        return <LandingView onNavigate={setView} />;
    }
  };

  return (
    <Layout 
      view={view} 
      onNavigate={setView} 
      currentUser={view === ViewState.ADMIN_DASHBOARD ? 'Admin' : undefined}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;