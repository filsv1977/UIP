import React from 'react';
import './footer.css';
import logo from '../../image/logo.png';

function Footer() {
    return (
        <footer
            className="page-footer font-small blue fixed-bottom footer text-center text-white"
            style={{backgroundColor: 'rgb(82, 86, 89)'}}
        >
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <a className="logo_footer" href="https://silentnotary.com/" target="_blank" rel="noreferrer">
                            <img src={logo} alt="UBIX" />
                        </a>
                    </div>

                    <div className="col-md-6 pt-3">
                        To participate send an email to: <span>uip@ubix.network </span> or send a message on telegram to{' '}
                        <span>@klowert</span>
                        <div className="footer-copyright text-center py-3">
                            Copyright © 2022 SilentNotary. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
