import { useRoutes } from 'react-router-dom'
import { lazy,Suspense } from 'react'
import {Vortex} from 'react-loader-spinner'
const App  = lazy(()=> import('./App.jsx'));
const JoinHands = lazy(()=> import ('./JoinHands.jsx'));
const Contact = lazy(()=>import ('./Contact.jsx'));
const Ayurveda = lazy(()=> import ('./Ayurveda.jsx'));
import adminRoutes from './admin/Routes/AdminRoutes.jsx'
import PublicLayout from './Components/Layouts/PublicLayout.jsx';
const Disease = lazy(() => import ('./Disease.jsx'));
const NotFoundPage = lazy(()=> import('./NotFoundPage.jsx'));
const Gallery = lazy(()=> import ('./Gallery.jsx'));
const Products = lazy(()=> import ('./Products.jsx'));
const ProductsDetailsPage  = lazy(()=>import('./ProductsDetailsPage.jsx'));
const Signup  = lazy(()=>import ('./Signup.jsx'));
const Login = lazy(()=> import ('./Login.jsx'));
const Cart = lazy(()=> import ('./Cart.jsx'));
const Wishlist = lazy(()=> import ('./Wishlist.jsx'));

const AppRoutes = () => {
  return(
<Suspense fallback={<div className='flex justify-center h-screen items-center'>

  <Vortex visible={true}
height="80"
width="80"
ariaLabel="vortex-loading"
wrapperStyle={{}}
wrapperClass="vortex-wrapper"
colors={['voilet','yellow','red','pink','black','white']}/>
</div>
}>
  {
    useRoutes([
      { path: '/user-login', element: <Signup/>},
      { path: '/login' , element: <Login/>},
      {
        element:<PublicLayout/>,
        children:[
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
        ]},
      adminRoutes,
    ])
  }
  </Suspense>
  )
}

export default AppRoutes

{/* <Vortex
visible={true}
height="80"
width="80"
ariaLabel="vortex-loading"
wrapperStyle={{}}
wrapperClass="vortex-wrapper"
colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/>) */}