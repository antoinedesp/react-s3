import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <div
            className="backdrop-blur flex space-x-4 rounded-full w-80 mx-auto border border-opacity-50 py-2 px-4 place-content-center">
            <div>
                <NavLink
                    to="/"
                    className={(function ({isActive, isPending}) {
                        return isActive
                            ? "transition hover:text-blue-700  text-blue-700"
                            : "transition hover:text-blue-700  text-black";
                    })}>
                    Acceuil
                </NavLink>
            </div>

            <div>
                <NavLink
                    to="/login"
                    className={(function ({isActive, isPending}) {
                        return isActive
                            ? "transition hover:text-blue-700 text-blue-700"
                            : "transition hover:text-blue-700  text-black";
                    })}>
                    Login
                </NavLink>
            </div>

            <div>
                <NavLink
                    to="/contact"
                    className={(function ({isActive, isPending}) {
                        return isActive
                            ? "transition hover:text-blue-700  text-blue-700"
                            : "transition hover:text-blue-700  text-black";
                    })}>
                    Contact
                </NavLink>
            </div>

        </div>
    )
}