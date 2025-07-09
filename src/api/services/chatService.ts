import axios from 'axios';
import { ChatRequest, ChatResponse, ApiError } from '../interfaces/chat';

// Use local API route instead of external URL
const API_BASE_URL = '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ChatService {
  static async askQuestion(question: string): Promise<ChatResponse> {
    try {
      const requestData: ChatRequest = { question };
      
      // This will now call /api/chat instead of the external URL
      const response = await apiClient.post<ChatResponse>('/chat', requestData);
      
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status,
        };
        throw apiError;
      }
      
      throw {
        message: 'Unknown error occurred',
      } as ApiError;
    }
  }
}

export default ChatService; 