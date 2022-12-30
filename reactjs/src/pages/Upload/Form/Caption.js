import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import images from '~/assets/images';
import { useEffect } from 'react';
import { formatFilename } from '~/utils/utility';

const cx = classNames.bind(styles);

function Caption({ video, formik }) {
    useEffect(() => {
        formik.setFieldValue('name', !!video ? formatFilename(video.name) : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            <input type="textarea" className={cx('input-editor')} value={formik.values.name} onChange={formik.handleChange} />
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