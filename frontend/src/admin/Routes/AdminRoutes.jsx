import Product from '../../admin/Pages/Product'
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Dashboard";

const AdminRoutes={
    path:"/admin",
    element:<AdminLayout/>,
    children:[
        {path:"dashboard", element: <Dashboard/>},
        {path:"products", element: <Product/>}
    ]
}

export default AdminRoutes;

