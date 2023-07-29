import { Link } from "react-router-dom"

const Header = () => {
    return (
        <ul>
            <li><Link to='/'>Local Storage</Link></li>
            <li><Link to='/1'>Context</Link></li>
        </ul>)
}
export default Header