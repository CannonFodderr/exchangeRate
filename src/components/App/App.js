import React, {useState} from 'react'
import Grid from '../Grid/Grid'
import './App.css'

const App = () => {
    const [base, setBase] = useState("USD")
    const [date, setDate] = useState(null)
    const handleNewDate = newDate => {
        if(newDate === date) return
        setDate(newDate)
    }
    const handleNewBase =newBase => {
        if(newBase === base) return
        setBase(newBase)
    }
    return(
        <>
            <div className="AppContainer">
            <h1 style={{textAlign: "center"}}>Exchange Rate {base}</h1>
            <h2 style={{textAlign: "center"}}>Updated: {date}</h2>
            <Grid base={base} handleNewDate={handleNewDate} handleNewBase={handleNewBase}/>
            </div>
        </>
    )
}

export default App