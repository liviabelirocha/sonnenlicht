import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";

import { LandingPage } from "./pages/LandingPage";
import Offer from "./pages/Offer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/offer/:id" element={<Offer />}/>
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };