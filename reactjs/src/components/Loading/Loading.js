import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

function Loading({ className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <LoadingIcon className={cx('loading-icon')} />
        </div>
    );
}

export default Loading;