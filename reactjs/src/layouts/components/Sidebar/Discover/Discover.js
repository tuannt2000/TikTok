import classNames from "classnames/bind";
import styles from './Discover.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Discover ({ children }) {
    return (  
        <div className={cx('discover')}>
            <p className={cx('title')}>Khám phá</p>
            <div className={cx('discover-list')}>
                {children}
            </div>
        </div>
    );
}

Discover.propTypes = {
    children: PropTypes.node.isRequired
}

export default Discover;