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
import {useEffect} from 'react';
import * as languageService from '~/services/languageService';
import { Login as LoginModal } from '~/components/Modal';
import {
    MENU_ITEMS, userMenu, UPLOAD,
    MESSAGE, INBOX, LOGIN
} from '~/constants/Header';
import { useSelector, useDispatch } from "react-redux";
import {
    showModalLogin, showModalSignup
} from '~/redux/slices/modalSlice';
import { Signup } from "~/components/Modal";

const cx = classNames.bind(styles);

function Header() {
    const loginSlice = useSelector(state => state.login);
    const dispatch = useDispatch();
    const currentUser = false;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await languageService.getAllLanguages();

            MENU_ITEMS.forEach(item => {
                if (item.type === 'languages') {
                    item.children.data = result;
                }

                return item;
            });
        };

        fetchApi();
    }, []);

    useEffect(() => {
        if (loginSlice.login) {
            dispatch(showModalSignup());
        }
    }, [loginSlice.login, dispatch]);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo')}><img src={images.logo} alt="TikTok" /></Link>
                </div>  
                <Search />           
                <div className={cx('actions')}>
                    <Button to={config.routes.upload} upload leftIcon={<PlusIcon />}>{UPLOAD}</Button>
                    {currentUser ? (
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
                        <>
                            <Button onClick={() => dispatch(showModalLogin())} primary>{LOGIN}</Button>
                            <LoginModal />
                            <Signup />
                        </>
                    )}
                    <div>
                        <PopperMenu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {currentUser ? (
                                <Image
                                    src="https://i-vnexpress.vnecdn.net/2019/07/30/anh-thien-nhien-dep-thang-7-1564483719_680x0.jpg"
                                    alt="Nguyễn Hữu Tuấn"
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