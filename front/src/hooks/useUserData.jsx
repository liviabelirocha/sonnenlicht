import { useEffect } from 'react'
import { useContext } from 'react'
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    const userItem = sessionStorage.getItem('user')
    const localUserData = userItem ? JSON.parse(userItem) : null
    if (!userData && localUserData) {
      setUserData(localUserData)
    }
  }, [])

  const saveUserData = (data) => {
    setUserData(data)
    sessionStorage.setItem('user', JSON.stringify(data))
  }

  const clearUserData = () => {
    sessionStorage.clear()
    setUserData()
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: saveUserData,
        clearUserData
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
