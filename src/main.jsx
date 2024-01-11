import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { store } from './store.js';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Play from "./pages/Play.jsx";
import Contact from "./pages/Contact.jsx";

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
                <Login/>
            </App>
        ),
    },
    {
        path: "/contact",
        element: (
            <App>
                <Contact />
            </App>
        ),
    },
    {
        path: "/play",
        element: (
            <App>
                <Play/>
            </App>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
