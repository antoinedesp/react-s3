
import Navigation from "./components/Navigation.jsx";
import "./assets/styles/index.scss";


export default function App({ children }) {
    return (
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto p-5">
            <Navigation />
            { children }
        </div>
    )
}