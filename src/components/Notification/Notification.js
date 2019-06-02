import React, {useEffect, useState} from 'react'
import './Notification.css'

const Notification = ({isStandAlone}) => {
    let [prompt, setPrompt] = useState(null)
    const [msg, setMessage] = useState("")
    const installClickHandler = () => {
        prompt.prompt()
        prompt.userChoice.then(function(choiceResult){
                console.log(choiceResult.outcome);
                if(choiceResult.outcome === 'dismissed'){
                    console.log('User cancelled home screen install');
                }else{
                    console.log('User added to home screen');
                    setMessage("")
                }
        });
    }
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            setPrompt(e);
            setMessage("Add to Home Screen".toLocaleUpperCase())
        })
    }, [])
    const renderMessage = () => {
        if(!isStandAlone && msg){
            return (
                <div className="notificationWrapper">
                    <button className="btn btn-Install" onClick={() => {installClickHandler()}}>{msg}</button>
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