
import React from 'react'
import '../css/footer.css'

const Footer = () => {
    return (
        <div>
            {/* START: footer */}
            <footer role="contentinfo" className="probootstrap-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="probootstrap-footer-widget">
                                <h3>About</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                <p><a href="#" className="link-with-icon">Learn More <i className=" icon-chevron-right" /></a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="probootstrap-footer-widget">
                                <h3>Blog</h3>
                                <ul className="probootstrap-blog-list">
                                    <li>
                                        <a href="#">
                                            <figure><img src="img/img_2.jpg" alt="Free Bootstrap Template by uicookies.com" className="img-responsive" /></figure>
                                            <div className="text">
                                                <h4>River named Duden flows</h4>
                                                <p>A small river named Duden flows by their place</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <figure><img src="img/img_3.jpg" alt="Free Bootstrap Template by uicookies.com" className="img-responsive" /></figure>
                                            <div className="text">
                                                <h4>River named Duden flows</h4>
                                                <p>A small river named Duden flows by their place</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <figure><img src="img/img_2.jpg" alt="Free Bootstrap Template by uicookies.com" className="img-responsive" /></figure>
                                            <div className="text">
                                                <h4>River named Duden flows</h4>
                                                <p>A small river named Duden flows by their place</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="probootstrap-footer-widget">
                                <h3>Contact</h3>
                                <ul className="probootstrap-contact-info">
                                    <li><i className="icon-location2" /> <span>198 West 21th Street, Suite 721 New York NY 10016</span></li>
                                    <li><i className="icon-mail" /><span>info@domain.com</span></li>
                                    <li><i className="icon-phone2" /><span>+123 456 7890</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row mt40">
                        <div className="col-md-12 text-center">
                            <ul className="probootstrap-footer-social">
                                <li><a href=""><i className="icon-twitter" /></a></li>
                                <li><a href=""><i className="icon-facebook" /></a></li>
                                <li><a href=""><i className="icon-instagram2" /></a></li>
                            </ul>
                            <p>
                                <small>© 2017 <a href="https://uicookies.com/" target="_blank" rel="noreferrer">uiCookies:Sublime</a>. All Rights Reserved. <br /> Designed &amp; Developed by <a href="https://uicookies.com/" target="_blank" rel="noreferrer">uicookies.com</a> Demo Images: Unsplash</small>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* END: footer */}

        </div>
    )
}


export default Footer