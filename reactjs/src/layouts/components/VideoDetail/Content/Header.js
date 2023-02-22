import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import { Link } from 'react-router-dom';
import Button from "~/components/Button";
import PropTypes from 'prop-types';
import Avatar from "~/components/Avatar";
import { AccountOffer } from "~/components/Popper";

const cx = classNames.bind(styles);

function Header({ video }) {
    return (
        <div className={cx('info-container')}>
            <AccountOffer home data={video.user} className={'mr-avatar'}>
                <Avatar
                    data={video.user}
                    size={40}
                />
            </AccountOffer>
            <Link to={'@' + video.user.nickname} className={cx('author-anchor')}>
                <span className={cx('browse-username')}>{ video.user.full_name }</span>
                <span className={cx('browser-nickname')}>{ video.user.nickname }</span>
            </Link>
            <Button className={cx('follow-btn')} outline>Follow</Button>
        </div>
    );
}

Header.propTypes = {
    video: PropTypes.object.isRequired
};

export default Header;