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
            <>
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
                </>
        )
    }
    const renderFavItems = () => {
        if(!exRatesData || !exRatesData[base] || !favs || favs.length < 1) return <Spinner />
        return favs.map((item) => {
            const className = item === base ? "gridItem fav currentBase" : "gridItem fav"
            let num = parseFloat(exRatesData[base][item] * sum * 100 / 100).toFixed(4);
            if(item === base) num = sum
            return (
                <div key={item} className={className}>
                    {renderSingleItem(item, num, removeFav, className)}
                </div>
            )
        })
    }
    const renderGridItems = () => {
        if(filterFavs) return null;
        if(!exRatesData || !exRatesData[base]) return null
        const ratesKeys = Object.keys(exRatesData[base]);
        return ratesKeys.map((item) => {
            const className = item === base ? "gridItem currentBase" : "gridItem"
            if(favs.indexOf(item) >= 0) return null
            let num = parseFloat(exRatesData[base][item] * sum * 100 / 100).toFixed(4);
            return (
                <div key={item} className={className}>
                    {renderSingleItem(item, num, addFav)}
                </div>
            )
        })
    }
    const renderGridSpinner = () => {
        if(!exRatesData ) return <Spinner />
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