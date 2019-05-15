import React from 'react'
import './BaseSelector.css'

const BaseSelector = ({currentBase, options, handleNewBase}) => {
    const renderBaseOptions = () => {
        return options.map((option, index) => {
            if(option === currentBase) return null
            return <option 
            key={index}
            name={option}
            className="BaseSelectorOption"
            >{option}</option>
        })
    }

    return(
        <select onChange={(e) => handleNewBase(e.target.value)} className="BaseSelector">
            <option key="selectedBase">{currentBase}</option>
            {renderBaseOptions()}
        </select>
    )
}

export default BaseSelector