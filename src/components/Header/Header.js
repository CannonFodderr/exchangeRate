import React from 'react'

const Header = ({base, date}) => {
    return(
        <>
            <h1 style={{textAlign: "center"}}>{base} Exchange Rate </h1>
            <h4 style={{textAlign: "center"}}>UPDATED: {date}</h4>
        </>
    )
}

export default Header