import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Home</h1>
        <Link to="play">Play!</Link>
      </div>
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
