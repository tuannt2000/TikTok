import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import { UserIcon, LockIcon, LockIconNotFill } from "~/components/Icons";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myVideo, setListVideoDetail, getMyVideoLike, removeMyVideoLike } from '~/redux/actions/video';
import Video from "~/components/Video";

const cx = classNames.bind(styles);

const TAB = [
    {
        className: 'video',
        title: 'Video',
        icon_empty: <UserIcon className={cx('user-icon')} />,
        title_empty: 'Tải video đầu tiên của bạn lên',
        desc_empty: 'Video của bạn sẽ xuất hiện tại đây'
    },
    {
        className: 'like',
        title: 'Đã thích',
        icon: <LockIcon />,
        icon_empty: <UserIcon className={cx('user-icon')} />,
        title_empty: 'Chưa thích video nào',
        desc_empty: 'Những video bạn đã thích sẽ xuất hiện tại đây'
    }
];

const ANOTHER_TAB = [
    {
        className: 'video',
        title: 'Video',
        icon_empty: <UserIcon className={cx('user-icon')} />,
        title_empty: 'Không có nội dung',
        desc_empty: 'Người dùng này chưa đăng bất kỳ video nào.'
    },
    {
        className: 'like',
        title: 'Đã thích',
        icon: <LockIcon />,
        icon_empty: <LockIconNotFill className={cx('user-icon')} />,
        title_empty: 'Video đã thích của người dùng này ở trạng thái riêng tư',
        desc_empty: 'Các video được thích bởi người dùng này hiện đang ẩn'
    }
]

function Main({ profile }) {
    const [active, setActive] = useState(0);
    const [hover, setHover] = useState(-1);
    const [navbar, setNavbar] = useState(TAB);
    const video = useSelector(state => state.video);
    const currentUser = useSelector(state => state.user.currentUser);
    const [listVideo, setListVideo] = useState([]); 
    const dispatch = useDispatch();
    const line = useRef();

    useEffect(() => {
        setActive(0);
        dispatch(myVideo(profile.id));

        if (currentUser.id !== profile.id) {
            setNavbar(ANOTHER_TAB)
            dispatch(removeMyVideoLike());
        } else {
            setNavbar(TAB)
            dispatch(getMyVideoLike());
        }
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
                {navbar.map((result, index) => (
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
                        {navbar[active].icon_empty}
                        <p className={cx('title-error')}>{ navbar[active].title_empty }</p>
                        <p className={cx('desc-error')}>{ navbar[active].desc_empty }</p>
                    </div>
                </main>
            )}
        </div>
    );
}

export default Main;