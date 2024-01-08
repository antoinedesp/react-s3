import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <div
            className="backdrop-blur flex space-x-4 rounded-full w-80 mx-auto border border-opacity-50 py-2 px-4 place-content-center">
            <div>
                <NavLink
                    to="/"
                    className={(function ({isActive, isPending}) {
                        return "transition hover:text-blue-700 " + isActive ? "text-red-700 " : isPending ? "text-blue-500 " : "text-black ";
                    })}>
                    Acceuil
                </NavLink>
            </div>

            <div>
                <NavLink
                    to="/login"
                    className={((isActive, isPending) => {
                        return "transition hover:text-blue-700 " + isActive
                            ? "text-blue-700 "
                            : isPending
                                ? "text-blue-500 "
                                : "";
                    })}>
                    Login
                </NavLink>
            </div>

            <div>
                <NavLink
                    to="/contact"
                    className={((isActive, isPending) => {
                        return "transition hover:text-blue-700 " + isActive
                            ? "text-blue-700 "
                            : isPending
                                ? "text-blue-500 "
                                : "";
                    })}>
                    Contact
                </NavLink>
            </div>

        </div>
    )
}