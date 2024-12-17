export const Footer = () => {
    return <footer className="footer" id="footer">
        <div className="container">
            <div className="columns">
                <div className="column is-4">
                    <h4>Mede mogelijk gemaakt door</h4>
                    <div className="sponsors">
                        <a href="https://www.schiedam.nl/a-tot-z/750-jaar-schiedam" target="_blank" rel="noopener noreferrer">
                            <img src="/app/uploads/2024/06/sponsor_schiedam.png" sizes="(min-width: 1216px) 140px, 100px" loading="lazy" alt="sponsor_schiedam" className="lazyloaded" />
                        </a>
                        <a href="https://fondssv.nl" target="_blank" rel="noopener noreferrer">
                            <img src="/app/uploads/2024/06/fondssv.png" sizes="(min-width: 1216px) 140px, 100px" loading="lazy" alt="fondssv" className="lazyloaded" />
                        </a>
                        <a href="https://www.degrootfonds.nl" target="_blank" rel="noopener noreferrer">
                            <img src="/app/uploads/2024/06/de_groot_fonds.png" sizes="(min-width: 1216px) 140px, 100px" loading="lazy" alt="de_groot_fonds" className="lazyloaded" />
                        </a>
                    </div>
                </div>
                <div className="column adres">
                    <p>
                        <span className="has-text-yellow">Pand750</span><br />
                        Bezoek: Hoogstraat 144<br />
                        Post: Hoogstraat 140<br />
                        woensdag 13:00 – 15:00<br />
                        donderdag 10:00 – 12:00
                    </p>
                    <a href="mailto:info@schiedamviert750.nl">info@schiedamviert750.nl</a>
                </div>
                <div className="column">
                    <nav className="nav nav--footer" aria-label="Footermenu">
                        <ul className="nav__list">
                            <li className="nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2 current_page_item menu-item-66">
                                <a className="nav__link" href="https://schiedamviert750.nl/">S’dam viert 750</a>
                            </li>
                            <li className="nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-64">
                                <a className="nav__link" href="https://schiedamviert750.nl/privacybeleid/">Privacybeleid</a>
                            </li>
                            <li className="nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-65">
                                <a className="nav__link" href="https://schiedamviert750.nl/over-750/">Doe mee</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="column has-text-right is-narrow">
                    <nav className="nav--social" aria-label="Social media">
                        <ul>
                            <li className="nav__item">
                                <a className="nav__link nav__link--facebook" role="button" aria-label="Facebook" href="https://www.facebook.com/schiedamviert750" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link nav__link--instagram" role="button" aria-label="Instagram" href="https://www.instagram.com/schiedamviert750" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link nav__link--youtube" role="button" aria-label="Youtube" href="https://www.youtube.com/@Schiedamviert750" target="_blank" rel="noopener noreferrer">
                                    Youtube
                                </a>
                            </li>
                            <li className="nav__item">
                                <a className="nav__link nav__link--linkedin" role="button" aria-label="LinkedIn" href="https://www.linkedin.com/company/schiedam-viert-750" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </footer>
}