import classNames from "classnames/bind";
import styles from './ListConversation.module.scss';
import { BackIcon, SettingIcon } from '~/components/Icons';
import ListItem from './ListItem';

const cx = classNames.bind(styles);

function ListConversation({ handleClick }) {
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('back-icon')}>
                <BackIcon />
            </div>
            <div className={cx('header')}>
                <h3 className={cx('title')}>Tin nhắn</h3>
                <SettingIcon className={cx('setting-icon')} />
            </div>
            <div className={cx('content')}>
                <ListItem handleClick={handleClick} />
            </div>
        </div>
    );
}

export default ListConversation;