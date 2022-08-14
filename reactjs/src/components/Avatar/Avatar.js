import classNames from "classnames/bind";
import styles from './Avatar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forwardRef } from "react";

const cx = classNames.bind(styles);

const Avatar = forwardRef(({ data, size, to = true, href = false, album = false, className}, ref) => {
    let Comp = 'div';
    const props = {};

    if (to) {
        props.to = `@${data.nickname}`;
        Comp = Link;
    } else if (href) {
        props.href = `@${data.nickname}`;
        props.target = '_blank';
        Comp = 'a';
    }

    return (
        <Comp ref={ref} className={cx('avatar', {[className]: className})} {...props}>
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
                    {album && (<div className={cx('album-border')}></div>)}
                    <img src={data.avatar} alt={data.nickname} />
                </span>
            </div>
        </Comp>
    );
});

Avatar.propTypes = {
    data: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    to: PropTypes.bool,
    href: PropTypes.bool
};

export default Avatar;