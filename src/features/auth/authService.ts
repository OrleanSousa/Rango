// Importa o cliente HTTP Axios para realizar requisições à API
import axios from "axios";

// Define a URL base da API de autenticação
const API_URL = "https://api.exemplo.com/auth/";

// Define a interface para os dados do usuário enviados para registro/login
interface UserData {
  nome?: string; // Opcional para login
  email: string;
  password: string;
}

// Define a interface para a resposta da API ao registrar ou logar um usuário
interface UserResponse {
  id: string;
  nome: string;
  email: string;
  token: string;
}

// Função para registrar um novo usuário
// @param userData - Objeto contendo os dados do usuário (ex: { nome, email, senha })
// @returns Os dados do usuário registrados, retornados pela API
const register = async (userData: UserData): Promise<UserResponse> => {
  // Faz uma requisição POST para a rota de registro da API
  const response = await axios.post<UserResponse>(API_URL + "register", userData);

  // Se a resposta da API contém dados do usuário, salva no localStorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Armazena o usuário localmente
  }

  return response.data; // Retorna os dados do usuário registrados pela API
};

// Função para realizar login do usuário
// @param userData - Objeto contendo os dados do usuário (ex: { email, senha })
// @returns Os dados do usuário logado, retornados pela API
const login = async (userData: UserData): Promise<UserResponse> => {
  // Faz uma requisição POST para a rota de login da API
  const response = await axios.post<UserResponse>(API_URL + "login", userData);

  // Se a resposta contém dados do usuário, salva no localStorage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Salva o usuário logado no localStorage
  }

  return response.data; // Retorna os dados do usuário autenticado
};

// Objeto authService que agrupa as funções register e login
const authService = {
  register, // Função para registrar usuários
  login,    // Função para login de usuários
};

// Exporta o authService para que possa ser utilizado em outras partes da aplicação
export default authService;