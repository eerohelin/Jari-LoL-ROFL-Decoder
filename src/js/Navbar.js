import React from 'react';
import '../css/Navbar.css'

function Navbar() {

    let root = document.documentElement;

    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (currentScrollPos >= 300) {
            root.style.setProperty('--nav-opacity', 1)
        } else {
            root.style.setProperty('--nav-opacity', 0)
        }
    }

    return (
    <nav>
        <div id="nav-container">
            <div id="nav-title-wrapper" className="hidden-nav">
                <p>Jari</p>
            </div>

            <div id="links-container">
                <p>Links</p>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;