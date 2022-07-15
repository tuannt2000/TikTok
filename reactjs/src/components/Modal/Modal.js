import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { Dialog } from '@mui/material';
import { LOGIN } from '~/constants/Header';
import Button from '~/components/Button';
import { useDispatch, useSelector} from "react-redux";
import { loginSuccess } from '~/redux/actions/login';
import { useState } from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { useGoogleLogout } from 'react-google-login';

const cx = classNames.bind(styles);

function Modal() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const login = useSelector(state => state.login);

    const onLogoutSuccess = () => {
        console.log('logout success');
        dispatch(loginSuccess());
    };

    const onFailure = () => {
        console.log('logout fail');
    };

    const { signOut } = useGoogleLogout({
        onLogoutSuccess: onLogoutSuccess,
        onFailure: onFailure,
    });

    const hanleHide = async (back = false) => {
        signOut();

        if (!back){
            setShow(false);
        }      
    };

    const hanleShow = () => {
        setShow(true);
    };

    return (
        <>
            <Button onClick={hanleShow} primary>{LOGIN}</Button>
            <Dialog className={cx('container')} open={show} onClose={() => hanleHide(false)}>
                {!login.loginSuccess ? <Login hanleHide={hanleHide} /> : <Signup hanleHide={hanleHide} />}
            </Dialog>
        </>
    );
}

export default Modal;