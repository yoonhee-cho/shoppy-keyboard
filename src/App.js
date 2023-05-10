import './App.css';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './pages/ProtectedRoute';

import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AddNewProduct from './components/AddNewProduct';
import Cart from './components/Cart';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <Products/>
      },
      {
        path: '/products/:productId',
        element: <ProductDetail />
      },
      {
        path: '/newproducts',
        element: 
          <ProtectedRoute requireAdmin={true}>
            <AddNewProduct />
          </ProtectedRoute>
      },
      {
        path: '/cart',
        element: 
        <ProtectedRoute requireAdmin={false}>
          <Cart />
        </ProtectedRoute>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
