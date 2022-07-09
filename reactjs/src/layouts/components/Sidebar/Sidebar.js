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
import * as userService from '~/services/userService';
import * as discoveService from '~/services/discoveService';
import { useEffect, useState } from 'react';
import { getIconDiscove } from '~/utils/utility';
import { Scrollbars } from 'rc-scrollbars';

const cx = classNames.bind(styles)

function Sidebar() {
    const [accountOffer, setAccountOffer] = useState([]);
    const [discoves, setDiscoves] = useState([]);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const fetchApiAccountOffer = async () => {
            const result = await userService.getAllUsers();

            setAccountOffer(result);
        }

        fetchApiAccountOffer();
    }, []);

    useEffect(() => {
        const fetchApiDiscoves = async () => {
            const result = await discoveService.getAllDiscoves();

            setDiscoves(result);
        }

        fetchApiDiscoves();
    }, []);

    const handleChooseDiscove = (id) => {
        const postDiscove = async () => {
            await discoveService.postDiscove(id);
        }

        postDiscove();
    }

    return (
        <div 
            className={cx('aside')} 
            onMouseOver={() => setShowScroll(true)}
            onMouseOut={() => setShowScroll(false)}
        >
            <Scrollbars
                autoHide={!showScroll}
                renderTrackHorizontal={props => <div {...props} className={cx('track-horizontal')}/>}
                renderThumbHorizontal={props => <div {...props} className={cx('thumb-horizontal')}/>}
                renderThumbVertical={props => <div {...props} className={cx('thumb-vertical')}/>}
                renderTrackVertical={props => <div {...props} className={cx('track-vertical')}/>}
            >
                <aside
                    className={cx('container')}
                >

                    <div
                        className={cx('wrapper')}
                    >
                        <Menu>
                            <MenuItem title="Dành cho bạn" to={config.routes.home} icon={<HomeSidebarIcon />} iconActive={<HomeSidebarActiveIcon />} />
                            <MenuItem title="Đang Follow" to={config.routes.following} icon={<FollowSidebarIcon />} iconActive={<FollowSidebarActiveIcon />} />
                            <MenuItem title="LIVE" to={config.routes.live} icon={<LiveSidebarIcon />} iconActive={<LiveSidebarActiveIcon />} />
                        </Menu>
                        <Account title="Tài khoản được đề xuất" showMore="Xem tất cả" >
                            {accountOffer.map(result => (
                                <AccountOffer key={result.id} data={result}>
                                    <AccountItem className="sidebar" data={result} />
                                </AccountOffer>
                            ))}
                        </Account>
                        <Account title="Các tài khoản đang follow" showMore="Xem thêm" >
                            {accountOffer.map(result => (
                                <AccountItem className="sidebar" key={result.id} data={result} />
                            ))}
                        </Account>
                        <Discover>
                            {discoves.map((result, index) => (
                                <Button
                                    to={`${result.type}/${result.link}`}
                                    key={index}
                                    discover leftIcon={getIconDiscove(result.type)}
                                    onClick={() => handleChooseDiscove(result.id)}
                                >
                                    {result.title}
                                </Button>
                            ))}
                        </Discover>
                        <Footer />
                    </div>
                </aside>
            </Scrollbars>
        </div>
    );
}

export default Sidebar;