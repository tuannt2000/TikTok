import classNames from "classnames/bind";
import styles from './Message.module.scss';

import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import Pusher from 'pusher-js';
import ListConversation from './ListConversation';
import ChatBox from './ChatBox';
import { useDispatch } from "react-redux";
import { getAllMessages, removeNotification, setAllMessages, setAllMessagesAfterSend } from '~/redux/actions/room';
import Echo from "laravel-echo";

const cx = classNames.bind(styles);

function Message() {
    const [idRoom, setIdRoom] = useState(-1);
    const [room, setRoom] = useState({});
    const dispatch = useDispatch();

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
            .channel(`room.${idRoom}`)
            .listen('.message.new', (data) => {
                dispatch(setAllMessagesAfterSend(data));
            });

        return () => {
            echo.leave(`room.${idRoom}`)
        }
    }, [dispatch, idRoom]);

    const handleClick = (currentRoom) => {
        if (!currentRoom.readed) {
            currentRoom.readed = 1;
            dispatch(removeNotification({notification_id: currentRoom.notification_id}));
        }

        const room_id = currentRoom.room_id;
        if (idRoom !== room_id) {
            setIdRoom(room_id);
            setRoom(currentRoom);
            dispatch(getAllMessages(room_id));
            dispatch(setAllMessages(''))
        }
    };

    return (
        <div className={cx('content')}>
            <ListConversation idRoom={idRoom} handleClick={handleClick} />
            <ChatBox room={room} />
        </div>
    );
}

export default Message;