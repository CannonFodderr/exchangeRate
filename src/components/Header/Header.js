import React from 'react'
import './Header.css'
const Header = ({base, date, clearStorageData}) => {
    
    return(
        <>
            <h1 style={{textAlign: "center"}}>{base} Exchange Rate</h1>
            <h4 className="date" style={{textAlign: "center"}}>
                <button className="refreshBTN" onClick={clearStorageData}>
                <img className="refreshImg" src="./reload.png" alt="refresh data icon"/>
                </button>
                <div>
                UPDATED: {date}
                </div>
            </h4>
        </>
    )
}

export default Header