import React, {useEffect, useState} from 'react'
import './Notification.css'

const Notification = ({msg, isStandAlone}) => {
    let [prompt, setPrompt] = useState(null)
    const installClickHandler = () => {
        prompt.prompt()
        prompt.userChoice.then(function(choiceResult){
                console.log(choiceResult.outcome);
                if(choiceResult.outcome === 'dismissed'){
                    console.log('User cancelled home screen install');
                }else{
                    console.log('User added to home screen');
                }
        });
    }
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            setPrompt(e);
        })
    }, [])
    const renderMessage = () => {
        if(!isStandAlone && msg){
            return (
                <div className="notificationWrapper">
                    <div>{msg} <button className="btn btn-Install" onClick={() => {installClickHandler()}}>GET THE APP</button></div>
                </div>
            )
        }
        return null;
    }
    return (
        <>
            {renderMessage()}
        </>
    )
}

export default Notification