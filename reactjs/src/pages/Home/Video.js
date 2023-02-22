import classNames from "classnames/bind";
import styles from './Home.module.scss';
import ReactPlayer from 'react-player';
import ActionItem from './ActionItem';
import { VideoLikeIcon, VideoMessageIcon, VideoShareIcon, VideoLikedIcon } from '~/components/Icons';
import { Share } from '~/components/Popper';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeVideo, setVideoDetail } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Video({ data, video }) {
    const [like, setLike] = useState(false);
    const [countLike, setCountLike] = useState(0);
    const [videoId, setVideoId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (videoId === data.id) {
            setLike(!like);
            setCountLike(like ? countLike - 1 : countLike + 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.message])

    useEffect(() => {
        setLike(data.likes.length ? true : false);
        setCountLike(data.likes_count);
    }, [data])

    const handleClick = async () => {
        dispatch(likeVideo({video_id: data.id}));
        setVideoId(data.id)
    }

    const handleVideoDetail = () => {
        window.history.replaceState(null, "", '/@' + data.user.nickname + '/video/' + data.id)
        dispatch(setVideoDetail(data));
    }

    return (
        <div className={cx('video-wrapper')}>
            <div 
                className={cx('video-container')} 
                onClick={handleVideoDetail}
            >
                <ReactPlayer
                    className={cx('video')}
                    url={data.url}
                    controls={true}
                />
            </div>
            <div className={cx('action-item')}>
                <ActionItem text={countLike} onClick={handleClick} >
                    { like ? <VideoLikedIcon /> : <VideoLikeIcon/> }
                </ActionItem>
                <ActionItem
                    text={805}
                    onClick={handleVideoDetail}
                >
                    <VideoMessageIcon />
                </ActionItem>
                <Share>
                    <ActionItem text={1054}><VideoShareIcon /></ActionItem>
                </Share>
            </div>
        </div>
    );
}

export default Video;