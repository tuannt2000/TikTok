import classNames from "classnames/bind";
import styles from './Avatar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forwardRef } from "react";

const cx = classNames.bind(styles);

const Avatar = forwardRef(({ data, size}, ref) => {
    return (
        <Link ref={ref} to={`@${data.nickname}`} className={cx('avatar')}>
            <div 
                className={cx('container')}
                style={
                    {
                        width: size,
                        height: size
                    }
                }
            >
                <span 
                    className={cx('circle')}
                    style={
                        {
                            width: size,
                            height: size
                        }
                    }
                >
                    <img src={data.avatar} alt={data.nickname} />
                </span>
            </div>
        </Link>
    );
});

Avatar.propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired
}

export default Avatar;