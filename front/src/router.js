import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { AdminListing } from "./pages/AdminListing";
import { Home } from "./pages/Home";

import { LandingPage } from "./pages/LandingPage";
import ManageOffers from "./pages/ManageOffers";
import ManageUsers from "./pages/ManageUsers";
import Offer from "./pages/Offer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-offers" element={<ManageOffers />} />
        <Route path="/admin/listing" element={<AdminListing />} />
        <Route path="/offer/:id" element={<Offer />}/>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };