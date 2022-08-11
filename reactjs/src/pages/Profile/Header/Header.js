import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Avatar from "~/components/Avatar";
import { EditIcon, ShareIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { Share } from "~/components/Popper";

const cx = classNames.bind(styles);

function Header({ profile }) {
    return (
        <div className={cx('container')}>
            <div className={cx('share-info')}>
                <Avatar
                    data={
                        {
                            nickname: profile.nickname,
                            avatar: profile.avatar
                        }
                    }
                    size={116}
                    to={false}
                />
                <div className={cx('share-title-container')}>
                    <h2 className={cx('nickname')}>{profile.nickname}</h2>
                    <h1 className={cx('full-name')}>{profile.full_name}</h1>
                    <div className={cx('edit-container')}>
                        <Button edit leftIcon={<EditIcon />}>Sửa hồ sơ</Button>
                    </div>
                </div>
            </div>
            <h2 className={cx('count-info')}>
                <div className={cx('div-number')}>
                    <strong>{profile.followings_count}</strong>
                    <span className={cx('span-unit')}>Đang Follow</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{profile.followers_count}</strong>
                    <span className={cx('span-unit')}>Follower</span>
                </div>
                <div className={cx('div-number')}>
                    <strong>{profile.likes_count}</strong>
                    <span className={cx('span-unit')}>Thích</span>
                </div>
            </h2>
            <h2 className={cx('user-bio')}>{profile.bio ?? 'Chưa có tiểu sử.'}</h2>
            <Share profile>
                <div className={cx('share-action')}>
                    <ShareIcon />
                </div>
            </Share>
        </div>
    );
}

export default Header;