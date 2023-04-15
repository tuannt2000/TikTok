import classNames from "classnames/bind";
import styles from './Video.module.scss';
import Main from "./Main";
import { 
    PlayVideoIcon, CloseVideoIcon, VoiceControlOnIcon,
    PrevVideoIcon, NextVideoIcon, ReportVideoIcon
} from "~/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setVideoDetail } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Video({ video }) {
    const listVideoDetail = useSelector(state => state.video.list_video_detail);
    const dispatch = useDispatch();

    const handleHideVideoDetail = () => {
        window.history.replaceState(null, "", '/')
        dispatch(setVideoDetail({}));
    }

    const handleNextVideo = (next = true) => {
        const currentVideoIndex = listVideoDetail.findIndex(element => {
            return element.id === video.id;
        });

        const nextVideoIndex = next ? currentVideoIndex + 1 : currentVideoIndex - 1;

        dispatch(setVideoDetail(listVideoDetail[nextVideoIndex]));
    }

    return (
        <div className={cx('video-container')}>
            <div 
                className={cx('video-background')}
                style={{
                    backgroundImage: `url(${video.cover_image})`
                }}
            ></div>
            <Main video={video} />
            <PlayVideoIcon className={cx('video-play-icon')} />
            <button className={cx('video-close-icon')} onClick={handleHideVideoDetail}>
                <CloseVideoIcon width="1.8rem" height="1.8rem" />
            </button>
            <div className={cx('video-voice-control')}>
                <button className={cx('button-voice-control')}>
                    <VoiceControlOnIcon />
                </button>
            </div>
            {listVideoDetail[0].id !== video.id && <button className={cx('switch-video-prev')} onClick={() => handleNextVideo(false)}><PrevVideoIcon /></button>}
            {listVideoDetail[listVideoDetail.length - 1].id !== video.id && <button className={cx('switch-video-next')} onClick={() => handleNextVideo()}><NextVideoIcon /></button>}
            <div className={cx('div-report-text')}>
                <ReportVideoIcon className={cx('report-video-icon')} />
                Báo cáo
            </div>
        </div>
    );
}

export default Video;