import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark, faMagnifyingGlass, faSpinner, faPlus,
    faEllipsisV, faGlobeAsia, faQuestionCircle, faKeyboard,
    faMessage, faArchive, faUser, faCoins, faGear,
    faSignOut
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { Wrapper as PopperWrapper, Menu as PopperMenu } from '~/components/Popper';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faGlobeAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback'
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt trên bàn phím'
    }
]

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(function () {
            setSearchResult([1, 2, 3])
        }, 1000)
    }, []);

    const currentUser = true;

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Xem hồ sơ',
            to: '/@userdqgdn9mg4p',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Cài đặt',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={'/'}><img src={images.logo} alt="TikTok" /></Link>
                </div>
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm tài khoản và video" spellCheck={false} className={cx('search-input')} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                        <span className={cx('span-spliter')}></span>

                        <button className={cx('search-btn')} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <div className={cx('border-search')}></div>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    <Button to='/upload' upload leftIcon={<FontAwesomeIcon icon={faPlus} />}>Tải lên</Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Tin nhắn">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>
                            </Tippy>
                            <Tippy content="Hộp thư">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faArchive} />
                                </button>           
                            </Tippy>              
                        </>
                    ) : (
                        <>
                            <Button primary>Đăng nhập</Button>
                        </>
                    )}
                    <PopperMenu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1653276361117698.jpeg?x-expires=1656856800&x-signature=ulhdfzsqO9rXMR3oW6nKPyasuNQ%3D" 
                                 alt="/" className={cx('user-avatar')}
                            />
                        ) : (
                            <button className={cx('more-btn')} >
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        )}
                    </PopperMenu>
                </div>
            </div>
        </header >
    );
}

export default Header;