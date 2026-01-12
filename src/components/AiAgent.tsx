"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes, FaSpinner, FaLock } from 'react-icons/fa';
import { ChatService } from '../api';
import type { ChatResponse } from '../api';

interface Message {
  question: string;
  answer: string;
}

interface CachedAnswer {
  question: string;
  answer: string;
  timestamp: number;
}

const AiAgent = ({ isChatExpanded, toggleChat }: {
  isChatExpanded: boolean;
  toggleChat: () => void;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const USAGE_LIMIT = 10;
  const CACHE_KEY = 'ai_chat_cache';
  const USAGE_KEY = 'ai_chat_usage';

  // Initialize usage count and check if blocked
  useEffect(() => {
    const savedUsage = localStorage.getItem(USAGE_KEY);
    const currentUsage = savedUsage ? parseInt(savedUsage, 10) : 0;
    setUsageCount(currentUsage);
    setIsBlocked(currentUsage >= USAGE_LIMIT);
    
    // Load cached messages to populate chat
    loadCachedMessages();
  }, []);

  // Load cached messages to populate chat history
  const loadCachedMessages = () => {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) return;
      
      const cachedAnswers: CachedAnswer[] = JSON.parse(cache);
      
      // Convert cached answers to Message format and sort by timestamp
      const messages: Message[] = cachedAnswers
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(cached => ({
          question: cached.question,
          answer: cached.answer
        }));
      
      setChatMessages(messages);
    } catch (error) {
      console.error('Error loading cached messages:', error);
    }
  };

  // Get cached answer if exists
  const getCachedAnswer = (question: string): string | null => {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) return null;
      
      const cachedAnswers: CachedAnswer[] = JSON.parse(cache);
      const normalizedQuestion = question.toLowerCase().trim();
      
      const cached = cachedAnswers.find(
        item => item.question.toLowerCase().trim() === normalizedQuestion
      );
      
      return cached ? cached.answer : null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  };

  // Save answer to cache
  const saveToCache = (question: string, answer: string) => {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      const cachedAnswers: CachedAnswer[] = cache ? JSON.parse(cache) : [];
      
      const newEntry: CachedAnswer = {
        question: question.toLowerCase().trim(),
        answer,
        timestamp: Date.now()
      };
      
      // Remove old entry if exists and add new one
      const filteredCache = cachedAnswers.filter(
        item => item.question !== newEntry.question
      );
      
      filteredCache.push(newEntry);
      
      // Keep only last 50 entries to prevent localStorage bloat
      const trimmedCache = filteredCache.slice(-50);
      
      localStorage.setItem(CACHE_KEY, JSON.stringify(trimmedCache));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  // Update usage count
  const updateUsageCount = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(USAGE_KEY, newCount.toString());
    
    if (newCount >= USAGE_LIMIT) {
      setIsBlocked(true);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatExpanded]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading && !isBlocked) {
      const question = inputValue.trim();
      setIsLoading(true);
      
      try {
        // Check cache first
        const cachedAnswer = getCachedAnswer(question);
        
        let response: ChatResponse;
        
        if (cachedAnswer) {
          // Use cached answer
          response = {
            question: question,
            answer: cachedAnswer
          };
        } else {
          // Make API call and cache the result
          response = await ChatService.askQuestion(question);
          saveToCache(question, response.answer);
        }
        
        const newMessage: Message = {
          question: response.question,
          answer: response.answer
        };
        
        setChatMessages(prev => [...prev, newMessage]);
        setInputValue(""); 
        updateUsageCount();
        
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickQuestion = async (question: string) => {
    if (!isLoading && !isBlocked) {
      setInputValue(question);
      setIsLoading(true);
      
      try {
        // Check cache first
        const cachedAnswer = getCachedAnswer(question);
        
        let response: ChatResponse;
        
        if (cachedAnswer) {
          // Use cached answer
          response = {
            question: question,
            answer: cachedAnswer
          };
        } else {
          // Make API call and cache the result
          response = await ChatService.askQuestion(question);
          saveToCache(question, response.answer);
        }
        
        const newMessage: Message = {
          question: response.question,
          answer: response.answer
        };
        
        setChatMessages(prev => [...prev, newMessage]);
        setInputValue(""); // Clear input
        updateUsageCount();
        
      } catch (error) {
        console.error('Error sending quick question:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto transition-all duration-700 ease-in-out ${
      isChatExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 pointer-events-none'
    }`}>
      {isChatExpanded && (
        <div className="mt-8 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          {/* Close Button and Usage Counter */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-xs">
                {usageCount}/{USAGE_LIMIT} questions used
              </span>
              {isBlocked && (
                <div className="flex items-center space-x-1 text-red-400">
                  <FaLock className="w-3 h-3" />
                  <span className="text-xs">Limit reached</span>
                </div>
              )}
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          {/* Blocked Message */}
          {isBlocked && (
            <div className="mb-4 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-400">
                <FaLock className="w-4 h-4" />
                <p className="text-sm font-medium">Chat Limit Reached</p>
              </div>
              <p className="text-red-300 text-xs mt-1">
                You've reached the maximum of <strong>{USAGE_LIMIT}</strong> questions. Any more questions feel free to contact me by <strong>stefanburghelea@outlook.com</strong>.
              </p>
            </div>
          )}
          
                      {/* Chat Messages Area */}
            <div 
              ref={chatContainerRef}
              className="h-64 bg-black/20 rounded-lg p-4 mb-4 overflow-y-auto scrollbar-hide"
            >
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black text-sm font-semibold">S</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">
                    I'm a AI-powered assistant. Feel free to ask me about my development experience. It uses RAG with FastAPI under the hood.
                  </p>
                </div>
              </div>

              {/* Live Chat Messages */}
              {chatMessages.map((message, index) => (
                <div key={`chat-${index}`} className="space-y-3">
                  {/* User Question - Right Side */}
                  <div className="flex justify-end">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 max-w-xs">
                      <p className="text-white text-sm">{message.question}</p>
                    </div>
                  </div>
                  
                  {/* AI Answer - Left Side */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-sm font-semibold">S</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 max-w-xs">
                      <p className="text-white text-sm">{message.answer}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading Message */}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaSpinner className="w-3 h-3 text-black animate-spin" />
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 max-w-xs">
                    <p className="text-white text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isBlocked ? "Chat limit reached..." : "Type your message..."}
              disabled={isLoading || isBlocked}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim() || isBlocked}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-black p-4 rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <FaSpinner className="w-3 h-3 animate-spin" />
              ) : isBlocked ? (
                <FaLock className="w-3 h-3" />
              ) : (
                <FaPaperPlane className="w-3 h-3" />
              )}
            </button>
          </form>

          {!isBlocked && (
            <div className="mt-4">
              <p className="text-white/40 text-xs mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {['What technologies do you use?', 'Show me your projects', 'Tell me about yourself'].map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                    className="text-xs bg-white/5 hover:bg-white/10 disabled:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-white/70 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiAgent; 