import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import App from './App'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AnimalList from './pages/AnimalList.jsx'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ManageAnimals from './components/ManageAnimals'
import AddAnimal from './components/AddAnimal'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
