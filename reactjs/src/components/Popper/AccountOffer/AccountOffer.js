import classNames from "classnames/bind";
import styles from './AccountOffer.module.scss'
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Images';
import Button from '~/components/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNumber } from '~/utils/utility';
import { useDispatch } from "react-redux";
import { postFollow } from '~/redux/actions/user';

const cx = classNames.bind(styles);

const AccountOffer = (
{ 
    children,
    data,
    home = false,
    className,
    following = false,
    sidebar = false
}) => {
    const dispatch = useDispatch();

    const handClick = () => {
        dispatch(postFollow({
            user_follower_id: data.id
        }));
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('header')}>
                    <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank"  className={cx('avatar')}>
                        <Image referrerPolicy={'no-referrer'} src={data.avatar ?? ''} alt={data.avatar} />
                    </a>
                    <Button onClick={handClick} primary>{ following ? 'Đang follow' : 'Follow' }</Button>
                </div>
                <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank" className={cx('nickname')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </a>
                <a href={`/@${data.nickname}`} rel="noreferrer" target="_blank" className={cx('fullname')}>
                    <span>{data.full_name}</span>
                </a>
                {sidebar && (
                    <p className={cx('info')}>
                        <span className={cx('follow-count')}>{formatNumber(data.mutual_friend_count ?? 0)}</span>
                        <span className={cx('follow')}>Bạn chung</span>
                    </p>
                )}
                <p className={cx('info')}>
                    <span className={cx('follow-count')}>{formatNumber(data.followers_count)}</span>
                    <span className={cx('follow')}>Follower</span>
                    <span className={cx('like-count')}>{formatNumber(data.likes_count)}</span>
                    <span className={cx('like')}>Thích</span>
                </p>
                {home && data.bio && <p className={cx('bio')} dangerouslySetInnerHTML={{__html: data.bio}} />}
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('', {[className]: className})}>
            <Tippy
                interactive
                delay={[700, 700]}
                offset={[home ? -10 : 0, 8]}
                placement='bottom-start'
                render={renderResult}
                appendTo={document.body}
            >
                {children}
            </Tippy>
        </div>
    );
}

AccountOffer.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
    home: PropTypes.bool,
    className: PropTypes.string
};

export default AccountOffer;