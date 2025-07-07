export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
}

export interface ApiError {
  message: string;
  status?: number;
} 