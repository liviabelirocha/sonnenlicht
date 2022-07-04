import { UserProvider } from './useUserData'

const ApplicationProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>
}

export default ApplicationProvider
