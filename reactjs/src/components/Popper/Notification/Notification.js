import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '~/components/Avatar/Avatar';
import { Link } from 'react-router-dom';
import { postFollow } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function Notification({ children, setClickNotification }) {
    const notifications = useSelector(state => state.user.notifications);
    const notification_not_read = notifications.filter(notification => !notification.checked)
    const notification_readed = notifications.filter(notification => notification.checked)

    const dispatch = useDispatch();

    const handClick = (id) => {
        dispatch(postFollow({
            user_follower_id: id
        }));
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('div-inbox-header-container')}>
                    <h2 className={cx('header-inbox-title')}>Thông báo</h2>
                </div>
                <div className={cx('div-inbox-content-container')}>
                    <p className={cx('p-time-group-title')}>Mới</p>
                    <ul className={cx('ui-inbox-item-list-container')}>
                        {notification_not_read.map((notification, index) => (
                            <li key={index} className={cx('li-inbox-item-wrapper')}>
                                <div className={cx('div-item-container')}>
                                    <Avatar
                                        data={notification.user}
                                        size={48}
                                    />
                                    <div className={cx('div-content-container')}>
                                        <Link className={cx('a-title-link')} to={`/@${notification.user.nickname}`}>
                                            {notification.user.nickname}
                                        </Link>
                                        <p className={cx('p-desc-text')}> follow bạn.</p>
                                    </div>
                                    <button className={cx('follow-button')} onClick={() => handClick(notification.user.id)}>
                                        { notification.user.is_user_following ? 'Đang follow' : 'Follow lại'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className={cx('p-time-group-title')}>Đã đọc</p>
                    <ul className={cx('ui-inbox-item-list-container')}>
                        {notification_readed.map((notification, index) => (
                            <li key={index} className={cx('li-inbox-item-wrapper')}>
                                <div className={cx('div-item-container')}>
                                    <Avatar
                                        data={notification.user}
                                        size={48}
                                    />
                                    <div className={cx('div-content-container')}>
                                        <Link className={cx('a-title-link')} to={`/@${notification.user.nickname}`}>
                                            {notification.user.nickname}
                                        </Link>
                                        <p className={cx('p-desc-text')}> follow bạn.</p>
                                    </div>
                                    <button className={cx('follow-button')} onClick={() => handClick(notification.user.id)}>
                                        { notification.user.is_user_following ? 'Đang follow' : 'Follow lại'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </PopperWrapper>
        </div>
    );
                       
    return (
        <div>
            <Tippy
                interactive
                placement={'bottom-end'}
                offset={[30, 0]}
                render={renderResult}
                visible={true}
                onClickOutside={setClickNotification}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Notification;