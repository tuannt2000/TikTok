import classNames from "classnames/bind";
import styles from './Message.module.scss';
import Messagebox from './Messagebox';

import { useState, useEffect } from 'react';
import Axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const cx = classNames.bind(styles);

function Message() {
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
        });

        echo
            .channel('public.room')
            .listen('.message.new', (data) => {
                setMessages((oldMessages) => [...oldMessages, data]);
                setMessage('');
            });
    }, []);

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
            await Axios.post('/new-message', {
                user: user,
                message: message,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h1>Public Space</h1>
                    <p>Post your random thoughts for the world to see</p>
                </div>
                <div>
                    {messages.map((message) => (
                        <Messagebox key={message.id} message={message} />
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
        </div>
    );
}

export default Message;