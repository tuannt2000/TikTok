import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { Menu } from './Menu';
import Account from './Account';
import Discover from './Discover';
import Footer from './Footer';
import { useState } from 'react';
import { Scrollbars } from 'rc-scrollbars';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Sidebar({ header_only = false }) {
    const [showScroll, setShowScroll] = useState(false);
    const user = useSelector(state => state.user);

    return (
        <div
            className={cx('aside', {'header-only' : header_only})}
            onMouseOver={() => setShowScroll(true)}
            onMouseOut={() => setShowScroll(false)}
        >
            <aside
                className={cx('container', {'header-only' : header_only})}
            >
                <Scrollbars
                    autoHide={!showScroll}
                    renderTrackHorizontal={props => <div {...props} className={cx('track-horizontal')} />}
                    renderThumbHorizontal={props => <div {...props} className={cx('thumb-horizontal')} />}
                    renderThumbVertical={props => <div {...props} className={cx('thumb-vertical')} />}
                    renderTrackVertical={props => <div {...props} className={cx('track-vertical')} />}
                >
                <div
                    className={cx('wrapper')}
                >
                    <Menu />
                    {user.profile.id === user.currentUser.id || (
                        <Account offer title="Tài khoản được đề xuất" showMore="Xem tất cả" />
                    )}
                    <Account follow title="Các tài khoản đang follow" showMore="Xem thêm" />
                    <Discover />
                    <Footer />
                </div>
            </Scrollbars>
        </aside>
        </div >
    );
}

Sidebar.propTypes = {
    header_only: PropTypes.bool
};

export default Sidebar;