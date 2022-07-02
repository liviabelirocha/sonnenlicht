import { useLocation } from "react-router-dom";
import useToken from "../hooks/useToken";
import SignIn from "./SignIn";

const Admin = () => {
  const { token } = useToken()
  if(!token) {
    return <SignIn />
  }
  return <h1>Admin</h1>
}

export { Admin }
