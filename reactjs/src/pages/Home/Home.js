import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Avatar from '~/components/Avatar';
import Header from "./Header";
import Video from "./Video";
import { useEffect, useRef, useState } from 'react';
import { AccountOffer } from '~/components/Popper';
import { useSelector, useDispatch } from "react-redux";
import { listVideo, listVideoFollowing, setExistDataListVideo, setListVideoDetail, setLoadMore } from '~/redux/actions/video';
import { useLocation } from "react-router-dom";
import { postFollow } from "~/redux/actions/user";
import Share from "~/components/Modal/Share";
import { setModalShare } from "~/redux/actions/modal";
import Loading from "~/components/Loading";

const cx = classNames.bind(styles);

function Home() {
    const video = useSelector(state => state.video);
    const modelShare = useSelector(state => state.modal.modelShare);
    const location = useLocation();
    const [listVideoState, setListVideoState] = useState(location.pathname === '/' ? video.list_video : video.list_video_following);
    const loadMore = useSelector(state => state.video.load_more);
    const existData = useSelector(state => state.video.exist_data_list_video);
    const videoRef = useRef();
    const dispatch = useDispatch();

    const following = location.pathname === '/following';

    useEffect(() => {
        const new_list_video = location.pathname === '/' ? video.list_video : video.list_video_following;
        setListVideoState(new_list_video);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.list_video, video.list_video_following]);

    useEffect(() => {
        setListVideoState([]);
        dispatch(setLoadMore());
        dispatch(setExistDataListVideo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        if (loadMore) {
            if (location.pathname === '/') {
                dispatch(listVideo({offset: video.list_video.length}));
            } else if (location.pathname === '/following') {
                dispatch(listVideoFollowing({offset: video.list_video_following.length}));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY + window.innerHeight >= 
                videoRef.current.offsetHeight + videoRef.current.offsetTop) 
            {
                if (!loadMore && existData) {
                    dispatch(setLoadMore());
                }
            }
        }

        // list has auto height  
        window.addEventListener('scroll', handleScroll);

        // cleanup callback, that will be called before the effect runs again
        return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existData, loadMore]);

    const hanldeSumitFollow = (data) => {
        dispatch(postFollow({
            user_follower_id: data.id
        }));
    }

    const handleVideoDetail = (data) => {
        window.history.replaceState(null, "", '/@' + data.user.nickname + '/video/' + data.id)
        dispatch(setListVideoDetail({
            list_video_detail: listVideoState,
            data: data
        }));
    }

    const handleClose = () => {
        dispatch(setModalShare({
            "share": false,
            "video_id": 0
        }))
    }

    return (
        <div className={cx('home-container')} ref={videoRef}>
            {listVideoState.map((result, index) => (
                <div key={index} className={cx('list-item')}>
                    <AccountOffer home data={result.user} following={result.is_user_following}>
                        <Avatar
                            data={result.user}
                            size={56}
                        />
                    </AccountOffer>
                    <div className={cx('main-container')}>
                        <Header onClick={hanldeSumitFollow} following={following} data={result} />
                        <Video onClick={handleVideoDetail} data={result} />
                    </div>
                </div>
            ))}
            {loadMore && <Loading className={"home"} /> }
            {modelShare && <Share handleClose={handleClose} />}
        </div>
    );
}

export default Home;