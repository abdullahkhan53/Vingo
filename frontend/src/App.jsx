import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
    </Routes>
    </>
  )
}

export default App
