import classNames from "classnames/bind";
import styles from './Video.module.scss';
import Main from "./Main";
import { 
    PlayVideoIcon, CloseVideoIcon, VoiceControlOnIcon,
    PrevVideoIcon, NextVideoIcon
} from "~/components/Icons";

const cx = classNames.bind(styles);

function Video({ video }) {
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
            <button className={cx('video-close-icon')}>
                <CloseVideoIcon width="1.8rem" height="1.8rem" />
            </button>
            <div className={cx('video-voice-control')}>
                <button className={cx('button-voice-control')}>
                    <VoiceControlOnIcon />
                </button>
            </div>
            <button className={cx('switch-video-prev')}><PrevVideoIcon /></button>
            <button className={cx('switch-video-next')}><NextVideoIcon /></button>
        </div>
    );
}

export default Video;