import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/login'
import Applications from '../pages/applications'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/applications" element={<Applications/>}/>
      </Routes>
    </BrowserRouter>
  )
}
