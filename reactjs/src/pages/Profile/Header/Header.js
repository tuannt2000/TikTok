import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Avatar from "~/components/Avatar";

const cx = classNames.bind(styles);

function Header({current_user}) {
    return (
        <div className={cx('container')}>
            <div className={cx('share-info')}>
                <Avatar
                    data={
                        {
                            nickname: current_user.nickname,
                            avatar: current_user.avatar
                        }
                    }
                    size={116}
                    to={false}
                />
            </div>
            <h2 className={cx('count-info')}>
                <div className={cx('div-number')}>
                    <strong>{current_user.followings_count}</strong>
                    <span className={cx('span-unit')}>Đang Follow</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{current_user.followers_count}</strong>
                    <span className={cx('span-unit')}>Follower</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{current_user.likes_count}</strong>
                    <span className={cx('span-unit')}>Thích</span>
                </div>
            </h2>
            <h2 className={cx('user-bio')}>{current_user.bio ?? 'Chưa có tiểu sử.'}</h2>
        </div>
    );
}

export default Header;