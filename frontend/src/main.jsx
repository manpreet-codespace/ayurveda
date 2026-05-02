import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import JoinHands from './JoinHands.jsx';
import Contact from './Contact.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/join-hands' element={<JoinHands/>}/>
        <Route path='/contact' element= {<Contact/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
