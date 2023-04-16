import classNames from "classnames/bind";
import Content from "./Content";
import Video from "./Video";
import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

function VideoDetail({ video }) {

    return (
        <div className={cx('video-detail-wrapper')}>
            {Object.keys(video).length && <Video video={video} />}
            {Object.keys(video).length && <Content video={video} />}
        </div>
    );
}

export default VideoDetail;