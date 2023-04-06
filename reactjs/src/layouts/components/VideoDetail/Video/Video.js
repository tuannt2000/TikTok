import classNames from "classnames/bind";
import styles from './Video.module.scss';
import Main from "./Main";
import { 
    PlayVideoIcon, CloseVideoIcon, VoiceControlOnIcon,
    PrevVideoIcon, NextVideoIcon, ReportVideoIcon
} from "~/components/Icons";
import { useDispatch } from "react-redux";
import { setVideoDetail } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Video({ video }) {
    const dispatch = useDispatch();

    const handleHideVideoDetail = () => {
        window.history.replaceState(null, "", '/')
        dispatch(setVideoDetail({}));
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
            <button className={cx('switch-video-prev')}><PrevVideoIcon /></button>
            <button className={cx('switch-video-next')}><NextVideoIcon /></button>
            <div className={cx('div-report-text')}>
                <ReportVideoIcon className={cx('report-video-icon')} />
                Báo cáo
            </div>
        </div>
    );
}

export default Video;