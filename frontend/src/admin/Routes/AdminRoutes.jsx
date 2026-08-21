import AdminLayout from "../Layout/AdminLayout";
import { lazy } from "react";
const Product = lazy(()=>import('../Pages/Product'));
const Dashboard = lazy(()=>import('../Pages/Dashboard'));
const Disease = lazy(()=>import('../Pages/Disease'));
const Gallery = lazy(()=>import('../Pages/Gallery'));
const Treatment = lazy(()=>import('../Pages/Treatment'));
 

const AdminRoutes={
    path:"/admin",
    element:<AdminLayout/>,
    children:[
        {path:"dashboard", element: <Dashboard/>},
        {path:"products", element: <Product/>},
        {path:"disease" , element:<Disease/>},
        {path:"treatment", element:<Treatment/>},
        {path:"gallery", element: <Gallery/>}
    ]
}



export default AdminRoutes;

