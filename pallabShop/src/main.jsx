import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Home, ProductPage, LoginPage,Oldders,Neworders,Cart,AddProduct,ManualOrder} from './pages/index.js'

const router = createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
     path:'/',
     element:<Home/>
    },
    {
      path:'/product',
      element:<ProductPage/>
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/oldOrders',
      element:<Oldders/>
    },
    {
      path:'/newOrders',
      element:<Neworders/>
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/addProduct',
      element:<AddProduct/>
    },
    {
      path:'/manualOrder',
      element:<ManualOrder/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
