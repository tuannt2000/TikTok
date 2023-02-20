import classNames from "classnames/bind";
import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

function VideoDetail() {

    return (
        <div className={cx('video-wrapper')}>
            Đây là video detail
        </div>
    );
}

export default VideoDetail;