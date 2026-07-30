import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm();

  if (!isAuthModalOpen) return null;

  const onSubmit = async (data) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (isRegisterMode) {
        await register(data.username, data.email, data.password);
        setSuccessMsg('Account created successfully!');
      } else {
        await login(data.email, data.password);
        setSuccessMsg('Logged in successfully!');
      }
      reset();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-none">
      <div className="bg-[#FFFFFF] border-2 border-[#D8DBD2] rounded-xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95">
        
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-[#8C9188] hover:text-[#1B1B1B] cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2F5D50] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            R
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#1B1B1B]">
              {isRegisterMode ? 'CREATE REVERA PASSPORT' : 'SIGN IN TO REVERA OS'}
            </h2>
            <span className="text-[10px] font-mono text-[#8C9188]">AUTHENTICATION SERVER v2.4</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#FEF2F2] border border-[#D94A4A] text-[#D94A4A] text-xs rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-[#F0FDF4] border border-[#3F7D58] text-[#3F7D58] text-xs rounded-lg flex items-center gap-2">
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          {isRegisterMode && (
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-2.5 text-[#8C9188]" />
                <input
                  type="text"
                  placeholder="audiophile_member"
                  {...registerField('username', { required: 'Username is required' })}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg text-xs font-medium outline-none focus:border-[#2F5D50]"
                />
              </div>
              {errors.username && <span className="text-[#D94A4A] text-[10px] mt-0.5 block">{errors.username.message}</span>}
            </div>
          )}

          <div>
            <label className="font-bold text-[#1B1B1B] block mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-2.5 text-[#8C9188]" />
              <input
                type="email"
                placeholder="audiophile@revera.audio"
                {...registerField('email', { required: 'Email is required' })}
                className="w-full pl-9 pr-3 py-2 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg text-xs font-medium outline-none focus:border-[#2F5D50]"
              />
            </div>
            {errors.email && <span className="text-[#D94A4A] text-[10px] mt-0.5 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="font-bold text-[#1B1B1B] block mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-[#8C9188]" />
              <input
                type="password"
                placeholder="••••••••"
                {...registerField('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 chars' } })}
                className="w-full pl-9 pr-3 py-2 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg text-xs font-medium outline-none focus:border-[#2F5D50]"
              />
            </div>
            {errors.password && <span className="text-[#D94A4A] text-[10px] mt-0.5 block">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2F5D50] hover:bg-[#24483E] text-white font-extrabold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
          >
            {isRegisterMode ? 'Register Member Passport' : 'Authenticate & Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#D8DBD2] text-center text-xs text-[#5E615C]">
          {isRegisterMode ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
            }}
            className="font-bold text-[#2F5D50] hover:underline cursor-pointer ml-1"
          >
            {isRegisterMode ? 'Sign In' : 'Create Account'}
          </button>
        </div>

      </div>
    </div>
  );
}
