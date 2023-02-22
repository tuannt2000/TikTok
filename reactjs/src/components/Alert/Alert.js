import classNames from "classnames/bind";
import styles from './Alert.module.scss';
import { useSelector } from "react-redux";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

const Alert = forwardRef(() => {
    const alertMessage = useSelector(state => state.user.alertMessage);

    return (
        <div>
            <div className={cx("container")}>
                <span>
                    <div className={cx("notice")}>
                        <div className={cx("notice-content")}>
                            <div className={cx("message-container")}>
                                <span>{ alertMessage }</span>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
});

export default Alert;