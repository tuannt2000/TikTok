import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { Dialog, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CloseIcon, ArrowLeftIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Modal({ 
    children, 
    onClose, 
    open, 
    title,
    login = false,
    signup = false,
}) {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            className={cx('container')}
        >
            {signup && 
                <div className={cx('div-back')}>
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
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title : PropTypes.string.isRequired,
    login: PropTypes.bool,
    signup: PropTypes.bool
}

export default Modal;