import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { Dialog, DialogTitle } from '@mui/material';
import { LOGIN } from '~/constants/Header';
import Button from '~/components/Button';
import { useState } from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { useGoogleLogout } from 'react-google-login';
import { CloseIcon, ArrowLeftIcon } from '~/components/Icons';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setModalLogin } from '~/redux/actions/modal';
import Loading from '../Loading';

const cx = classNames.bind(styles);

const MODAL_MENU = [
    {
        elem: Login,
        children: {
            data: [
                {
                    elem: Signup
                }
            ]
        }
    }
];

function Modal() {
    const [history, setHistory] = useState([{ data: MODAL_MENU }]);
    const modalLogin = useSelector(state => state.modal.modalLogin);
    const loading = useSelector(state => state.login.loading)

    const dispatch = useDispatch()

    const currentMenu = history[history.length - 1];

    const onLogoutSuccess = () => {
        console.log('logout success');
        history.length > 0 && setHistory(prev => prev.slice(0, 1))
    };

    const onFailure = () => {
        console.log('logout fail');
    };

    const { signOut } = useGoogleLogout({
        onLogoutSuccess: onLogoutSuccess,
        onFailure: onFailure,
    });

    const handleHide = (success) => {
        if (history.length > 1 && !success) {
            signOut();
        }

        dispatch(setModalLogin());
    };

    const handleSetMenu = (data) => {
        const isParent = !!data.children;
        if (isParent) {
            setHistory(prev => [...prev, data.children])
        }
    };

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            let Comp = item.elem;

            return (
                <Comp
                    key={index}
                    handleSetMenu={handleSetMenu}
                    data={item}
                />
            )
        });
    };

    return (
        <>
            <Button onClick={() => dispatch(setModalLogin(true))} primary>{LOGIN}</Button>
            <Dialog className={cx('container')} open={modalLogin} onClose={() => handleHide(false)}>
                {modalLogin && (
                    <>
                        {history.length > 1 && (
                            <div onClick={signOut} className={cx('div-back')}>
                                <ArrowLeftIcon />
                            </div>
                        )}
                        <div className={cx('modal-main')}>
                            <div className={cx('modal-container')}>
                                <div className={cx('div-modal-container')}>
                                    <DialogTitle className={cx('title')}>
                                        {history.length > 1 ? "Đăng ký" : "Đăng nhập vào TikTok"}
                                    </DialogTitle>
                                    {renderItems()}
                                </div>
                                {loading && <Loading />}
                            </div>
                            <div className={cx('footer')}>
                                {history.length > 1 ? (
                                    <div className={cx('footer')}>
                                        <div>Bạn đã có tài khoản?</div>
                                        <Link to='login' className={cx('signup')}>
                                            <span>Đăng nhập</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={cx('footer')}>
                                        <div>Bạn không có tài khoản?</div>
                                        <Link to='signup' className={cx('signup')}>
                                            <span>Đăng ký</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div onClick={() => handleHide(false)} className={cx('close-btn')}><CloseIcon /></div>
                    </>
                )}
            </Dialog>
        </>
    );
}

export default Modal;