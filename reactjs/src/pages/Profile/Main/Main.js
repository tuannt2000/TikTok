import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import { UserIcon, LockIcon } from "~/components/Icons";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myVideo, setListVideoDetail } from '~/redux/actions/video';
import Video from "~/components/Video";

const cx = classNames.bind(styles);

const TAB = [
    {
        className: 'video',
        title: 'Video'
    },
    {
        className: 'like',
        title: 'Đã thích',
        icon: <LockIcon />
    }
]

function Main() {
    const [active, setActive] = useState(0);
    const [hover, setHover] = useState(-1);
    const my_video = useSelector(state => state.video.my_video);
    const dispatch = useDispatch();
    const line = useRef();

    useEffect(() => {
        dispatch(myVideo());
    }, [dispatch]);

    useEffect(() => {
        const position = hover >= 0 ? hover * 230 : active * 230;
        line.current.style.transform = 'translateX(' + position + 'px)';
    }, [active, hover])

    const handleShowVideoDetail = (data) => {
        window.history.replaceState(null, "", '/@' + data.user.nickname + '/video/' + data.id)
        dispatch(setListVideoDetail({
            list_video_detail: my_video,
            data: data
        }));
    }

    return (
        <div className={cx('container')}>
            <div className={cx('feed-tab')}>
                {TAB.map((result, index) => (
                    <p
                        key={index}
                        onClick={() => setActive(index)}
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
            {my_video.length ? (
                <div className={cx('DivThreeColumnContainer')}>
                    <div className={cx('DivVideoFeedV2')}>
                        {my_video.map((result, index) => (
                            <Video onClick={handleShowVideoDetail} list_video={my_video} key={index} data={result} />
                        ))}
                    </div>
                </div>
            ) : (
                <main className={cx('main-wrapper')}>
                    <div className={cx('error-container')}>
                        <UserIcon className={cx('user-icon')} />
                        <p className={cx('title-error')}>Tải video đầu tiên của bạn lên</p>
                        <p className={cx('desc-error')}>Video của bạn sẽ xuất hiện tại đây</p>
                    </div>
                </main>
            )}
        </div>
    );
}

export default Main;