import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useState, memo } from "react";
import { InforIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Switch() {
    const [switchButton, setSwitchButton] = useState(false);

    return (
        <>
            <div className={cx('switch-wrap')}>
                <div className={cx('switch-text')}>
                    <span>Chạy quy trình kiểm tra bản quyền</span>
                </div>
                <div className={cx('tiktok-switch')} onClick={() => setSwitchButton(!switchButton)}>
                    <div className={cx('tiktok-switch-wrap', {'on': switchButton})}>
                        <span className={cx('tiktok-switch-inner', {'on': switchButton})} />
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                {switchButton ? (
                    <div className={cx('tool-tip')}>
                        <InforIcon/>
                        <span>Kiểm tra bản quyền chỉ bắt đầu sau khi bạn tải video của mình lên.</span>
                    </div>
                ) : (
                    <>
                        <span className={cx('css-1gv9ukn')}>
                            Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi phạm bản quyền hay không. Nếu chúng tôi phát hiện có vi phạm, bạn có thể chỉnh sửa video trước khi đăng.
                        </span>
                        <span className={cx('learn-more')}>
                            Tìm hiểu thêm
                        </span>
                    </>
                )}
            </div>
        </>
    );
}

export default memo(Switch);