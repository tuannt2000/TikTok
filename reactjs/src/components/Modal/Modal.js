import { Dialog } from '@mui/material';
import { LOGIN } from '~/constants/Header';
import Button from '~/components/Button';
import { useDispatch, useSelector} from "react-redux";
import { loginSuccess } from '~/redux/actions/login';
import { useState } from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { useGoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';

function Modal() {
    const onLogoutSuccess = () => {
        console.log('logout');
    };
    const onFailure = () => {
        console.log('logout fail');
    };
    const { signOut } = useGoogleLogout({
        clientId: CLIENT_ID,
        onLogoutSuccess: onLogoutSuccess,
        onFailure: onFailure,
    });
    console.log(signOut)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const login = useSelector(state => state.login);

    const hanleHide = (back = false, signup = false) => {
        if (signup) {
            dispatch(loginSuccess());
        }

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
            <Dialog open={show} onClose={hanleHide}>
                {!login.loginSuccess ? <Login hanleHide={hanleHide} /> : <Signup hanleHide={hanleHide} />}
            </Dialog>
        </>
    );
}

export default Modal;