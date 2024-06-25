import { Link } from "react-router-dom";
import './footer.css'

interface FooterProps {

}
export function Footer(props : FooterProps){
    return(
        <footer className="info">
            <p>Double-click to edit a todo</p>
            <p>Inspired on the TodoMVC made by Bruno</p>
            <p>
                Part of <Link to={""}>Bruno</Link>
            </p>
        </footer>
    )
}