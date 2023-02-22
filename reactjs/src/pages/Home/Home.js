import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Avatar from '~/components/Avatar';
import Header from "./Header";
import Video from "./Video";
import { useEffect } from 'react';
import { AccountOffer } from '~/components/Popper';
import { useSelector, useDispatch } from "react-redux";
import { listVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Home() {
    const video = useSelector(state => state.video);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listVideo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {video.list_video.map((result, index) => (
                <div key={index} className={cx('list-item')}>
                    <AccountOffer home data={result.user}>
                        <Avatar
                            data={result.user}
                            size={56}
                        />
                    </AccountOffer>
                    <div className={cx('main-container')}>
                        <Header data={result} />
                        <Video data={result} video={video} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;