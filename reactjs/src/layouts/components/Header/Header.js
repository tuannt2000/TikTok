import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom'
import { Menu as PopperMenu } from '~/components/Popper';
import { Notification as PopperNotification } from '~/components/Popper';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import { InboxIcon, MessageIcon, PlusIcon, InboxIconFill } from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import config from '~/config';
import { useEffect, memo } from 'react';
import { Modal } from '~/components/Modal';
import {
    MENU_ITEMS, userMenu, UPLOAD,
    MESSAGE, INBOX
} from '~/constants/Header';
import { useSelector, useDispatch } from "react-redux";
import { getNotifications, getProfileUser, setNotification, updateNotifications } from '~/redux/actions/user';
import PropTypes from 'prop-types';
import Echo from "laravel-echo";
import { setCountNotification } from '~/redux/actions/notification';
import { getNotificationNotRead } from '~/utils/utility';
import { useState } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Header({ max_width = false }) {
    const language = useSelector(state => state.language);
    const notifications = useSelector(state => state.user.notifications);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const [clickNotification, setClickNotification] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
            wsHost: 'realtime-pusher.ably.io',
            wsPort: 443,
            disableStats: true,
            encrypted: true,
            auth: {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        });

        echo
            .channel(`notification.${currentUser.id}`)
            .listen('.notification.new', (data) => {
                if (Object.keys(data).length > 0) {
                    dispatch(setNotification(data));
                }
            });

        return () => {
            echo.leave(`notification.${currentUser.id}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.id]);

    useEffect(() => {
        MENU_ITEMS.forEach(item => {
            if (item.type === 'languages') {
                item.children.data = language.data;
            }

            return item;
        });

        userMenu.forEach(item => {
            if (item.type === 'profile' && Object.keys(currentUser).length > 0) {
                item.to = '/@' + currentUser.nickname ;
            }

            return item;
        });
    }, [language, currentUser]);

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            dispatch(getNotifications());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);

        if (menuItem.type && menuItem.type === 'profile') {
            dispatch(getProfileUser(currentUser.nickname));
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // 👈️ return early if initial render
        }

        if (!clickNotification && getNotificationNotRead(notifications) > 0) {
            dispatch(updateNotifications());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickNotification]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', { 'max-width' : max_width})}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo')}><img style={{ height: 60 }} src={images.logo} alt="TikTok" /></Link>
                </div>  
                <Search />
                <div className={cx('actions')}>
                    <Button to={config.routes.upload} upload leftIcon={<PlusIcon />}>{UPLOAD}</Button>
                    {Object.keys(currentUser).length > 0 ? (
                        <>
                            <div>
                                <Tippy content={MESSAGE}>
                                    <button className={cx('action-btn')}>
                                        <Link to={config.routes.messages}>
                                            <MessageIcon />
                                            {/* {notifications.length > 0 && <span className={cx('badge-message')}>{notifications.length}</span>} */}
                                        </Link>
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                {clickNotification ? (
                                    <PopperNotification setClickNotification={() => setClickNotification(false)}>
                                        <button className={cx('action-btn')} onClick={() => setClickNotification(false)}>
                                            <InboxIconFill />
                                            {getNotificationNotRead(notifications) > 0 && <span className={cx('badge')}>{getNotificationNotRead(notifications)}</span>}
                                        </button>
                                    </PopperNotification>
                                ) : (
                                    <Tippy content={INBOX}>
                                        <button className={cx('action-btn')} onClick={() => setClickNotification(true)}>
                                            <InboxIcon />
                                            {getNotificationNotRead(notifications) > 0 && <span className={cx('badge')}>{getNotificationNotRead(notifications)}</span>}
                                        </button>
                                    </Tippy>
                                )}
                            </div>
                        </>
                    ) : (
                        <Modal />
                    )}
                    <div>
                        <PopperMenu items={Object.keys(currentUser).length ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {Object.keys(currentUser).length > 0 ? (
                                <Image
                                    src={currentUser.avatar ?? ''}
                                    alt={currentUser.nickname}
                                    className={cx('user-avatar')}
                                    referrerPolicy={'no-referrer'}
                                />
                            ) : (
                                <button className={cx('more-btn')} >
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                            )}
                        </PopperMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    max_width: PropTypes.bool
};

export default memo(Header);