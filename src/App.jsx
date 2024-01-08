import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home.jsx';
import Navigation from "./Navigation.jsx";
  
const router = createBrowserRouter([
{
    path: "/",
    element: (
    <Home/>
    ),
},
{
    path: "/login",
    element: <div>Login</div>,
},
{
    path: "/contact",
    element: <div>Contact</div>,
},
{
    path: "/play",
    element: <div>Play</div>,
},
]);

export default function App() {
    return (
        <>
            <Navigation />
            <RouterProvider router={router} />
        </>
    )
}