import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import Axios from "axios";
import {useEffect, useState} from "react";
import Echo from "laravel-echo";
import Messagebox from "./Messagebox";

const cx = classNames.bind(styles);

function ChatBox({ idRoom }) {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_LARAVEL;
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
                setMessages((oldMessages) => [...oldMessages, data]);
                setMessage('');
            });

        return () => {
            echo.leave(`room.${idRoom}`)
        }
    }, [idRoom]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please add your username');
            return;
        }

        if (!message) {
            alert('Please add a message');
            return;
        }
        try {
            await Axios.post('/message', {
                idRoom: idRoom,
                user: user,
                message: message,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (  
        <div className={cx('wrapper')}>
            <div>
                <h1>Public Space</h1>
                <p>Post your random thoughts for the world to see</p>
            </div>
            <div>
                {messages.map((message, index) => (
                    <Messagebox key={index} message={message} />
                ))}
            </div>
            <div>
                <form onSubmit={(e) => handleSendMessage(e)}>
                    <input
                        type="text"
                        placeholder="Set your username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
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