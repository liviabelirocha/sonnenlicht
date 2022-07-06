import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin } from './pages/Admin'
import ErrorPage from './pages/ErrorPage'
import { Home } from './pages/Home'
import { LandingPage } from './pages/LandingPage'
import ManageOffers from './pages/ManageOffers'
import ManageUsers from './pages/ManageUsers'
import Offer from './pages/Offer'

const RouterAdmin = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/" element={<Admin />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-offers" element={<ManageOffers />} />
      <Route path="/listing" element={<Home />} />
      <Route path="/offer/:id" element={<Offer />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export { RouterAdmin }
