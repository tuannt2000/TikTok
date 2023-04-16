import classNames from "classnames/bind";
import styles from './Video.module.scss';
import { useRef, useState } from "react";
import { 
    VoiceControlOnIcon, VoiceControlOffIcon
} from "~/components/Icons";

const cx = classNames.bind(styles);

const Voice = ({ videoRef }) => {
    const [toggleVolume, setToggleVolume] = useState(true);
    const [showVolume, setShowVolume]     = useState(false);
    const [mouseDown, setMouseDown]       = useState(false);

    const volumeCirCleRef = useRef();
    const volumeBarRef    = useRef();

    const handleDrag = (e) => {
        if (mouseDown) {
            handleAdjustVideo(e)
        }
    }

    const handleAdjustVideo = (e) => {
        const rect = e.target.getBoundingClientRect();
        const y = e.clientY - rect.top;  // クリック時のマウス位置
        const heightProgess = e.target.offsetHeight;
        let currentY = heightProgess - y;
        if (currentY <= 5) {
            currentY = 5;
        } else if (currentY >= 76) {
            currentY = 76;
        }
        volumeCirCleRef.current.style.transform = "translateY(-" + currentY + "px)";
        volumeBarRef.current.style.transform  = "scaleY(" + (currentY/heightProgess).toFixed(4) + ")";
        videoRef.current.volume = (currentY/heightProgess).toFixed(4);
        if (videoRef.current.volume < 0.1) {
            videoRef.current.volume = 0;
            setToggleVolume(false);
        } else {
            setToggleVolume(true);
        }
    }

    const handleToggleVoice = (e) => {
        e.stopPropagation();
        if (toggleVolume) {
            videoRef.current.volume = 0;
            volumeCirCleRef.current.style.transform = "translateY(-" + 5 + "px)";
            volumeBarRef.current.style.transform  = "scaleY(" + 0 + ")";
        } else {
            videoRef.current.volume = 0.2;
            volumeCirCleRef.current.style.transform = "translateY(-" + 17 + "px)";
            volumeBarRef.current.style.transform  = "scaleY(" + 0.2 + ")";
        }
        setToggleVolume(!toggleVolume);
    }

    return (
        <div
            className={cx("video-voice-control")}
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
        >
            {showVolume && (
                <div
                    className={cx("volume-control-container")}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div 
                        className={cx("volume-control-progess")}
                        onClick={handleAdjustVideo}
                        onMouseDown={() => setMouseDown(true)}
                        onMouseUp={() => setMouseDown(false)}
                        onMouseMove={handleDrag}
                        onMouseLeave={() => setMouseDown(false)}
                    ></div>
                    <div
                        ref={volumeCirCleRef}
                        className={cx("volume-control-cicle")}
                        style={{ transform: "translateY(-" + (toggleVolume ? 17 : 5) + "px)" }}

                    ></div>
                    <div
                        ref={volumeBarRef}
                        className={cx("volume-control-bar")}
                        style={{ transform: "scaleY(" + (toggleVolume ? 0.2 : 0) + ")" }}
                    ></div>
                </div>
            )}
            <button
                className={cx("button-voice-control")}
                onClick={handleToggleVoice}
            >
                {toggleVolume ? <VoiceControlOnIcon /> : <VoiceControlOffIcon />}
            </button>
        </div>
    );
};

export default Voice;
