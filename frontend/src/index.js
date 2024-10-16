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
import PaymentScreen from './Screens/PaymentScreen';
import OrderScreen from './Screens/OrderScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
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
        <Route path="order/:id" element={<OrderScreen />}/>
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

