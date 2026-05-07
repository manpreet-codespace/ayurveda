import Product from '../../admin/Pages/Product'
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Dashboard";
import Disease from '../Pages/Disease';
import Treatment from '../Pages/Treatment';

const AdminRoutes={
    path:"/admin",
    element:<AdminLayout/>,
    children:[
        {path:"dashboard", element: <Dashboard/>},
        {path:"products", element: <Product/>},
        {path:"disease" , element:<Disease/>},
        {path:"treatment", element:<Treatment/>}
    ]
}

export default AdminRoutes;

