import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { Menu, MenuItem } from './Menu';
import AccountOffer from './AccountOffer';
import AccountItem from '~/components/AccountItem'
import config from '~/config';
import 
{ 
    HomeSidebarIcon, FollowSidebarIcon, LiveSidebarIcon,
    HomeSidebarActiveIcon, FollowSidebarActiveIcon, LiveSidebarActiveIcon 
} from '~/components/Icons';
import * as userService from '~/services/userService';
import { useEffect, useState } from 'react';

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
            <AccountOffer>
                {accountOffer.map(result => (
                    <AccountItem key={result.id} data={result}/>
                ))}
            </AccountOffer>
        </aside>
    );
}

export default Sidebar;