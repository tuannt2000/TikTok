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
import { useEffect, useState } from 'react';
import { DiscoverStyleNumberIcon, DiscoverStyleMusicIcon } from '~/components/Icons';

const cx = classNames.bind(styles)

function Sidebar() {
    const [accountOffer, setAccountOffer] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.getAllUsers();

            setAccountOffer(result);
        }

        fetchApi();
    },[])

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
                <Button discover leftIcon={<DiscoverStyleNumberIcon />} >suthatla</Button>
                <Button discover leftIcon={<DiscoverStyleMusicIcon />} >Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n</Button>
            </Discover>
            <Footer />
        </aside>
    );
}

export default Sidebar;