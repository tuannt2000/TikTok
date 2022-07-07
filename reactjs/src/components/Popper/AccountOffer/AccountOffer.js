import classNames from "classnames/bind";
import styles from './AccountOffer.module.scss'
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Images';
import Button from '~/components/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles)

function AccountOffer({ children, data }) {
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('header')}>
                    <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank"  className={cx('avatar')}>
                        <Image src={data.avatar} alt={data.avatar} />
                    </a>
                    <Button primary>Follow</Button>
                </div>
                <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank" className={cx('nickname')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </a>
                <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank" className={cx('fullname')}>
                    <span>{data.full_name}</span>
                </a>
                <p className={cx('info')}>
                    <span className={cx('follow-count')}>{data.followers_count}</span>
                    <span className={cx('follow')}>Follower</span>
                    <span className={cx('like-count')}>{data.likes_count}</span>
                    <span className={cx('like')}>Thích</span>
                </p>
            </PopperWrapper>
        </div>
    )

    return (
        <Tippy
            interactive
            delay={[700, 700]}
            offset={[12, 8]}
            placement='bottom-start'
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

AccountOffer.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired
}

export default AccountOffer;