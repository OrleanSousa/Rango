interface User {
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  isLoggedIn: boolean;
}

export function validateLocalStorageUser(email: string, password: string): boolean {
  const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  // Normalizar e-mail e senha, e verificar correspondência
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  const userFound = storedUsers.find(
    (user) => user.email === normalizedEmail && user.password === normalizedPassword
  );

  return !!userFound; // Retorna true se o usuário for encontrado
}

export function isEmailRegistered(email: string): boolean {
  const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const normalizedEmail = email.trim().toLowerCase();

  return storedUsers.some((user) => user.email === normalizedEmail);
}
