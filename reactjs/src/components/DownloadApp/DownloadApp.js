import classNames from "classnames/bind";
import styles from './DownloadApp.module.scss';
import { useState } from 'react';
import { DownloadAppComputerIcon, DownloadAppPhoneIcon, CloseIcon } from '~/components/Icons';
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function DownloadApp() {
    const [showChild, setShowChild] = useState(false);

    return (  
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                {!showChild ? (
                    <button 
                        className={cx('get-app')} 
                        onClick={() => setShowChild(true)}
                    >Tải ứng dụng</button>
                ) : (
                    <div className={cx('wrapper-child')}>
                        <div 
                            className={cx('close')}
                            onClick={() => setShowChild(false)}
                        >
                            <CloseIcon />
                        </div>
                        <div className={cx('download')}>
                            <Button className={cx('icon')} leftIcon={<DownloadAppComputerIcon />} >Tải Tiktok dành cho máy tính để bàn</Button>
                            <div className={cx('split')}></div>
                            <Button className={cx('icon')} leftIcon={<DownloadAppPhoneIcon />} >Tải ứng dụng Tiktok</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DownloadApp;