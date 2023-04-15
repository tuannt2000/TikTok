import classNames from "classnames/bind";
import styles from './Video.module.scss';
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function Main({ video, play }) {
    const videoRef = useRef();

    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.pause();
    }, [play]);

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('div-container')}>
                <img src={video.cover_image} className={cx('img-poster')} alt="" />
                <div className={cx('div-basic-player-wrapper')}>
                    <div className={cx('video-playing')}>
                        <video loop ref={videoRef} autoPlay src={video.url}></video>
                    </div>
                </div>
            </div>
            <div className={cx('video-control-container')}>

            </div>
            <div className={cx('video-control-top')}></div>
            <div className={cx('video-control-bottom')}></div>
        </div>
    );
}

export default Main;