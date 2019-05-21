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
    const renderSingleItem = (item, num, favFunc, className) => {
        return (
            <div 
                className={className} 
                key={item}
                >
                    <button className="btn FavIcon selected" onClick={() => favFunc(item)}>★</button> 
                    <span className="ItemDetails" onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleNewBase(item)
                }}><div>{item} {num}</div></span>
                <img 
                className="clipboard" 
                src="./clipboard.png" 
                alt="copy to clipboard" 
                onClick={() => handleClipboard(num)}
                />
                </div>
        )
    }
    const renderFavItems = () => {
        if(!exRatesData || !favs || favs.length < 1) return null
        return favs.map((item) => {
            const className = item === base ? "gridItem fav currentBase" : "gridItem fav"
            let num = parseFloat(exRatesData.rates[item] * sum * 100 / 100).toFixed(4);
            if(item === base) num = sum
            return (
                <>
                    {renderSingleItem(item, num, removeFav, className)}
                </>
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
                <>
                    {renderSingleItem(item, num, addFav, className)}
                </>
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
        const className = filterFavs ? "FavIcon selected" : "FavIcon"

        return (
            <button className="btn"
                onClick={handleFilterFavs}
            ><span className={className}>★</span></button>
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
    const renderInput = () => {
        return (
            <input 
                style={{fontSize:"1.2rem", width: "100%"}}
                type="number" 
                min={0} 
                value={sum}
                autoFocus
                className="inputSum"
                placeholder="Sum"
                onChange={(e) => handleNewSum(e.target.value)}/>
        )
    }
    return(
        <>
            <div className="ControlsWrapper">
            {renderFilterFavBtn()}
            {renderInput()}
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