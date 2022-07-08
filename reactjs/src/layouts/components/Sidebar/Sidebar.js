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
import 
{ 
    HomeSidebarIcon, FollowSidebarIcon, LiveSidebarIcon,
    HomeSidebarActiveIcon, FollowSidebarActiveIcon, LiveSidebarActiveIcon 
} from '~/components/Icons';
import * as userService from '~/services/userService';
import * as discoveService from '~/services/discoveService';
import { useEffect, useState } from 'react';
import { getIconDiscove } from '~/utils/utility';

const cx = classNames.bind(styles)

function Sidebar() {
    const [accountOffer, setAccountOffer] = useState([]);
    const [discoves, setDiscoves] = useState([]);

    useEffect(() => {
        const fetchApiAccountOffer = async () => {
            const result = await userService.getAllUsers();

            setAccountOffer(result);
        }

        fetchApiAccountOffer();
    },[]);

    useEffect(() => {
        const fetchApiDiscoves = async () => {
            const result = await discoveService.getAllDiscoves();

            setDiscoves(result);
        }

        fetchApiDiscoves();
    },[]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Dành cho bạn" to={config.routes.home} icon={<HomeSidebarIcon />} iconActive={<HomeSidebarActiveIcon />} />
                <MenuItem title="Đang Follow" to={config.routes.following} icon={<FollowSidebarIcon />} iconActive={<FollowSidebarActiveIcon />} />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveSidebarIcon />} iconActive={<LiveSidebarActiveIcon />} />
            </Menu>
            <Account title="Tài khoản được đề xuất" showMore="Xem tất cả" >
                {accountOffer.map(result => (
                    <AccountOffer key={result.id} data={result}>
                        <AccountItem className="sidebar" data={result}/>
                    </AccountOffer>
                ))}
            </Account>
            <Account title="Các tài khoản đang follow" showMore="Xem thêm" >
                {accountOffer.map(result => (
                    <AccountItem className="sidebar" key={result.id} data={result}/>
                ))}
            </Account>
            <Discover>
                {discoves.map((result, index) => (
                    <Button key={index} discover leftIcon={getIconDiscove(result.type)} >{result.title}</Button>
                ))}
            </Discover>
            <Footer />
        </aside>
    );
}

export default Sidebar;