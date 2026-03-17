"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';

export interface Feedback {
  id: string;
  userEmail: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface CivicContextType {
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp' | 'userEmail' | 'userName'>) => void;
  getAllFeedback: () => Feedback[];
  clearSession: () => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

const GLOBAL_FEEDBACK_KEY = 'hs_global_feedback_v1';

export function CivicProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const addFeedback = (feedback: Omit<Feedback, 'id' | 'timestamp' | 'userEmail' | 'userName'>) => {
    if (!user) return;
    const allFeedback = getAllFeedback();
    const newFeedback: Feedback = {
      ...feedback,
      id: Math.random().toString(36).substr(2, 9),
      userEmail: user.email,
      userName: user.fullName || user.username,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(GLOBAL_FEEDBACK_KEY, JSON.stringify([...allFeedback, newFeedback]));
  };

  const getAllFeedback = (): Feedback[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(GLOBAL_FEEDBACK_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const clearSession = () => {
    // Session clearing logic for local state if needed
  };

  return (
    <CivicContext.Provider value={{
      addFeedback,
      getAllFeedback,
      clearSession
    }}>
      {children}
    </CivicContext.Provider>
  );
}

export function useCivic() {
  const context = useContext(CivicContext);
  if (context === undefined) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
}