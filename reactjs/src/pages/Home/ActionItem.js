import classNames from "classnames/bind";
import styles from './Home.module.scss';
import PropTypes from 'prop-types';
import { forwardRef } from "react";

const cx = classNames.bind(styles);

const ActionItem = forwardRef(({ children, text, onClick }, ref) => {
    return (  
        <button onClick={onClick} ref={ref} className={cx('action-item-btn')}>
            <span className={cx('span-icon-wrappper')}>
                {children}
            </span>
            <strong className={cx('strong-text')}>{text}</strong>
        </button>
    );
});

ActionItem.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

export default ActionItem;