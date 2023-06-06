import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import { Link } from 'react-router-dom';
import Button from "~/components/Button";
import PropTypes from 'prop-types';
import Avatar from "~/components/Avatar";
import { AccountOffer } from "~/components/Popper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { postFollow } from "~/redux/actions/user";
import { ArrowTopTippy, LockIcon, MoreIcon, TwoPersonIcon } from "~/components/Icons";
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import DeleteModal from "~/components/Modal/Delete";
import PrivacyModal from "~/components/Modal/Privacy";
import { setListVideoDetail } from "~/redux/actions/video";

const cx = classNames.bind(styles);

function Header({ video }) {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalPrivacy, setOpenModalPrivacy] = useState(false);
    const [follow, setFollow] = useState(video.is_user_following);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const tippyRef = useRef();
    
    useEffect(() => {
        setFollow(video.is_user_following);
    }, [video.is_user_following])

    const handClick = () => {
        dispatch(postFollow({
            user_follower_id: video.user.id
        }));
        setFollow(!follow)
    }

    const handleOpenModalDelete = () => {
        tippyRef.current.hide();
        setOpenModalDelete(true);
    };
    const handleCloseModalDelete = () => setOpenModalDelete(false);

    const handleOpenModalPrivacy = () => {
        tippyRef.current.hide();
        setOpenModalPrivacy(true);
    };
    const handleCloseModalPrivacy = () => setOpenModalPrivacy(false);

    const renderStatus = () => {
        if (video.status === 1) {
            return (              
                <>
                    <span style={
                        {
                            margin: "0px 4px"
                        }
                    }> · </span>
                    <TwoPersonIcon className={cx('private-icon')} width={"1.6rem"} height={"1.6rem"} />
                    <span>Bạn bè</span>
                </>
            )
        } else if (video.status === 2) {
            return (              
                <>
                    <span style={
                        {
                            margin: "0px 4px"
                        }
                    }> · </span>
                    <LockIcon className={cx('private-icon')} width={"1.6rem"} height={"1.6rem"} />
                    <span>Riêng tư</span>
                </>
            )
        }
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <ArrowTopTippy className={cx('top-arrow')} />
                <ul className={cx('ui-popup-container')}>
                    <li className={cx('li-popup-item')}>
                        <p 
                            className={cx('button-action')}
                            onClick={handleOpenModalPrivacy}
                        >Cài đặt quyền riêng tư</p>
                    </li>
                    <li className={cx('li-popup-item')}>
                        <p
                            className={cx('button-action')}
                            onClick={handleOpenModalDelete}
                        >Xóa</p>
                    </li>
                </ul>
            </PopperWrapper>
        </div>
    );

    const hideVideoDetail = () => {
        dispatch(
            setListVideoDetail({
                list_video_detail: [],
                data: {}
            })
        );
    }

    return (
        <div className={cx('info-container')}>
            <AccountOffer home data={video.user} className={'mr-avatar'}>
                <Avatar
                    data={video.user}
                    size={40}
                />
            </AccountOffer>
            <Link onClick={hideVideoDetail} to={'/@' + video.user.nickname} className={cx('author-anchor')}>
                <span className={cx('browse-username')}>{ video.user.full_name }</span>
                <span className={cx('browser-nickname')}>
                    { video.user.nickname }
                    { renderStatus() }
                </span>
            </Link>
            {video.user.id !== user.id ? (
                <Button className={cx('follow-btn')} onClick={handClick} outline>{ follow ? 'Đang follow' : 'Follow' }</Button>
            ) : (
                <div 
                    className={cx('div-action-container')}
                >
                    <Tippy
                        interactive
                        render={renderResult}
                        placement='bottom-end'
                        maxWidth={200}
                        appendTo={document.body}
                        onShow={instance => {
                                tippyRef.current = instance;
                            }
                        }
                    >
                        <span 
                            className={cx('more-icon')}
                        >
                            <MoreIcon />
                        </span>
                    </Tippy>
                    <PrivacyModal video_id={video.id} open={openModalPrivacy} handleClose={handleCloseModalPrivacy} />
                    <DeleteModal video_id={video.id} open={openModalDelete} handleClose={handleCloseModalDelete} />
                </div>
            )}
        </div>
    );
}

Header.propTypes = {
    video: PropTypes.object.isRequired
};

export default Header;