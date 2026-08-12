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
import ProductsDetailsPage from './ProductsDetailsPage.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Cart from './Cart.jsx'
import Wishlist from './Wishlist.jsx'

const AppRoutes = () => {
  return useRoutes([
    { path: '/user-login', element: <Signup/>},
    { path: '/login' , element: <Login/>},
    { path: '/', element: <App /> },
    { path: '/join-hands', element: <JoinHands /> },
    { path: '/contact', element: <Contact /> },
    { path: '/ayurveda', element: <Ayurveda /> },
    { path: '/diseases', element: <Disease /> },
    { path: '/diseases/:slug', element: <Disease /> },
    { path: '/not-found', element: <NotFoundPage/> },
    { path: '/gallery' , element: <Gallery/>},
    { path: '/products', element: <Products/>},
    { path: '/product-details', element: <ProductsDetailsPage/>},
    { path: '/product-details/:p_id', element: <ProductsDetailsPage/>},
    { path: '/get-cart', element:<Cart/>},
    { path: '/get-wishlist' , element:<Wishlist/>},
    

    adminRoutes,
  ])
}

export default AppRoutes
