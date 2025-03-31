// Importa funções e módulos necessários do Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService"; // Serviço que lida com chamadas à API relacionadas à autenticação

// Define a interface para os dados do usuário enviados para login/registro
interface UserData {
  email: string;
  password: string;
  name?: string; // Opcional no login, pode ser exigido apenas no registro
}

// Define a interface para a resposta da API ao registrar ou logar um usuário
interface UserResponse {
  id: string;
  email: string;
  token: string;
}

// Define a interface AuthState para tipagem do estado de autenticação no Redux
interface AuthState {
  [x: string]: any;
  user: UserResponse | null; // Objeto que contém as informações do usuário logado (pode ser null)
  isLoading: boolean;        // Estado que indica se a aplicação está carregando durante o login/registro
  isError: boolean;          // Estado que indica se ocorreu algum erro no login/registro
  message: string;           // Armazena mensagens de erro ou sucesso para feedback ao usuário
}

// Recupera o usuário do localStorage (caso exista), ou define como null
const user = JSON.parse(localStorage.getItem("user") || "null");

// Define o estado inicial do slice de autenticação
const initialState: AuthState = {
  user: user ? user : null,  // Se o usuário existe no localStorage, define-o; caso contrário, inicia como null
  isLoading: false,          // Nenhuma requisição está em andamento no estado inicial
  isError: false,            // Não há erros no estado inicial
  message: "",               // Mensagem inicial vazia
};

// Thunk assíncrono para login
export const login = createAsyncThunk<UserResponse, UserData, { rejectValue: string }>(
  "auth/login", // Nome da ação
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData); // Tenta fazer login chamando o authService com os dados do usuário
    } catch (error: any) {
      // Caso ocorra um erro, retorna uma mensagem de erro usando thunkAPI.rejectWithValue
      const errorMessage = error.response?.data?.message || "Erro desconhecido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Thunk assíncrono para registro de usuário
export const register = createAsyncThunk<UserResponse, UserData, { rejectValue: string }>(
  "auth/register", // Nome da ação
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData); // Chama o serviço de registro
    } catch (error: any) {
      // Retorna uma mensagem de erro em caso de falha no registro
      const errorMessage = error.response?.data?.message || "Erro desconhecido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Criação do slice de autenticação usando createSlice
const authSlice = createSlice({
  name: "auth",        // Nome do slice
  initialState,        // Estado inicial do slice
  reducers: {
    // Redutor síncrono para logout
    logout: (state) => {
      localStorage.removeItem("user"); // Remove o usuário do localStorage
      state.user = null;               // Define o estado do usuário como null após logout
    },
  },
  // Define como o estado reage a ações assíncronas geradas pelos thunks (login e register)
  extraReducers: (builder) => {
    builder
      // Quando a ação de login é disparada e está pendente (em andamento)
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Define o estado de carregamento como verdadeiro
      })
      // Quando o login é concluído com sucesso
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;       // Define que a requisição não está mais carregando
        state.user = action.payload;   // Define o usuário com os dados retornados da API
        state.isError = false;         // Reseta o estado de erro
        state.message = "";            // Reseta a mensagem de erro
      })
      // Quando o login falha
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;      // Define que não está mais carregando
        state.isError = true;         // Define que ocorreu um erro
        state.message = action.payload as string; // Armazena a mensagem de erro retornada pela API
      })
      // Quando a ação de registro está pendente (em andamento)
      .addCase(register.pending, (state) => {
        state.isLoading = true; // Define o estado de carregamento como verdadeiro
      })
      // Quando o registro é concluído com sucesso
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;       // Define que a requisição não está mais carregando
        state.user = action.payload;   // Define o usuário com os dados retornados da API
        state.isError = false;         // Reseta o estado de erro
        state.message = "";            // Reseta a mensagem de erro
      })
      // Quando o registro falha
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;      // Define que não está mais carregando
        state.isError = true;         // Define que ocorreu um erro
        state.message = action.payload as string; // Armazena a mensagem de erro retornada pela API
      });
  },
});

// Exporta a ação síncrona de logout
export const { logout } = authSlice.actions;

// Exporta o reducer gerado pelo slice para ser utilizado na store do Redux
export default authSlice.reducer;