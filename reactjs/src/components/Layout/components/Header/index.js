import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                   <img src={images.logo} alt="TikTok" />
                </div>
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
                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}

export default Header;