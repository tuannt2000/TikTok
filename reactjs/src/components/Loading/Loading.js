import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <LoadingIcon className={cx('loading-icon')} />
        </div>
    );
}

export default Loading;