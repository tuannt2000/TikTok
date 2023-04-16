import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import { UserIcon, LockIcon } from "~/components/Icons";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myVideo, setListVideoDetail, getMyVideoLike } from '~/redux/actions/video';
import Video from "~/components/Video";

const cx = classNames.bind(styles);

const TAB = [
    {
        className: 'video',
        title: 'Video',
        title_empty: 'Tải video đầu tiên của bạn lên',
        desc_empty: 'Video của bạn sẽ xuất hiện tại đây'
    },
    {
        className: 'like',
        title: 'Đã thích',
        icon: <LockIcon />,
        title_empty: 'Chưa thích video nào',
        desc_empty: 'Những video bạn đã thích sẽ xuất hiện tại đây'
    }
]

function Main({ profile }) {
    const [active, setActive] = useState(0);
    const [hover, setHover] = useState(-1);
    const video = useSelector(state => state.video);
    const [listVideo, setListVideo] = useState([]); 
    const dispatch = useDispatch();
    const line = useRef();

    useEffect(() => {
        dispatch(myVideo(profile.id));
        dispatch(getMyVideoLike(profile.id));
        setActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    useEffect(() => {
        setListVideo(video.my_video);
    }, [video.my_video]);

    useEffect(() => {
        const position = hover >= 0 ? hover * 230 : active * 230;
        line.current.style.transform = 'translateX(' + position + 'px)';
    }, [active, hover])

    const handleShowVideoDetail = (data) => {
        window.history.replaceState(null, "", '/@' + data.user.nickname + '/video/' + data.id)
        dispatch(setListVideoDetail({
            list_video_detail: listVideo,
            data: data
        }));
    }

    const handleClick = (index) => {
        setActive(index);

        if (index === 0) {
            setListVideo(video.my_video)
        } else if (index === 1) {
            setListVideo(video.my_video_like)
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('feed-tab')}>
                {TAB.map((result, index) => (
                    <p
                        key={index}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(-1)}
                        className={cx(result.className, { 'active': active === index })}
                    >
                        {result.icon}
                        <span className={cx('span-like')}>{result.title}</span>
                    </p>
                ))}
                <div className={cx('bottom-line')} ref={line}></div>
            </div>
            {listVideo.length ? (
                <div className={cx('DivThreeColumnContainer')}>
                    <div className={cx('DivVideoFeedV2')}>
                        {listVideo.map((result, index) => (
                            <Video onClick={handleShowVideoDetail} list_video={listVideo} key={index} data={result} />
                        ))}
                    </div>
                </div>
            ) : (
                <main className={cx('main-wrapper')}>
                    <div className={cx('error-container')}>
                        <UserIcon className={cx('user-icon')} />
                        <p className={cx('title-error')}>{ TAB[active].title_empty }</p>
                        <p className={cx('desc-error')}>{ TAB[active].desc_empty }</p>
                    </div>
                </main>
            )}
        </div>
    );
}

export default Main;