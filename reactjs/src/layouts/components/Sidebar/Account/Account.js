import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AccountItem from '~/components/AccountItem';
import { AccountOffer } from '~/components/Popper';
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOffer, getUserFollowing } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function Account({ offer = false, follow = false, title, showMore }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const account = offer ? user.userOffer : user.userFollowing;
    const loadData = offer ? user.setUserOffer : user.setUserFollowing;

    useEffect(() => {
        if (user.currentUser.id) {
            offer ? dispatch(getUserOffer(user.currentUser.id)) : dispatch(getUserFollowing(user.currentUser.id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.currentUser.id]);

    return (  
        <div className={cx('user-container')}>
            <p className={cx('title')}>{title}</p>
            {!loadData && <div className={cx('load-icon')}><FontAwesomeIcon icon={faSpinner} className={cx('loading')}/></div>}
            {account.map((result, index) => {
                let Comp;
                if (offer) {
                    Comp =
                        <AccountOffer key={index} data={result} following={result.following}>
                            <AccountItem className="sidebar" data={result} />
                        </AccountOffer>
                } else if (follow) {
                    Comp = <AccountItem key={index} className="sidebar" data={result} />
                }

                return Comp;
            })}
            <div className={cx('show-more')}>
                <p className={cx('show-more-text')}>{showMore}</p>
            </div>
        </div>
    );
}

Account.propTypes = {
    offer: PropTypes.bool,
    follow: PropTypes.bool,
    title: PropTypes.string.isRequired,
    showMore: PropTypes.string.isRequired
};

export default memo(Account);