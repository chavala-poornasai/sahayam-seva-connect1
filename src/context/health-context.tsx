
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface DiseasePrediction {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  findings: string;
  recommendations: string;
  timestamp: string;
}

export interface ImageAnalysis {
  id: string;
  type: string;
  detection: string;
  findings: string;
  recommendations: string;
  imageUrl?: string;
  timestamp: string;
}

export interface AssistantInteraction {
  id: string;
  query: string;
  explanation: string;
  guidance: string;
  specialists: string[];
  timestamp: string;
}

export interface Feedback {
  id: string;
  userEmail: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface HealthContextType {
  predictions: DiseasePrediction[];
  imageAnalyses: ImageAnalysis[];
  interactions: AssistantInteraction[];
  addPrediction: (prediction: Omit<DiseasePrediction, 'id' | 'timestamp'>) => void;
  addImageAnalysis: (analysis: Omit<ImageAnalysis, 'id' | 'timestamp'>) => void;
  addInteraction: (interaction: Omit<AssistantInteraction, 'id' | 'timestamp'>) => void;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp' | 'userEmail' | 'userName'>) => void;
  getAllFeedback: () => Feedback[];
  clearSession: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const HEALTH_DATA_KEY_PREFIX = 'hs_health_records_v1_';
const GLOBAL_FEEDBACK_KEY = 'hs_global_feedback_v1';

export function HealthProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<DiseasePrediction[]>([]);
  const [imageAnalyses, setImageAnalyses] = useState<ImageAnalysis[]>([]);
  const [interactions, setInteractions] = useState<AssistantInteraction[]>([]);

  useEffect(() => {
    if (user?.email) {
      const key = `${HEALTH_DATA_KEY_PREFIX}${user.email.toLowerCase().trim()}`;
      const savedData = localStorage.getItem(key);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setPredictions(parsed.predictions || []);
          setImageAnalyses(parsed.imageAnalyses || []);
          setInteractions(parsed.interactions || []);
        } catch (e) {
          console.error("Failed to load health records", e);
        }
      } else {
        setPredictions([]);
        setImageAnalyses([]);
        setInteractions([]);
      }
    } else {
      setPredictions([]);
      setImageAnalyses([]);
      setInteractions([]);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      const key = `${HEALTH_DATA_KEY_PREFIX}${user.email.toLowerCase().trim()}`;
      const dataToSave = {
        predictions,
        imageAnalyses,
        interactions
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
    }
  }, [predictions, imageAnalyses, interactions, user?.email]);

  const addPrediction = (prediction: Omit<DiseasePrediction, 'id' | 'timestamp'>) => {
    setPredictions(prev => [
      ...prev,
      { 
        ...prediction, 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: new Date().toISOString() 
      }
    ]);
  };

  const addImageAnalysis = (analysis: Omit<ImageAnalysis, 'id' | 'timestamp'>) => {
    setImageAnalyses(prev => [
      ...prev,
      { 
        ...analysis, 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: new Date().toISOString() 
      }
    ]);
  };

  const addInteraction = (interaction: Omit<AssistantInteraction, 'id' | 'timestamp'>) => {
    setInteractions(prev => [
      ...prev,
      { 
        ...interaction, 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: new Date().toISOString() 
      }
    ]);
  };

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
    setPredictions([]);
    setImageAnalyses([]);
    setInteractions([]);
  };

  return (
    <HealthContext.Provider value={{
      predictions,
      imageAnalyses,
      interactions,
      addPrediction,
      addImageAnalysis,
      addInteraction,
      addFeedback,
      getAllFeedback,
      clearSession
    }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
