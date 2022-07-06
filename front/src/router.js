import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Admin } from './pages/Admin'
import CreateOffer from './pages/CreateOffer'
import ErrorPage from './pages/ErrorPage'
import { Home } from './pages/Home'

import { LandingPage } from './pages/LandingPage'
import ManageOffers from './pages/ManageOffers'
import ManageUsers from './pages/ManageUsers'
import Offer from './pages/Offer'
import { OwnerListing } from './pages/OwnerListing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/offer/:id" element={<Offer />} />
      <Route path="/listing" element={<Home />} />
      <Route path="/my-listing" element={<OwnerListing />} />
      <Route path="/create-offer" element={<CreateOffer />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export { Router }
