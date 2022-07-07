import classNames from 'classnames/bind';
import styles from './AccountOffer.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)

function AccountOffer({ children }) {
    return (  
        <div className={cx('user-container')}>
            <p className={cx('title')}>Tài khoản được đề xuất</p>
            {children}
            <div className={cx('show-more')}>
                <p className={cx('show-more-text')}>Xem tất cả</p>
            </div>
        </div>
    );
}

AccountOffer.propTypes = {
    children: PropTypes.node.isRequired
}

export default AccountOffer;