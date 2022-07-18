import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link, useNavigate } from 'react-router-dom'
import { Menu as PopperMenu } from '~/components/Popper';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import { InboxIcon, MessageIcon, PlusIcon } from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import config from '~/config';
import { useEffect } from 'react';
import { getAllLanguages } from '~/redux/actions/language';
import { Modal } from '~/components/Modal';
import {
    MENU_ITEMS, userMenu, UPLOAD,
    MESSAGE, INBOX
} from '~/constants/Header';
import { useSelector, useDispatch } from "react-redux";
import { getInfoUser } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function Header() {
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        console.log(2)
        if (localStorage.getItem("token")) {
            dispatch(getInfoUser());
        }

        dispatch(getAllLanguages({navigate}));
        dispatch(getAllLanguages({navigate}));
    }, [dispatch, navigate]);

    useEffect(() => {
        MENU_ITEMS.forEach(item => {
            if (item.type === 'languages') {
                item.children.data = language.data;
            }

            return item;
        });
    }, [language.data]);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    return (
        <header className={cx('wrapper')}>
            {console.log(1)}
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo')}><img src={images.logo} alt="TikTok" /></Link>
                </div>  
                <Search />           
                <div className={cx('actions')}>
                    <Button to={config.routes.upload} upload leftIcon={<PlusIcon />}>{UPLOAD}</Button>
                    {Object.keys(currentUser).length > 0 ? (
                        <>
                            <div>
                                <Tippy content={MESSAGE}>
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy content={INBOX}>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>12</span>
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
        </header >
    );
}

export default Header;