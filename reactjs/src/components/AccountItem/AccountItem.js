import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';
import images from '~/assets/images';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const AccountItem = forwardRef(({ data, className = null }, ref) => {
    const classes = cx('wrapper', {
        [className]: className
    });

    return (
        <Link ref={ref} to={`/@${data.nickname}`} className={classes}>
            <img
                className={cx('avatar')}
                src={data.avatar || images.noImage}
                alt={data.nickname}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <h5 className={cx('username')}>{data.full_name}</h5>
            </div>
        </Link>
    );
});

AccountItem.propsTypes = {
    data: PropsTypes.object.isRequired,
    className: PropsTypes.string
};

export default AccountItem;