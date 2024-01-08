import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App>
                <Home/>
            </App>
        ),
    },
    {
        path: "/login",
        element: (
            <App>
                Login
            </App>
        ),
    },
    {
        path: "/contact",
        element: (
            <App>
                Contact
            </App>
        ),
    },
    {
        path: "/play",
        element: (
            <App>
                Play
            </App>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
