import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home.jsx';
import Navigation from "./Navigation.jsx";
import "./assets/styles/index.scss";

const router = createBrowserRouter([
{
    path: "/",
    element: (
        <>
            <Navigation/>
            <Home/>
        </>
    ),
},
{
    path: "/login",
    element: (
        <>
            <Navigation/>
            Login
        </>
    ),
},
{
    path: "/contact",
    element: (
        <>
            <Navigation/>
            Contact
        </>
    ),
},
{
    path: "/play",
    element: (
        <>
            <Navigation/>
            Play
        </>
    ),
},
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}