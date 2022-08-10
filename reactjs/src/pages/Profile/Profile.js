import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import Header from "./Header";

const cx = classNames.bind(styles);

function Profile() {
    const current_user = useSelector(state => state.user.currentUser);
    console.log(current_user)

    return (
        <div className={cx('container')}>
            <Header current_user={current_user} />
        </div>
    );
}

export default Profile;