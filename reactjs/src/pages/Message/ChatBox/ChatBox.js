import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import {useEffect, useState} from "react";
import Echo from "laravel-echo";
import Messagebox from "./Messagebox";
import {useDispatch, useSelector} from "react-redux";
import { sendMessage, setAllMessagesAfterSend } from '~/redux/actions/room';

const cx = classNames.bind(styles);

function ChatBox({ idRoom }) {
    const [message, setMessage] = useState('');
    const user_id = useSelector(state => state.user.currentUser.id);
    const listMessages = useSelector(state => state.room.listMessages);

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
            .subscribed(() => {
                console.log('You are subscribed');
            })
            .listen('.message.new', (data) => {
                console.log(data)
                dispatch(setAllMessagesAfterSend(data));
                setMessage('');
            });

        return () => {
            echo.leave(`room.${idRoom}`)
        }
    }, [idRoom]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!message) {
            alert('Please add a message');
            return;
        }
        dispatch(sendMessage({idRoom, user_id, message}));
    }

    return (  
        <div className={cx('wrapper')}>
            <div>
                {listMessages.map((message, index) => (
                    <Messagebox key={index} message={message} />
                ))}
            </div>
            <div>
                <form onSubmit={(e) => handleSendMessage(e)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;