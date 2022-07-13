import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Dialog } from "@mui/material";
import { CloseIcon } from '~/components/Icons';
import { useDispatch, useSelector } from "react-redux";
import { setModalSignup } from '~/redux/slices/modalSlice';

const cx = classNames.bind(styles);

function Signup() {
    const modalSlice = useSelector(state => state.modal);
    const dispatch = useDispatch();

    return (
        <Dialog open={modalSlice.modalSignup} onClose={() => dispatch(setModalSignup())}>
            <div className={cx('')}>
                <div className={cx('')}>

                </div>
            </div>
            <div onClick={() => dispatch(setModalSignup())} className={cx('close-btn')}><CloseIcon /></div>
        </Dialog>
    );
}

export default Signup;