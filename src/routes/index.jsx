import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../views/Home";
import Detail from "../views/Details";
import Error404 from "../views/Error404";
import Profile from "../views/Profile";
import LikeEvents from "../views/Profile/components/LikeEvents";
import MyInfo from "../views/Profile/components/MyInfo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404 />
    },
    {
        path: '/detail/:eventId',
        element: <Detail />
    },
    {
        path: '/profile',
        element: <Profile />,

        children: [
            {
                path: 'my-info',
                element: <MyInfo />
            },
            {
                path: 'like-events',
                element: <LikeEvents />
            }
        ],
    }


]);

const MyRoutes = () => <RouterProvider router={router} />; 

export default MyRoutes;