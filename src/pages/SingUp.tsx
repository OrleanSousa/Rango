import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { isEmailRegistered } from "../features/auth/localStorageValidator"; // Importa a função de verificação de e-mail no localStorage

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // Normalizar e-mail antes da validação
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Verificar se o e-mail já está registrado
    if (isEmailRegistered(normalizedEmail)) {
      alert("Email already registered. Please use a different email.");
      return;
    }

    const newUser = {
      name,
      email: normalizedEmail,
      password,
      imageUrl: "https://via.placeholder.com/150/150",
      isLoggedIn: false,
    };

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    alert("User registered successfully!");
    navigate("/login"); // Redireciona para a página de login após o registro
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-5 flex items-center justify-center">
        <section className="bg-white px-5 pt-[21%] rounded-lg shadow-lg w-full max-w-md lg:max-w-lg h-[650px] lg:pt-[10%]">
          <h1 className="mb-7 text-3xl font-bold capitalize text-center">Sign up</h1>

          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button text="Sign up" onClick={handleSignup} />

          <div className="flex justify-center items-center gap-2 mt-4 text-gray-700 text-sm">
            <span>Already have an account?</span>
            <Link to="/login" className="text-teal-500 cursor-pointer hover:underline">
              Sign in.
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
