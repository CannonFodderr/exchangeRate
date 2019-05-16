import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="FooterWrapper">
                <p>Fork me on <a 
                className="FooterLink"
                target="__blank" 
                href="https://github.com/CannonFodderr/exchangeRate"
                >GitHub</a></p>
                <p>Create with <span className="FooterIcon">♥</span> by <a 
                className="FooterLink"
                target="__blank" 
                href="https://www.linkedin.com/in/idan-izhaki/"
                >Idan Izhaki</a></p>
                
            </div>
        </>
    )
}

export default Footer