import classNames from "classnames/bind";
import styles from "./User.module.scss";
import { Link } from "react-router-dom";
import Avatar from "~/components/Avatar/Avatar";
import { formatNumber } from "~/utils/utility";

const cx = classNames.bind(styles);

const UserItem = ({ data }) => {
    return (
        <div className={cx('user-item-container')}>
            <Avatar
                data={data}
                size={60}
                className={cx('avatar-user-link')}
            />
            <Link to={`/@${data.nickname}`} className={cx('user-info-container')}>
                <p className={cx('user-title')}>{ data.nickname }</p>
                <div className={cx('div-sub-title-wrapper')}>
                    <p className={cx('user-full-name')}>{ data.full_name }</p>
                    <span> · </span>
                    <strong className={cx('follow-count')}>
                        { formatNumber(data.follows_count) }
                        <span> Follower</span>
                    </strong>
                </div>
                <p className={cx('user-decs')}>
                    <strong>{ data.bio }</strong>
                </p>
            </Link>
        </div>
    )
}

export default UserItem;