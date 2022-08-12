import Header from "~/layouts/components/Header";
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div>
            <Header max_width />
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired
};

export default HeaderOnly;