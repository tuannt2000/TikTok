import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Avatar from '~/components/Avatar';
import Header from "./Header";
import Video from "./Video";
import { useEffect, useState } from 'react';
import { AccountOffer } from '~/components/Popper';
import { useSelector, useDispatch } from "react-redux";
import { listVideo, listVideoFollowing } from '~/redux/actions/video';
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Home() {
    const video = useSelector(state => state.video);
    const location = useLocation();
    const [listVideoState, setListVideoState] = useState(location.pathname === '/' ? video.list_video : video.list_video_following);
    const dispatch = useDispatch();

    const following = location.pathname === '/following';

    useEffect(() => {
        const new_list_video = location.pathname === '/' ? video.list_video : video.list_video_following
        setListVideoState(new_list_video);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.list_video, video.list_video_following]);

    useEffect(() => {
        if (listVideo.length) {
            return;
        }

        if (location.pathname === '/') {
            dispatch(listVideo());
        } else if (location.pathname === '/following') {
            dispatch(listVideoFollowing());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div>
            {listVideoState.map((result, index) => (
                <div key={index} className={cx('list-item')}>
                    <AccountOffer home data={result.user}>
                        <Avatar
                            data={result.user}
                            size={56}
                        />
                    </AccountOffer>
                    <div className={cx('main-container')}>
                        <Header following={following} data={result} />
                        <Video data={result} video={video} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;