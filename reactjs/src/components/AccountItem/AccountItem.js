import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';
import images from '~/assets/images';
import { forwardRef } from 'react';
import {useDispatch} from "react-redux";
import { getProfileUser } from '~/redux/actions/user';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const AccountItem = forwardRef(({ data, className = null, hanleClick = defaultFn }, ref) => {
    const dispatch = useDispatch();

    const classes = cx('wrapper', {
        [className]: className
    });

    const getInfoUser = () => {
        dispatch(getProfileUser(data.nickname))
        hanleClick();
    }

    return (
        <Link onClick={getInfoUser} ref={ref} to={`/@${data.nickname}`} className={classes}>
            <img
                className={cx('avatar')}
                src={data.avatar || images.noImage}
                alt={data.nickname}
                referrerPolicy={'no-referrer'}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.nickname}</span>
                    {data.tick === 1 && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
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