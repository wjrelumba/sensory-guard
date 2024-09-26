import './App.css'
import { Route, Routes } from 'react-router-dom'
import Pages, { TestPages } from './pages'

function App() {
  return (
    <>
      <Routes>
        {/* Main pages here */}
        <Route path='*' element={<Pages.Homepage/>}/>
        <Route path='/login' element={<Pages.Login/>}/>
        <Route path='/signup' element={<Pages.Signup/>}/>
        <Route path='/dashboard' element={<Pages.Dashboard/>}/>

        {/* Testing pages here */}
        <Route path='/test'>
          <Route path='dashboard' element={<TestPages.TestDashboard/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
