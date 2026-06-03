import { useRoutes } from 'react-router-dom'
import App from './App.jsx'
import JoinHands from './JoinHands.jsx'
import Contact from './Contact.jsx'
import Ayurveda from './Ayurveda.jsx'
import adminRoutes from './admin/Routes/AdminRoutes.jsx'
import Disease from './Disease.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import Gallery from './Gallery.jsx'
import Products from './Products.jsx'

const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <App /> },
    { path: '/join-hands', element: <JoinHands /> },
    { path: '/contact', element: <Contact /> },
    { path: '/ayurveda', element: <Ayurveda /> },
    { path: '/diseases', element: <Disease /> },
    { path: '/diseases/:slug', element: <Disease /> },
    { path: '/not-found', element: <NotFoundPage/> },
    { path: '/gallery' , element: <Gallery/>},
    { path: '/products', element: <Products/>},
    adminRoutes,
  ])
}

export default AppRoutes
