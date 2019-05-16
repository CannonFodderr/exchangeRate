import React, {useEffect, useState} from 'react'
import BaseSelector from '../BaseSelector/BaseSelector'
import Spinner from '../Spinner/Spinner'
import api from '../../api/api'
import './Grid.css'

const INITIAL_FAVS = ["ILS", "USD", "EUR", "GBP", "JPY"]

const Grid = ({base, handleNewDate, handleNewBase}) => {
    const [exRatesData, setExRatesData] = useState(null)
    const [favs, setFavs] = useState(INITIAL_FAVS)
    const [filterFavs, setFilterFavs] = useState(false)
    const addFav = name => {
        setFavs([...favs, name])
    }
    const removeFav = name => {
        const newFavs = favs.filter(fav => fav !== name)
        setFavs(newFavs)
    }
    const requestApiUpdate = () => {
        console.log("Requesting new data...")
        api.get("?base=" + base)
        .then(res => {
            setExRatesData(res.data)
            handleNewDate(res.data.date)
        })
        .catch(err => console.error(err))
    }
    const renderFavItems = () => {
        if(!exRatesData || !favs || favs.length < 1) return null
        return favs.map((item) => {
            if(item === base) return null
            let num = parseFloat(Math.round(exRatesData.rates[item] * 100) / 100).toFixed(2);
            return (
                <div 
                className="gridItem fav" 
                key={item}
                onClick={() => removeFav(item)}
                >
                    <p><span className="FavIcon">★</span> {item}: {num}</p>
                </div>
            )
        })
    }
    const renderGridItems = () => {
        if(filterFavs) return null;
        if(!exRatesData) return <h4>No data available...</h4>
        const ratesKeys = Object.keys(exRatesData.rates);
        return ratesKeys.map((item) => {
            if(item === base) return null
            if(favs.indexOf(item) >= 0) return null
            let num = parseFloat(Math.round(exRatesData.rates[item] * 100) / 100).toFixed(2);
            return (
                <div 
                className="gridItem" 
                key={item}
                onClick={() => addFav(item)}
                >
                    <p>{item}: {num}</p>
                </div>
            )
        })
    }
    const renderGridSpinner = () => {
        if(!exRatesData || !exRatesData.rates ) return <Spinner />
    }
    const renderBaseSelector = () => {
        if(!exRatesData || !exRatesData.rates ) return null
        return <BaseSelector currentBase={base} options={Object.keys(exRatesData.rates)} handleNewBase={handleNewBase}/>
    }
    const handleFilterFavs = () => {
        const filterState = !filterFavs
        setFilterFavs(filterState)
    }
    useEffect(() => {
        api.get("?base=" + base)
        .then(res => {
            setExRatesData(res.data)
            handleNewDate(res.data.date)
        })
        .catch(err => console.error(err))
    }, [base, handleNewDate])
    const debounceClick = (func, delay) => {
        let timer
        return () => {
            if(exRatesData !== null){
                setExRatesData(null)
            }
            clearTimeout(timer)
            timer = setTimeout(() => {
                func()
            }, delay)
        }
    }
    const handleClick = debounceClick(requestApiUpdate, 2000)
    const renderFilterFavBtn = () => {
        const icon = !filterFavs ? "⭐" : "✗"
        return (
            <button
                className="btn"
                onClick={handleFilterFavs}
            ><span className="FavIcon">{icon}</span></button>
        )
    }
    return(
        <>
            <div className="ControlsWrapper">
                {renderFilterFavBtn()}
                {renderBaseSelector()}
                <button 
                className="btn btn-update"
                onClick={() => handleClick()}
                >UPDATE RATES</button>
            </div>
            
            <div className="CurrenciesGrid">
                {renderFavItems()}
                {renderGridItems()}
            </div>
            {renderGridSpinner()}
        </>
    )
}

export default Grid