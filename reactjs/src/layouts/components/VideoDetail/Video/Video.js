import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';

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
        </div>
    );
}

export default Video;