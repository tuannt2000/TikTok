import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Avatar from '~/components/Avatar';
import Header from "./Header";
import Video from "./Video";
import { useEffect } from 'react';
import { AccountOffer } from '~/components/Popper';
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    return (
        <div>
            {user.user.map((result, index) => (
                <div key={index} className={cx('list-item')}>
                    <AccountOffer home data={result}>
                        <Avatar
                            data={result}
                            size={56}
                        />
                    </AccountOffer>
                    <div className={cx('main-container')}>
                        <Header data={result} />
                        <Video />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;