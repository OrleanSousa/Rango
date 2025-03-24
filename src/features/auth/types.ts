// src/features/auth/types.ts

export interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  