import React, {useState} from 'react'
import Spinner from '../Spinner/Spinner'
import './Grid.css'
import copy from 'copy-to-clipboard'


const INITIAL_SUM = localStorage.getItem('sum') || 1;

const Grid = ({base, handleNewBase, exRatesData, favs, addFav, removeFav}) => {
    const [filterFavs, setFilterFavs] = useState(true)
    const [sum, setSum] = useState(INITIAL_SUM)
    const handleClipboard = (num) => {
        copy(num)
        alert("Copied to clipboard")
    }
    const renderFavItems = () => {
        if(!exRatesData || !favs || favs.length < 1) return null
        return favs.map((item) => {
            const className = item === base ? "gridItem fav currentBase" : "gridItem fav"
            let num = parseFloat(exRatesData.rates[item] * sum * 100 / 100).toFixed(4);
            if(item === base) num = sum
            return (
                <div 
                className={className} 
                key={item}
                >
                    <button className="btn FavIcon selected" onClick={() => removeFav(item)}>★</button> 
                    <span className="ItemDetails" onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleNewBase(item)
                }}><div>{item} {num}</div></span>
                <button className="btn clipboard"
                onClick={() => handleClipboard(num)}><span aria-label="clipboard" role="img">📋</span></button>
                </div>
            )
        })
    }
    const renderGridItems = () => {
        if(filterFavs) return null;
        if(!exRatesData) return <h4>No data available...</h4>
        const ratesKeys = Object.keys(exRatesData.rates);
        return ratesKeys.map((item) => {
            const className = item === base ? "gridItem currentBase" : "gridItem"
            if(favs.indexOf(item) >= 0) return null
            let num = parseFloat(exRatesData.rates[item] * sum * 100 / 100).toFixed(4);
            return (
                <div 
                className={className} 
                key={item}
                >
                    <button className="btn FavIcon" onClick={() => addFav(item)}>★</button>
                    <div className="ItemDetails" onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleNewBase(item)
                }}>{item}: {num}</div>
                <button className="btn clipboard"
                onClick={(e) => handleClipboard(num)}><span role="img" aria-label="clipboard">📋</span></button>
                </div>
            )
        })
    }
    const renderGridSpinner = () => {
        if(!exRatesData || !exRatesData.rates ) return <Spinner />
    }
    const handleFilterFavs = () => {
        const filterState = !filterFavs
        setFilterFavs(filterState)
    }
    const renderFilterFavBtn = () => {
        const icon = !filterFavs ? "⭐" : "❖"
        return (
            <button
                className="btn"
                onClick={handleFilterFavs}
            ><span className="FavIcon">{icon}</span></button>
        )
    }
    const handleNewSum = newSum => {
        if(newSum < 0) {
            setSum(0)
        } else {
            localStorage.setItem('sum', newSum)
            setSum(newSum)
        }
    }
    return(
        <>
            <div className="ControlsWrapper">
            {renderFilterFavBtn()}
                <input 
                style={{fontSize:"1.2rem", width: "100%"}}
                type="number" 
                min={0} 
                value={sum}
                autoFocus
                className="btn"
                placeholder="Sum"
                onChange={(e) => handleNewSum(e.target.value)}/>
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