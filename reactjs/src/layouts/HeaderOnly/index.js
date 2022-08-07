import Header from "~/layouts/components/Header";
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    );
}

export default HeaderOnly;