import classNames from "classnames/bind";
import styles from './Home.module.scss';
import Avatar from '~/components/Avatar';
import Header from "./Header";
import Video from "./Video";
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import { AccountOffer } from '~/components/Popper';

const cx = classNames.bind(styles);

function Home() {
    const [accountOffer, setAccountOffer] = useState([]);

    useEffect(() => {
        const fetchApiAccountOffer = async () => {
            const result = await userService.getAllUsers();

            setAccountOffer(result);
        };

        fetchApiAccountOffer();
    }, []);

    return (
        <div>
            {accountOffer.map((result, index) => (
                <div key={index} className={cx('list-item')}>
                    <AccountOffer home data={result}>
                        <Avatar
                            data={result}
                            size={56}
                        />
                    </AccountOffer>
                    <div className={cx('main-container')}>
                        <Header data={result} />
                        <Video />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;