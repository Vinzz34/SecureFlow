import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {


  return currentUser === null ? <Navigate to='/sign-in' replace={true} />  : <Outlet />
}

export default ProtectedRoutes