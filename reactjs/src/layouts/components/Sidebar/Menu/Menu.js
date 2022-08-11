import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { memo } from 'react';
import { MenuItem } from "./index";
import config from '~/config';
import {
    HomeSidebarIcon, FollowSidebarIcon, LiveSidebarIcon,
    HomeSidebarActiveIcon, FollowSidebarActiveIcon, LiveSidebarActiveIcon
} from '~/components/Icons';

const cx = classNames.bind(styles)

function Menu() {
    return (  
        <div className={cx('menu')}>
            <MenuItem title="Dành cho bạn" to={config.routes.home} icon={<HomeSidebarIcon />} iconActive={<HomeSidebarActiveIcon />} />
            <MenuItem title="Đang Follow" to={config.routes.following} icon={<FollowSidebarIcon />} iconActive={<FollowSidebarActiveIcon />} />
            <MenuItem title="LIVE" to={config.routes.live} icon={<LiveSidebarIcon />} iconActive={<LiveSidebarActiveIcon />} />
        </div>
    );
}

export default memo(Menu);