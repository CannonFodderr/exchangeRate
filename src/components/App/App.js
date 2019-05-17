import React, {useState} from 'react'
import Grid from '../Grid/Grid'
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {
    const INITITAL_DATE = !JSON.parse(localStorage.getItem('exRatesData')) ? null : JSON.parse(localStorage.getItem('exRatesData')).date
    const [base, setBase] = useState(localStorage.getItem("base") || "USD")
    const [date, setDate] = useState(INITITAL_DATE)
    const handleNewDate = newDate => {
        if(newDate === date) return
        setDate(newDate)
    }
    const handleNewBase = newBase => {
        if(newBase === base) return
        localStorage.setItem("base", newBase)
        setBase(newBase)
    }
    return(
        <>
            <div className="AppContainer">
            <h1 style={{textAlign: "center"}}>{base} Exchange Rate </h1>
            <h4 style={{textAlign: "center"}}>Updated: {date}</h4>
            <Grid base={base} handleNewDate={handleNewDate} handleNewBase={handleNewBase} date={date}/>
            <Footer />
            </div>
        </>
    )
}

export default App