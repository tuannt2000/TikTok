import classNames from 'classnames/bind';
import styles from './Frame.module.scss';
import { memo } from "react";
import { useDispatch } from 'react-redux';
import { setModalLogin } from '~/redux/actions/modal';

const cx = classNames.bind(styles);

function Frame() {
    const dispatch = useDispatch();

    return (  
        <div className={cx('frame-container')}>
            <p className={cx('login-hint')}>Đăng nhập để follow các tác giả, thích video và xem bình luận. </p>
            <button className={cx('button-login')} onClick={() => dispatch(setModalLogin(true))}>Đăng nhập</button>
        </div>
    );
}

export default memo(Frame);