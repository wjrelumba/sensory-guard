import './App.css'
import { Route, Routes } from 'react-router-dom'
import Pages from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<Pages.Homepage/>}/>
        <Route path='/login' element={<Pages.Login/>}/>
        <Route path='/signup' element={<Pages.Signup/>}/>
        <Route path='/dashboard' element={<Pages.Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App;
