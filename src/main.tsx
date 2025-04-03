import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx' // Exemplo de outra página
import Login from './pages/Login.tsx'
import SingUp from './pages/SingUp.tsx'
import Dashboard from './pages/Dashboard.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Layout from './components/Layout.tsx'
import ItemMenu from './pages/ItemMenu.tsx'
import CartPage from './pages/CartPage.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/item/:id" element={<ItemMenu/>} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
    </Layout>
    </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
