import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { hideModalSignup } from '~/redux/slices/modalSlice';
import { Modal } from '~/components/Modal';

const cx = classNames.bind(styles);

function Signup() {
    const modalSlice = useSelector(state => state.modal);
    const dispatch = useDispatch();

    return (
        <Modal
            onClose={() => dispatch(hideModalSignup())}
            open={modalSlice.modalSignup}
            title='Đăng ký'
            signup
        >
            <div className={cx('title')}>Ngày sinh của bạn là ngày nào?</div>
            <div className={cx('description')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
            <button className={cx('btn')} disabled>Tiếp</button>
        </Modal>
    );
}

export default Signup;