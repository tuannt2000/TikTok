import styles from './Header.module.scss';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV, faGlobeAsia, faQuestionCircle, 
    faKeyboard, faUser, faCoins, faGear,
    faSignOut
} from '@fortawesome/free-solid-svg-icons';
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
import { useEffect } from 'react';
import * as languageService from '~/services/languageService';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faGlobeAsia} />,
        title: 'Tiếng Việt',
        type: 'languages',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
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
];

function Header() {
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
                    <Button to={config.routes.upload} upload leftIcon={<PlusIcon />}>Tải lên</Button>
                    {currentUser ? (
                        <>
                            <div>
                                <Tippy content="Tin nhắn">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy content="Hộp thư">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button primary>Đăng nhập</Button>
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