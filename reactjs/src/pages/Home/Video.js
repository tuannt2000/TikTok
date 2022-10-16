import classNames from "classnames/bind";
import styles from './Home.module.scss';
import ReactPlayer from 'react-player';
import ActionItem from './ActionItem';
import { VideoLikeIcon, VideoMessageIcon, VideoShareIcon } from '~/components/Icons';
import { Share } from '~/components/Popper';

const cx = classNames.bind(styles);

function Video({data}) {
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container')}>
                <ReactPlayer
                    className={cx('video')}
                    url={data.url}
                    controls={true}
                />
            </div>
            <div className={cx('action-item')}>
                <ActionItem text='247K'><VideoLikeIcon /></ActionItem>
                <ActionItem text='805'><VideoMessageIcon /></ActionItem>
                <Share>
                    <ActionItem text='1054'><VideoShareIcon /></ActionItem>
                </Share>
            </div>
        </div>
    );
}

export default Video;