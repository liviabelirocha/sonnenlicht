import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import { LandingPage } from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const RouterNotAuth = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export { RouterNotAuth }
