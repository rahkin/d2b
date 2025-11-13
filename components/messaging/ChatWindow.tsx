'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  isRead: boolean;
  createdAt: string;
}

interface ChatWindowProps {
  userId: string;
  userName: string;
  userAvatar?: string;
}

export function ChatWindow({ userId, userName, userAvatar }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    // Set up polling or WebSocket for real-time updates
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/messages/conversation/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: userId,
          content: newMessage
        })
      });

      const result = await response.json();
      if (result.success) {
        setMessages(prev => [...prev, result.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-PH', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border-secondary flex items-center gap-3">
        {userAvatar && (
          <img
            src={userAvatar}
            alt={userName}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <h3 className="font-semibold text-foreground">{userName}</h3>
          <p className="text-xs text-foreground-secondary">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId !== userId;
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                isOwn
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-foreground'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isOwn ? 'text-white/70' : 'text-foreground-tertiary'
                }`}>
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border-secondary">
        <div className="flex gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <PaperClipIcon className="w-5 h-5 text-foreground-secondary" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="input-field flex-1"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}




