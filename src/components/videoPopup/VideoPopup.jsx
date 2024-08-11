import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { FaTimes } from "react-icons/fa";
import './style.scss'
const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopUp = () => {
        setShow(false);
        setVideoId(null);
    }
    return (
        <div className={`videoPopup ${show ? "visible" : "Not Available"}`}>
            <div className='opacityLayer' onClick={hidePopUp}></div>
            <div className='videoPlayer'>
                <span className='closeBtn' onClick={hidePopUp}> 
               <FaTimes/>
                </span>



                <ReactPlayer
                    className='react-player'
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width='100%'
                    height='100%'
                />

            </div>
        </div>
    )
}

export default VideoPopup
