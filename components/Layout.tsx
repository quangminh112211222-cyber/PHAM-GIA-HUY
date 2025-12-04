import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  view: ViewState;
  onNavigate: (view: ViewState) => void;
  currentUser?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, view, onNavigate, currentUser }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(ViewState.LANDING)}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">SmartQuiz VN</span>
          </div>
          
          <div className="flex items-center gap-4">
             {currentUser && <span className="text-sm font-medium text-gray-600 hidden sm:block">Xin chào, {currentUser}</span>}
             {view !== ViewState.LANDING && (
               <button 
                onClick={() => onNavigate(ViewState.LANDING)}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium"
               >
                 Trang chủ
               </button>
             )}
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">© 2024 SmartQuiz VN. Powered by React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};