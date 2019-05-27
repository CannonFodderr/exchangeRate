import React, {useState, useEffect} from 'react'
import Grid from '../Grid/Grid'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Spinner from '../Spinner/Spinner';
import './App.css'
import api from '../../api/api'


const INITIAL_FAVS = JSON.parse(localStorage.getItem('favs')) || ["ILS", "USD", "EUR", "GBP", "JPY"]

const App = () => {
    const INITITAL_DATE = !JSON.parse(localStorage.getItem('exRatesData')) ? null : JSON.parse(localStorage.getItem('exRatesData')).date
    const [base, setBase] = useState(localStorage.getItem("base") || "USD")
    // const INITIAL_DATA = JSON.parse(localStorage.getItem(base)) || null
    const [date, setDate] = useState(INITITAL_DATE)
    const [exRatesData, setExRatesData] = useState({})
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
    const clearAPiData = () => {
        setExRatesData({})
    }
    useEffect(() => {
        if(exRatesData[base]) return
            let timer = setTimeout(() => {
                api.get("?base=" + base)
                .then(res => {
                    console.log("Got API response on mount")
                    const newData = {...exRatesData}
                    newData[res.data.base] = res.data.rates
                    // localStorage.setItem(base, JSON.stringify(res.data))
                    setDate(res.data.date)
                    setExRatesData(newData)
                })
                .catch(err => console.error(err))
            }, 1000)
            return () => {
                clearTimeout(timer)
            }
    }, [base, date, exRatesData])
    const renderContent = () => {
        if(!exRatesData) {
            return (
                <div className="AppContainer">
                <Header base={base} date="In Progress..." />
                <Spinner />
                </div>
            )
        }
        return (
            <div className="AppContainer">
            <Header base={base} date={date} clearAPiData={clearAPiData}/>
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
        )
    }
    return(
        <>
            {renderContent()}
        </>
    )
}

export default App