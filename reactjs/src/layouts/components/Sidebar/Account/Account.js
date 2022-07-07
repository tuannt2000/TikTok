import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)

function AccountOffer({ title, showMore, children }) {
    return (  
        <div className={cx('user-container')}>
            <p className={cx('title')}>{title}</p>
            {children}
            <div className={cx('show-more')}>
                <p className={cx('show-more-text')}>{showMore}</p>
            </div>
        </div>
    );
}

AccountOffer.propTypes = {
    title: PropTypes.string.isRequired,
    showMore: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default AccountOffer;