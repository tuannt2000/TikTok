import classNames from 'classnames/bind';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup() {
    return (
        <>
            <div className={cx('title')}>Ngày sinh của bạn là ngày nào?</div>
            <div className={cx('description')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
            <button className={cx('btn')} disabled>Tiếp</button>
        </>
    );
}

export default Signup;