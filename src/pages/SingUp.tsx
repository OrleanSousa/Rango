import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // Remover espaços em branco antes de validar
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    alert("User registered successfully!");
    navigate("/login");
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
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                <rect width="40" height="40" fill="#00B0B9" rx="8" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M25.333 26v-1.333A2.667 2.667 0 0 0 22.667 22h-5.334a2.667 2.667 0 0 0-2.666 2.667V26M20 19.333A2.667 2.667 0 1 0 20 14a2.667 2.667 0 0 0 0 5.333Z" />
              </svg>
            }
          />

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
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M26 13.333l-1.333 1.334m0 0 2 2L24.333 19l-2-2m2.334-2.333L22.333 17m-2.74 2.74a3.668 3.668 0 0 1-1.177 6 3.667 3.667 0 0 1-4.008-.815 3.667 3.667 0 0 1 5.185-5.184v-.001Zm0 0 2.74-2.74" />
              </svg>
            }
          />

          <InputField
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                <rect width="40" height="40" fill="#00B0B9" rx="8" />
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M26 13.333l-1.333 1.334m0 0 2 2L24.333 19l-2-2m2.334-2.333L22.333 17m-2.74 2.74a3.668 3.668 0 0 1-1.177 6 3.667 3.667 0 0 1-4.008-.815 3.667 3.667 0 0 1 5.185-5.184v-.001Zm0 0 2.74-2.74" />
              </svg>
            }
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
