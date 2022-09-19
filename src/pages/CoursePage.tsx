import React from 'react'
import './../css/course.css'

type Props = {}

const CoursePage = (props: Props) => {
    return (
        <div>

          

            <div>
                <img width={'100%'} src="https://www.mshoagiaotiep.com/uploads/images/userfiles/2020/03/09/Banner_Hoc_truc_tuyen_-_mang_lop_ve_nha_ban-01.jpg" alt="" />
            </div>
            {/* START: section */}
            <section className="probootstrap-section">
                <div className="container">
                    <div className="row probootstrap-gutter0 mb80" style={{ marginTop: '-120px' }}>
                        <div className="col-md-4 probootstrap-pricing-wrap">
                            <div className="probootstrap-pricing">
                                <h3>Personal</h3>
                                <div className="probootstrap-price-wrap">
                                    <span className="probootstrap-price">$19.99</span>
                                    <span className="probootstrap-price-per-month">per month</span>
                                </div>
                                <ul>
                                    <li>100 invoices</li>
                                    <li>Custom scripting &amp; scheduling</li>
                                    <li>Payment &amp; accounting software integration</li>
                                </ul>
                                <button className='btn__buy__coures'>
                                    Start Free Trial
                                </button>
                              
                            </div>
                        </div>
                        <div className="col-md-4 probootstrap-pricing-wrap">
                            <div className="probootstrap-pricing popular">
                                <h3>Advance <span>Most popular</span></h3>
                                <div className="probootstrap-price-wrap">
                                    <span className="probootstrap-price">$49.99</span>
                                    <span className="probootstrap-price-per-month">per month</span>
                                </div>
                                <ul>
                                    <li>500 invoices</li>
                                    <li>Custom scripting &amp; scheduling</li>
                                    <li>Payment &amp; accounting software integration</li>
                                </ul>
                                  <button className='btn__buy__coures'>
                                    Start Free Trial
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 probootstrap-pricing-wrap">
                            <div className="probootstrap-pricing">
                                <h3>Business</h3>
                                <div className="probootstrap-price-wrap">
                                    <span className="probootstrap-price">$99.99</span>
                                    <span className="probootstrap-price-per-month">per month</span>
                                </div>
                                <ul>
                                    <li>Unlimtted invoices</li>
                                    <li>Custom scripting &amp; scheduling</li>
                                    <li>Payment &amp; accounting software integration</li>
                                </ul>
                                  <button className='btn__buy__coures'>
                                    Start Free Trial
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* END row */}
                    <div className="row mb50">
                        <div className="col-md-12 section-heading text-center">
                            <h2>Frequently Ask Question</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>What is sublime?</h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <h3>Can I use this template?</h3>
                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            <h3>What is the license?</h3>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        </div>
                        <div className="col-md-6">
                            <h3>Is it free?</h3>
                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            <h3>Do you do a custom work?</h3>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* END: section */}

        </div>
    )
}

export default CoursePage