import classNames from "classnames/bind";
import styles from './Home.module.scss';
import ReactPlayer from 'react-player';
import ActionItem from './ActionItem';
import { VideoLikeIcon, VideoMessageIcon, VideoShareIcon, VideoLikedIcon } from '~/components/Icons';
import { Share } from '~/components/Popper';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Video({ data, video }) {
    const [like, setLike] = useState(data.likes.length ? true : false);
    const [countLike, setCountLike] = useState(data.likes_count);
    const dispatch = useDispatch();

    useEffect(() => {
        setLike(!like);
        setCountLike(like ? countLike - 1 : countLike + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.message])

    const handleClick = async () => {
        dispatch(likeVideo({video_id: data.id}));
    }

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
                <ActionItem text={countLike} onClick={handleClick} >{ like ? <VideoLikedIcon /> : <VideoLikeIcon/> }</ActionItem>
                <ActionItem text={805}><VideoMessageIcon /></ActionItem>
                <Share>
                    <ActionItem text={1054}><VideoShareIcon /></ActionItem>
                </Share>
            </div>
        </div>
    );
}

export default Video;