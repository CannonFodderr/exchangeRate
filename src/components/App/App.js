import React, {useState, useEffect} from 'react'
import Grid from '../Grid/Grid'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './App.css'
import api from '../../api/api'

const INITIAL_DATA = JSON.parse(localStorage.getItem('exRatesData')) || null
const INITIAL_FAVS = JSON.parse(localStorage.getItem('favs')) || ["ILS", "USD", "EUR", "GBP", "JPY"]

const App = () => {
    const INITITAL_DATE = !JSON.parse(localStorage.getItem('exRatesData')) ? null : JSON.parse(localStorage.getItem('exRatesData')).date
    const [base, setBase] = useState(localStorage.getItem("base") || "USD")
    const [date, setDate] = useState(INITITAL_DATE)
    const [exRatesData, setExRatesData] = useState(INITIAL_DATA)
    const [favs, setFavs] = useState(INITIAL_FAVS)
    const handleNewBase = newBase => {
        if(newBase === base) return
        localStorage.setItem("base", newBase)
        setBase(newBase)
    }
    const addFav = name => {
        const newFavs = [...favs, name]
        localStorage.setItem('favs', JSON.stringify(newFavs))
        setFavs(newFavs)
    }
    const removeFav = name => {
        const newFavs = favs.filter(fav => fav !== name)
        localStorage.setItem('favs', JSON.stringify(newFavs))
        setFavs(newFavs)
    }
    useEffect(() => {
        if(exRatesData && JSON.parse(localStorage.getItem('exRatesData')).base === base) {
            console.log("Local Data loaded")
        } else {
            setExRatesData(null)
            let timer = setTimeout(() => {
                api.get("?base=" + base)
                .then(res => {
                    console.log("Got API response on mount")
                    localStorage.setItem('exRatesData', JSON.stringify(res.data))
                    setExRatesData(res.data)
                    setDate(res.data.date)
                })
                .catch(err => console.error(err))
            }, 1000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [base, date, exRatesData])
    return(
        <>
            <div className="AppContainer">
            <Header base={base} date={date}/>
            <Grid 
            base={base} 
            handleNewBase={handleNewBase} 
            date={date}
            exRatesData={exRatesData}
            favs={favs}
            addFav={addFav}
            removeFav={removeFav}
            />
            <Footer />
            </div>
        </>
    )
}

export default App