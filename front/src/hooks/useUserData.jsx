import { useEffect } from 'react'
import { useContext } from 'react'
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    const localUserData = sessionStorage.getItem('user')
    if (!userData && localUserData) {
      setUserData(localUserData)
    }
  }, [])

  const saveUserData = (data) => {
    setUserData(data)
    sessionStorage.setItem('user', data)
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: saveUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUserData = () => {
  const context = useContext(UserContext)
  if (context) return context
  else {
    throw new Error('Invalid Context')
  }
}

export { UserProvider, useUserData }
