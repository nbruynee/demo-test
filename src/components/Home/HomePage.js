import React from "react";
import BannerHome from "../../assets/videos/video-homepage.mp4"

const HomePage = (props) => {
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
                <button className="btn-1">Let's try now</button>
            </div>
        </>

    )
};

export default HomePage;