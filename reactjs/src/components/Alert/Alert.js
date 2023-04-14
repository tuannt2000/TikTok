import classNames from "classnames/bind";
import styles from './Alert.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect } from "react";
import { setAlertMessage } from '~/redux/actions/user';

const cx = classNames.bind(styles);

const Alert = forwardRef(() => {
    const alertMessage = useSelector(state => state.user.alertMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!alertMessage) {
            return;
        }

        const time = setTimeout(() => {
            dispatch(setAlertMessage(''));
        }, 2000)

        return (() => {
            clearTimeout(time);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertMessage])

    return (
        <>
            {alertMessage && (
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
            )}
        </>
    );
});

export default Alert;