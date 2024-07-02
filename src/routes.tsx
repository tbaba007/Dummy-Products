import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const ProducList=lazy(()=>import('./pages/Products/ProductList'))
const ProductReview=lazy(()=>import('./pages/Products/ProductReview'))
const NotFound=lazy(()=>import('./pages/NotFound'));

const Routes=createBrowserRouter([
    {
        path:'/',
        Component: ()=><ProducList/>,
        
    },
    {
        path:'/products/:productId',
        Component:()=><ProductReview/>
    },
    {
        path:'*',
        Component:()=><NotFound/>
    },
    {
        path:'/productlist',
        Component:()=><ProducList/>
    },
])

export default Routes;