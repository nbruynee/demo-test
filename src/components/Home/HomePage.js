import React from "react";
import BannerHome from "../../assets/videos/video-homepage.mp4"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate()

    return (
        <>
            <div className="homepage-container">
                <video className="video-container"
                    src={BannerHome} muted autoPlay loop >
                </video>
            </div>
            <div className="homepage-content">
                <div className="title-1">There's a better way to ask</div>
                <div className="title-2">You don't want to make a boring form.
                    and your audience won't answer one.
                    Create a typeform instead and make everyone happy.
                </div>
                {isAuthenticated === false ? 
                <button className="btn-1" onClick={()=> navigate("/login")}>Let's try now</button>
                :
                <button className="btn-1" onClick={() => navigate("/users")}>Doing quiz now</button>
                } 
            </div>
        </>

    )
};

export default HomePage;