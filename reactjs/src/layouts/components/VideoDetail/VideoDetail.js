import classNames from "classnames/bind";
import Content from "./Content";
import Video from "./Video";
import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

function VideoDetail({ video }) {

    return (
        <div className={cx('video-detail-wrapper')}>
            <Video video={video} />
            <Content video={video} />
        </div>
    );
}

export default VideoDetail;