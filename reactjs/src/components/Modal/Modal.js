import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { Dialog, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CloseIcon, ArrowLeftIcon } from '~/components/Icons';
import { LOGIN } from '~/constants/Header';
import Button from '~/components/Button';
import { setShowModalLogin } from '~/redux/actions/login';
import {useDispatch} from "react-redux";

const cx = classNames.bind(styles);

function Modal({
    children,
    onShow,
    onClose,
    open,
    title,
    login = false,
    signup = false,
}) {
    const dispatch = useDispatch();

    return (
        <>
            <Button onClick={onShow} primary>{LOGIN}</Button>
            <Dialog
                onClose={onClose}
                open={open}
                className={cx('container')}
            >
                {signup &&
                    <div onClick={() => {
                        onClose();
                        dispatch(setShowModalLogin(true));
                    }} className={cx('div-back')}>
                        <ArrowLeftIcon />
                    </div>
                }
                <div className={cx('modal-main')}>
                    <div className={cx('modal-container')}>
                        <div className={cx('div-modal-container')}>
                            <DialogTitle className={cx('title')}>{title}</DialogTitle>
                            {children}
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        {login && (
                            <>
                                <div>Bạn không có tài khoản?</div>
                                <Link to='signup' className={cx('signup')}>
                                    <span>Đăng ký</span>
                                </Link>
                            </>
                        )}
                        {signup && (
                            <>
                                <div>Bạn đã có tài khoản?</div>
                                <Link to='login' className={cx('signup')}>
                                    <span>Đăng nhập</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div onClick={onClose} className={cx('close-btn')}><CloseIcon /></div>
            </Dialog>
        </>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onShow: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title : PropTypes.string.isRequired,
    login: PropTypes.bool,
    signup: PropTypes.bool
}

export default Modal;