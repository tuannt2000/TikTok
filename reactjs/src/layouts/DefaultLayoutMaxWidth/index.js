import Header from "~/layouts/components/Header";
import styles from './DefaultLayoutMaxWidth.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Sidebar from "../components/Sidebar";
import DownloadApp from '~/components/DownloadApp';

const cx = classNames.bind(styles);

function DefaultLayoutMaxWidth({ children }) {
    return (
        <div>
            <Header max_width />
            <div className={cx('container')}>
                <Sidebar header_only />
                <div className={cx('content')}>
                    {children}
                    <DownloadApp />
                </div>
            </div>
        </div>
    );
}

DefaultLayoutMaxWidth.propTypes = {
    children: PropTypes.node.isRequired
};

export default DefaultLayoutMaxWidth;