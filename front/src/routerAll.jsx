import { BrowserRouter } from 'react-router-dom'
import { useUserData } from './hooks/useUserData'
import { Router } from './router'
import { RouterAdmin } from './routerAdmin'
import { RouterNotAuth } from './routerNotAuth'

const RouterAll = () => {
  const { userData } = useUserData()
  return (
    <BrowserRouter>
      {userData ? (
        userData.role === 'Admin' ? (
          <RouterAdmin />
        ) : (
          <Router />
        )
      ) : (
        <RouterNotAuth />
      )}
    </BrowserRouter>
  )
}

export default RouterAll
