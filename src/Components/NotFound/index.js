import { Component } from "react";
import Header from "../Header";
import "./index.css"; // Import your CSS file
import { Link } from "react-router-dom";
class NotFound extends Component {
    render() {
        return (
           
            <div className="not-found-container">
                   <Header />
                <img
                    src="https://t4.ftcdn.net/jpg/03/88/63/83/360_F_388638369_wSBADhKfhiTx6Q5Pz1xfdpy6zotku1Sg.jpg"
                    className="not-found-image"
                    alt="Not Found"
                />
                <Link to="/" className="back-button">
                    Back to Home
                </Link>
            </div>
        );
    }
}

export default NotFound;
