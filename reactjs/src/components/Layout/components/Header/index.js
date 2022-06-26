import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner, faPlus, faEllipsisV, faGlobeAsia, faQuestionCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
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
        title: 'Tiếng Việt'
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Phản hồi và trợ giúp'
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
    }, [])

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={'/'}><img src={images.logo} alt="TikTok" /></Link>
                </div>
                <Tippy
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
                </Tippy>
                <div className={cx('actions')}>
                    <Button to='/upload' upload leftIcon={<FontAwesomeIcon icon={faPlus} />}>Tải lên</Button>
                    <Button primary>Đăng nhập</Button>
                    <PopperMenu items={MENU_ITEMS}>
                        <button className={cx('more-btn')} >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>                       
                    </PopperMenu>
                </div>
            </div>
        </header >
    );
}

export default Header;