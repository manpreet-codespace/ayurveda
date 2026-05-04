import { useRoutes } from 'react-router-dom'
import App from './App.jsx'
import JoinHands from './JoinHands.jsx'
import Contact from './Contact.jsx'
import Ayurveda from './Ayurveda.jsx'
import adminRoutes from './admin/Routes/AdminRoutes.jsx'

const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <App /> },
    { path: '/join-hands', element: <JoinHands /> },
    { path: '/contact', element: <Contact /> },
    { path: '/ayurveda', element: <Ayurveda /> },
    adminRoutes,
  ])
}

export default AppRoutes
