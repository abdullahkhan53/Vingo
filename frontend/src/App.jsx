import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
    </>
  )
}

export default App
