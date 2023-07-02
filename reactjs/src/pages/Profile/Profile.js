import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import Main from "./Main";
import { useEffect } from "react";
import { getProfileUser, setProfileUser } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const nickname = window.location.pathname.substring(2);
        dispatch(getProfileUser(decodeURIComponent(nickname)));

        return () => {
            dispatch(setProfileUser({}));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            <Header profile={profile} />
            <Main profile={profile} />
        </div>
    );
}

export default Profile;