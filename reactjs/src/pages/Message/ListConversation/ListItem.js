import classNames from "classnames/bind";
import styles from './ListConversation.module.scss';
import { MoreIcon } from '~/components/Icons';
import { useState } from 'react';
import Avatar from "~/components/Avatar";

const cx = classNames.bind(styles);

function ListItem({ idRoom, room, handleClick }) {
    const [showMore, setShowMore] = useState(false);

    return (  
        <div 
            onMouseEnter={() => setShowMore(true)} 
            onMouseLeave={() => setShowMore(false)}
            onClick={() => handleClick(room.room_id)}
            className={cx('item-wrapper', { active: room.room_id === idRoom })}
        >
            <div className={cx('item-info')}>
                <Avatar 
                    data={
                        {
                            nickname: room.nickname,
                            avatar: room.avatar
                        }
                    }
                    size={56}
                    to={false}
                />
                <div className={cx('item-text')}>
                    <div className={cx('item-nickname')}>{room.nickname}</div>
                    <div className={cx('item-extract-time')}>
                        <div className={cx('item-extract')}>👋👋👋</div>
                        <div className={cx('item-time')}>6/8/2022</div>
                    </div>
                </div>
            </div>
            {showMore && <MoreIcon className={cx('more-icon')} />}
        </div>
    );
}

export default ListItem;