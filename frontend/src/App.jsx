import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
import useGenCurrUser from './hooks/useGenCurrUser'
import {useSelector} from "react-redux";
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
// import UserDashboard from './components/UserDashboard'

function App() {

  useGenCurrUser()
  useGetCity()
  const userData = useSelector((state) => state.user?.userData);

  return (
    <>
    <Routes>
      <Route path="/signup" element={!userData? <SignUp/> : <Home/>}/>
      <Route path="/signIn" element={userData ? <Home/> : <SignIn/>}/>
      <Route path="/forgot-password" element={!userData? <ForgotPassword/> : <Home/>}/>
      <Route path="/" element={userData? <Home/> : <SignIn/>}/>
      {/* <Route path="/user" element={<UserDashboard/>}/> */}

    </Routes>
    </>
  )
}

export default App
