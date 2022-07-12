import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginItem({ Icon, title, to = false}) {
    return (
        <>
            {to ? (
                <Link className={cx('link-login')} to={to}>
                    <div className={cx('box-container')}>
                        <div className={cx('login-icon')}>{Icon}</div>
                        {title}
                    </div>
                </Link>
            ) : (
                <div className={cx('box-container')}>
                    <div className={cx('login-icon')}>{Icon}</div>
                    {title}
                </div>
            )}
        </>
    );
}

LoginItem.propTypes = {
    Icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
};

export default LoginItem;