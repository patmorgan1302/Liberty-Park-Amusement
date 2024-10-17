import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './bootstrap.custom.css'
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import ShippingScreen from './Screens/ShippingScreen';
import RegisterScreen from './Screens/RegisterScreen';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import PaymentScreen from './Screens/PaymentScreen';
import OrderScreen from './Screens/OrderScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderListScreen from './Screens/admin/OrderListScreen';
import ProductListScreen from './Screens/admin/ProductListScreen';
import ProductEditScreen from './Screens/admin/ProductEditScreen';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}/>
        <Route path="/shipping" element={<ShippingScreen />}/>
        <Route path="/payment" element={<PaymentScreen />}/>
        <Route path='/placeorder' element={<PlaceOrderScreen />}/>
        <Route path="/order/:id" element={<OrderScreen />}/>
        <Route path="/profile" element={<ProfileScreen />}/>

      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />}/>
        <Route path='/admin/productlist' element={<ProductListScreen />}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />}/>
      </Route>
    </Route>
    
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

