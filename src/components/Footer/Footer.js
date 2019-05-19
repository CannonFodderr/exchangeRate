import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="FooterWrapper">
                <p>Created with <span className="FooterIcon">♥</span> by <a 
                className="FooterLink"
                target="__blank" 
                href="https://github.com/CannonFodderr/exchangeRate"
                >Idan Izhaki</a></p>
                <p>Rates published by the <a 
                className="FooterLink"
                target="__blank" 
                href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html">European Central Bank</a></p>
            </div>
        </>
    )
}

export default Footer