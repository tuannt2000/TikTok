import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropsTypes from 'prop-types';

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    upload = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        upload,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propsTypes = {
    to: PropsTypes.string,
    href: PropsTypes.string,
    primary: PropsTypes.bool,
    outline: PropsTypes.bool,
    text: PropsTypes.bool,
    upload: PropsTypes.bool,
    rounded: PropsTypes.bool,
    disabled: PropsTypes.bool,
    small: PropsTypes.bool,
    large: PropsTypes.bool,
    children: PropsTypes.node.isRequired,
    className: PropsTypes.string,
    leftIcon: PropsTypes.node,
    rightIcon: PropsTypes.node,
    onClick: PropsTypes.func,
}

export default Button;