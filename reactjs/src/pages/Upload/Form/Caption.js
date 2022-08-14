import classNames from "classnames/bind";
import styles from "./Form.module.scss";

const cx = classNames.bind(styles);

function Caption() {
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
                            <input type="textarea" className={cx('input-editor')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Caption;