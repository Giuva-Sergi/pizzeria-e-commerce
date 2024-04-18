import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./features/ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import {action as updateOrderAction} from "./features/order/UpdateOrder";
import AppLayout from "./features/ui/AppLayout";
import Error from "./features/ui/Error";
import PrivateRoute from "./features/ui/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PrivateRoute>
                    <Menu />
                 </PrivateRoute>,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <PrivateRoute>
                  <Cart />
                 </PrivateRoute>,
      },
      {
        path: "/order",
        element: <PrivateRoute>
                  <Order />,
                 </PrivateRoute>
      },
      {
        path: "/order/new",
        element: <PrivateRoute>
          <CreateOrder />
        </PrivateRoute>,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <PrivateRoute>
        <Order />,
       </PrivateRoute>,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
