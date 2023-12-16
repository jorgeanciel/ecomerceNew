import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../views/Home';
import Login from '../views/Login';
import Purshase from '../views/Purshase';
import ProductDetail from '../views/ProductDetail';
import NotFound from '../views/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { loaderHome } from './loader/loaderHome';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: loaderHome,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/purchases',
        element: (
          <ProtectedRoute>
            <Purshase />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
