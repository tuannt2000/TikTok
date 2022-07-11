import classNames from "classnames/bind";
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import Button from "~/components/Button";
import { DiscoverStyleMusicIcon } from "~/components/Icons";
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Header({ data }) {
    return (
        <div className={cx('container')}>
            <div className={cx('author')}>
                <Link to='test' className={cx('author-anchor')}>
                    <h3 className={cx('author-title')}>{data.nickname}</h3>
                    <h4 className={cx('author-nickname')}>{data.full_name}</h4>
                </Link>
            </div>
            <Button className={cx('follow-btn')} outline>Follow</Button>
            <div className={cx('description')}>
                <span className={cx('description-text')}>😂😂😂</span>
                <Link to='tag/test' className={cx('common-link')}>#LearnOnTikTok</Link>
            </div>
            <h4 className={cx('video-music')}>
                <Button to='test' className={cx('video-music-btn')} leftIcon={<DiscoverStyleMusicIcon />}>nhạc nền  - Hà Nội Ăn Gì ?</Button>
            </h4>
        </div>
    );
}

Header.propTypes = {
    data: PropTypes.object.isRequired
}

export default Header;