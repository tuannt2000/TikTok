import classNames from "classnames/bind";
import styles from './Video.module.scss';
import Main from "./Main";
import { 
    PlayVideoIcon, CloseVideoIcon,
    PrevVideoIcon, NextVideoIcon, ReportVideoIcon,
} from "~/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setListVideoDetail, setVideoDetail } from '~/redux/actions/video';
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Voice from "./Voice";

const cx = classNames.bind(styles);

function Video({ video }) {
    const [play, setPlay] = useState(true);
    const listVideoDetail = useSelector(state => state.video.list_video_detail);
    const dispatch = useDispatch();
    const location = useLocation();

    const videoRef = useRef();

    useEffect(() => {
        if (videoRef) {
            videoRef.current.volume = 0.2;
        }
    }, [videoRef, video])

    const handleHideVideoDetail = () => {
        window.history.replaceState(null, "", location.pathname)
        dispatch(setListVideoDetail({
                list_video_detail: [],
                data: {}
            })
        );
    }

    const handleNextVideo = (e, next = true) => {
        e.stopPropagation();
        setPlay(true);
        const currentVideoIndex = listVideoDetail.findIndex(element => {
            return element.id === video.id;
        });

        const nextVideoIndex = next ? currentVideoIndex + 1 : currentVideoIndex - 1;

        dispatch(setVideoDetail(listVideoDetail[nextVideoIndex]));
    }

    return (
        <div className={cx('video-container')} onClick={() => setPlay(!play)}>
            <div 
                className={cx('video-background')}
                style={{
                    backgroundImage: `url(${video.cover_image})`
                }}
            ></div>
            <Main ref={videoRef} play={play} video={video} />
            {play || <PlayVideoIcon className={cx('video-play-icon')} />}
            <button className={cx('video-close-icon')} onClick={handleHideVideoDetail}>
                <CloseVideoIcon width="1.8rem" height="1.8rem" />
            </button>
            <Voice videoRef={videoRef} />
            {listVideoDetail[0].id !== video.id && (
                <button 
                    className={cx('switch-video-prev')} 
                    onClick={(e) => handleNextVideo(e, false)}
                >
                    <PrevVideoIcon />
                </button>
            )}
            {listVideoDetail[listVideoDetail.length - 1].id !== video.id && (
                <button 
                    className={cx('switch-video-next')} 
                    onClick={(e) => handleNextVideo(e)}
                >
                    <NextVideoIcon />
                </button>
            )}
            <div className={cx('div-report-text')}>
                <ReportVideoIcon className={cx('report-video-icon')} />
                Báo cáo
            </div>
        </div>
    );
}

export default Video;