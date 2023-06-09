import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import { PlayVideoIcon } from "~/components/Icons";
import { useDispatch } from "react-redux";
import { getVideoById } from "~/redux/actions/video";

const cx = classNames.bind(styles);

function Video({ video, me }) {
    const dispatch = useDispatch();

    const handleVideoDetail = () => {
        window.history.replaceState(null, "", '/@' + video.user.nickname + '/video/' + video.id)
        dispatch(getVideoById(video.id));
    }

    return (
        <div 
            className={cx('div-video-container', {'me': me})}
            onClick={handleVideoDetail}
        >
            <div 
                className={cx('div-video-wrapper')}
                style={{
                    backgroundImage: `url(${video.cover_image})`
                }}
            >
                <PlayVideoIcon width="3.2rem" height="3.2rem" className={cx('play-video-icon')} />
                <div className={cx('div-author-outside-container')}>
                    <div className={cx('div-author-inner-container')}>
                        <span className={cx('span-avatar-container')}>
                            <img src={video.user.avatar} alt="" />
                        </span>
                        <p className={cx('p-nickname')}>
                            {video.user.full_name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;