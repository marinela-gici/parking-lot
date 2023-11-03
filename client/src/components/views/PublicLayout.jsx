import React from "react";
import Navbar from "../Navbar.jsx";

const PublicLayout = (props) => {
    const {children} = props;
    return (
        <>
        <div>
            <Navbar />
            {children}
        </div>
        </>
    )
}

export default PublicLayout;