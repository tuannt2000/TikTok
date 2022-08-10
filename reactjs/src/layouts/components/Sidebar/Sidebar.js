import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { Menu, MenuItem } from './Menu';
import Account from './Account';
import Discover from './Discover';
import Footer from './Footer';
import AccountItem from '~/components/AccountItem';
import { AccountOffer } from '~/components/Popper';
import Button from '~/components/Button';
import config from '~/config';
import {
    HomeSidebarIcon, FollowSidebarIcon, LiveSidebarIcon,
    HomeSidebarActiveIcon, FollowSidebarActiveIcon, LiveSidebarActiveIcon
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getIconDiscove } from '~/utils/utility';
import { Scrollbars } from 'rc-scrollbars';
import { useSelector, useDispatch } from "react-redux";
import { getAllDiscoves } from '~/redux/actions/discove';
import { getUserOffer, getUserFollowing } from '~/redux/actions/user';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar({ header_only = false }) {
    const [showScroll, setShowScroll] = useState(false);
    const user = useSelector(state => state.user);
    const discove = useSelector(state => state.discove);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect( () => {
        if (user.currentUser.id) {
            dispatch(getUserOffer({id: user.currentUser.id, navigate}));
            dispatch(getUserFollowing({id: user.currentUser.id, navigate}));
            dispatch(getAllDiscoves({navigate}));
        }
    }, [dispatch, navigate, user.currentUser.id]);

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
                    <Menu>
                        <MenuItem title="Dành cho bạn" to={config.routes.home} icon={<HomeSidebarIcon />} iconActive={<HomeSidebarActiveIcon />} />
                        <MenuItem title="Đang Follow" to={config.routes.following} icon={<FollowSidebarIcon />} iconActive={<FollowSidebarActiveIcon />} />
                        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveSidebarIcon />} iconActive={<LiveSidebarActiveIcon />} />
                    </Menu>
                    { header_only || (
                        <Account title="Tài khoản được đề xuất" showMore="Xem tất cả" >
                            {user.userOffer.length === 0 && <div className={cx('load-icon')}><FontAwesomeIcon icon={faSpinner} className={cx('loading')}/></div>}
                            {user.userOffer.map(result => (
                                <AccountOffer key={result.id} data={result}>
                                    <AccountItem className="sidebar" data={result} />
                                </AccountOffer>
                            ))}
                        </Account>
                    )}
                    <Account title="Các tài khoản đang follow" showMore="Xem thêm" >
                        {user.userFollowing.length === 0 && <div className={cx('load-icon')}><FontAwesomeIcon icon={faSpinner} className={cx('loading')}/></div>}
                        {user.userFollowing.map(result => (
                            <AccountItem className="sidebar" key={result.id} data={result} />
                        ))}
                    </Account>
                    <Discover>
                        {!discove.data.length && <div className={cx('load-icon')}><FontAwesomeIcon icon={faSpinner} className={cx('loading')}/></div>}
                        {discove.data.map((result, index) => (
                            <Button
                                to={`${result.type}/${result.link}`}
                                key={index}
                                discover leftIcon={getIconDiscove(result.type)}
                            >
                                {result.title}
                            </Button>
                        ))}
                    </Discover>
                    <Footer />
                </div>
            </Scrollbars>
        </aside>
        </div >
    );
}

export default Sidebar;