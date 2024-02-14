import React from 'react';
import "../assets/styles/style.css";
const HeaderWraper = () =>
{
    return (
        <div className='header-container-fluid'>


            <div className="personal-info">
                <div className='email'><span class="material-symbols-outlined">
                    mail
                </span>indianweaver1990@gmail.com</div>
                {/* <div className='address'><span class="material-symbols-outlined">
                    location_on
                </span>Mau, India</div> */}
                <div className='mobiile'><span class="material-symbols-outlined">
                    call
                </span>9911283141</div>
            </div>
            <div className="offer">
                <div className='info'>Free Shipping</div>
                <div className='info'>Cod Available</div>
                <div className='info'>Easy Returns</div>
            </div>
            <div className="social-icons">
                <div className='facebook'>
                    <img src="images/facebook.png" alt="icon" />
                </div>
                <div className='facebook'>
                    <img src="images/instagram.png" alt="icon" />
                </div>
                <div className='facebook'>
                    <img src="images/twitter.png" alt="icon" />
                </div>
                <div className='whatsapp'>
                    <img src="images/whatsapp.png" alt="icon" />
                </div>
            </div>


        </div>
    )
}

export default HeaderWraper
