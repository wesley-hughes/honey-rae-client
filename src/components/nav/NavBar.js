import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">Service Tickets</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/login"
          onClick={
            () => {
              localStorage.removeItem("honeyrae")
            }
          }>
          Logout
        </Link>
      </li>
    </ul>
  )
}
