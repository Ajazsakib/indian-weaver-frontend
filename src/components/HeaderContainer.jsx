import React from 'react';
import { useLocation } from 'react-router-dom';

const HeaderContainer = ({ children }) =>
{
    const location = useLocation()
    return (
        <div>
            {location.pathname !== "/login" && location.pathname !== "/register" && children}

        </div>
    )
}

export default HeaderContainer
