import classNames from "classnames/bind";
import styles from "./Upload.module.scss";
import Uploader from "./Uploader";
import Form from "./Form";
import { useState } from 'react';

const cx = classNames.bind(styles);

function Upload() {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState('');

    const handleChange = (url = '', video = '') => {
        setUrl(url);
        setVideo(video);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('layout')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container-v2')}>
                        <span className={cx('main-title')}>Tải video lên</span>
                        <div className={cx('sub-title')}>Đăng video vào tài khoản của bạn</div>
                        <div className={cx('content')}>
                            <Uploader video={video} url={url} handleChange={handleChange} />
                            <Form video={video} url={url} handleChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;