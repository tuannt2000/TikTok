import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import images from '~/assets/images';
import { useState, useEffect } from 'react';
import { formatFilename } from '~/utils/utility';

const cx = classNames.bind(styles);

function Caption({ video }) {
    const [cation, setCation] = useState('');

    useEffect(() => {
        setCation(!!video ? formatFilename(video.name) : '')
    }, [video])

    return (  
        <div className={cx('caption-wrap')}>
            <div className={cx('caption-container')}>
                <div className={cx('caption-text-container')}>
                    <span className={cx('caption-note')}>Chú thích</span>
                    <span className={cx('require-font')}>
                        <span>0 </span>
                        / 150
                    </span>
                </div>
                <div className={cx('caption-input')}>
                    <div className={cx('caption-container-v2')}>
                        <div className={cx('caption-editor')}>
                            <input type="textarea" className={cx('input-editor')} value={cation} onChange={e => setCation(e.target.value)} />
                        </div>
                        <div className={cx('at-icon')}>
                            <img src={images.atIcon} alt="at" />
                        </div>
                        <div className={cx('hashtag-icon')}>
                            <img src={images.hashtagIcon} alt="hashtag" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Caption;