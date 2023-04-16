import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { memo } from 'react';
import { MenuItem } from "./index";
import config from '~/config';
import {
    HomeSidebarIcon, FollowSidebarIcon,
    HomeSidebarActiveIcon, FollowSidebarActiveIcon
} from '~/components/Icons';

const cx = classNames.bind(styles)

function Menu() {
    return (  
        <div className={cx('menu')}>
            <MenuItem title="Dành cho bạn" to={config.routes.home} icon={<HomeSidebarIcon />} iconActive={<HomeSidebarActiveIcon />} />
            <MenuItem title="Đang Follow" to={config.routes.following} icon={<FollowSidebarIcon />} iconActive={<FollowSidebarActiveIcon />} />
        </div>
    );
}

export default memo(Menu);