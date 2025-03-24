import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Para redirecionar após login bem-sucedido

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar se o email e a senha coincidem com algum usuário salvo no localStorage
    const userExists = storedUsers.find(
      (user: { email: string; password: string }) => user.email === email && user.password === password
    );

    if (userExists) {
      alert("Login successful!");
      navigate("/dashboard"); // Redirecionar para outra página após login
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col m-auto justify-center">
      <Header />
      <main className="flex-grow container mx-auto px-5 flex items-center justify-center">
        <section className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 lg:max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
          <span className="text-gray-600 block text-center mb-6">Sign in to continue</span>

          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                <rect width="40" height="40" fill="#00B0B9" rx="8" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.667 14.667h10.666c.734 0 1.334.6 1.334 1.333v8c0 .733-.6 1.333-1.334 1.333H14.667c-.734 0-1.334-.6-1.334-1.333v-8c0-.733.6-1.333 1.334-1.333Z" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M26.667 16 20 20.667 13.333 16" />
              </svg>
            }
          />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                <rect width="40" height="40" fill="#00B0B9" rx="8" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m26 13.333-1.333 1.334m0 0 2 2L24.333 19l-2-2m2.334-2.333L22.333 17m-2.74 2.74a3.668 3.668 0 0 1-1.177 6 3.667 3.667 0 0 1-4.008-.815 3.667 3.667 0 0 1 5.185-5.184v-.001Zm0 0 2.74-2.74" />
              </svg>
            }
          />

          <div className="flex justify-between items-center mb-6">
            <Checkbox label="Remember me" />
            <span className="text-sm text-teal-500 cursor-pointer">Forgot password?</span>
          </div>

          <Button text="Sign in" onClick={handleLogin} />

          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-600">Don’t have an account?</span>
            <Link to="/signup">
              <span className="text-sm text-teal-500 cursor-pointer">Sign up.</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default LoginPage;
