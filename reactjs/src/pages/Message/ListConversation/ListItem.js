import classNames from "classnames/bind";
import styles from './ListConversation.module.scss';
import { MoreIcon } from '~/components/Icons';
import {useEffect, useState} from 'react';
import Avatar from "~/components/Avatar";
import { formatDate, formatTextMessage } from '~/utils/utility';
import Echo from "laravel-echo";

const cx = classNames.bind(styles);

function ListItem({ idRoom, room, handleClick }) {
    const [showMore, setShowMore] = useState(false);
    const [newRoom, setNewRoom] = useState(room);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
            wsHost: 'realtime-pusher.ably.io',
            wsPort: 443,
            disableStats: true,
            encrypted: true,
            auth: {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        });

        echo
            .channel(`room.${newRoom.room_id}`)
            .listen('.message.new', (data) => {
                setNewRoom(prev => {
                    return {...prev, text_user_id: data.user_id, text: data.text, created_at: data.created_at}
                })
            });

        return () => {
            echo.leave(`room.${newRoom.room_id}`)
        }
    }, [newRoom.room_id]);

    return (  
        <div 
            onMouseEnter={() => setShowMore(true)} 
            onMouseLeave={() => setShowMore(false)}
            onClick={() => handleClick(room)}
            className={cx('item-wrapper', { active: newRoom.room_id === idRoom })}
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
                    <div className={cx('item-nickname')}>{newRoom.nickname}</div>
                    <div className={cx('item-extract-time', {"readed": newRoom.readed})}>
                        <div className={cx('item-extract')}>{formatTextMessage(newRoom)}</div>
                        <div className={cx('item-time')}>{formatDate(newRoom.created_at)}</div>
                    </div>
                </div>
            </div>
            {showMore && <MoreIcon className={cx('more-icon')} />}
        </div>
    );
}

export default ListItem;