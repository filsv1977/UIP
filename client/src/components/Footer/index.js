import React from 'react';
import logo from '../../image/UBIX network.svg';
import './footer.css';

function Footer() {
    return (
        <footer
            className="page-footer font-small blue  footer text-center text-white"
            style={{backgroundColor: 'rgb(82, 86, 89)'}}
        >
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <a className="logo_footer" href="https://ubix.network/" target="_blank" rel="noreferrer">
                            <img className="icon" src={logo} alt="UBIX" height="69px" width="69px" />
                        </a>
                    </div>
                    <div className="col-md-6 pt-3">
                        To participate send an email to{' '}
                        <a target="_blank" rel="noreferrer" href="mailto:uip@ubix.network">
                            uip@ubix.network
                        </a>{' '}
                        or send a message on telegram to{' '}
                        <a target="_blank" rel="noreferrer" href="https://t.me/clxibot">
                            @UBIXbot
                        </a>
                        <div className="footer-copyright text-center py-3">
                            Copyright © 2022 Ubix.network. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
