import classNames from "classnames/bind";
import styles from './Home.module.scss';
import ActionItem from './ActionItem';
import { 
    VideoLikeIcon, VideoMessageIcon, VideoShareIcon, 
    VideoLikedIcon, ReportVideoIcon 
} from '~/components/Icons';
import { Share } from '~/components/Popper';
import { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { likeVideo, setReportVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Video({ data, onClick }) {
    const [like, setLike] = useState(false);
    const [countLike, setCountLike] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setLike(data.likes.length ? true : false);
        setCountLike(data.likes_count);
    }, [data])

    const handleClick = () => {
        dispatch(likeVideo({video_id: data.id}));
        setLike(!like)
        setCountLike(prevState => {
            return like ? prevState - 1 : prevState + 1
        })
    }

    return (
        <div className={cx('video-wrapper')}>
            <div 
                className={cx('video-container')} 
                onClick={() => onClick(data)}
            >
                <canvas width="56.25" height="100" className={cx('canvas-video-card-placeholder')}></canvas>
                <div className={cx('video-player-container')}>
                    <div className={cx('tiktok-yf3ohr-DivContainer')}>
                        <img src={data.cover_image} className={cx('img-poster')} alt=""/>
                        <div className={cx('div-basic-player-wrapper')}>
                            <div className={cx('video-playing')}>
                                <video loop src={data.url}></video>
                            </div>
                        </div>
                    </div>
                    <div 
                        className={cx('div-report-text')}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setReportVideo(true));
                        }}
                    >
                        <ReportVideoIcon className={cx('report-video-icon')} />
                        Báo cáo
                    </div>
                </div>
            </div>
            <div className={cx('action-item')}>
                <ActionItem text={countLike} onClick={handleClick} >
                    { like ? <VideoLikedIcon /> : <VideoLikeIcon/> }
                </ActionItem>
                <ActionItem
                    text={data.comments_count}
                    onClick={() => onClick(data)}
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

export default memo(Video);