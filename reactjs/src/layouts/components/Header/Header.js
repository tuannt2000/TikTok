import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom'
import { Menu as PopperMenu } from '~/components/Popper';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import { InboxIcon, MessageIcon, PlusIcon } from '~/components/Icons';
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
import { getProfileUser } from '~/redux/actions/user';
import PropTypes from 'prop-types';
import Echo from "laravel-echo";
import { setCountNotification } from '~/redux/actions/notification';

const cx = classNames.bind(styles);

function Header({ max_width = false }) {
    const language = useSelector(state => state.language);
    const notifications = useSelector(state => state.notification.notifications);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);

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
                    dispatch(setCountNotification(data));
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

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);

        if (menuItem.type && menuItem.type === 'profile') {
            dispatch(getProfileUser(currentUser.nickname));
        }
    };

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
                                            {notifications.length > 0 && <span className={cx('badge-message')}>{notifications.length}</span>}
                                        </Link>
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy content={INBOX}>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        {/* <span className={cx('badge')}>12</span> */}
                                    </button>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <Modal />
                    )}
                    <div>
                        <PopperMenu items={Object.keys(currentUser).length ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {Object.keys(currentUser).length > 0 ? (
                                <Image
                                    src={currentUser.avatar}
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