import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, SearchIcon } from '~/components/Icons';
import UserItem from './UserItem';
import { useEffect, useState } from 'react';
import { shareVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Share({ handleClose }) {
    const open = useSelector(state => state.modal.modelShare);
    const video_id = useSelector(state => state.modal.video_share_id);
    const userFriend = useSelector(state => state.user.userFriend);
    const [searchValue, setSearchValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const newUserFriend = userFriend.map(user => {
        return {...user, check: false, search: true}
    })
    const [userFriendState, setUserFriendState] = useState(newUserFriend);
    const dispatch = useDispatch();

    useEffect(() => {
        const hasChecked = userFriendState.some(user => {
            return user.check && user.search;
        });

        setSubmit(hasChecked);
    }, [userFriendState]);

    useEffect(() => {
        const newUserFriendState = userFriendState.map(user => {
            if (user.nickname.search(searchValue) === -1 && user.full_name.search(searchValue) === -1) {
                user.search = false;
            } else {
                user.search = true;
            }
            return user;
        });

        setUserFriendState(newUserFriendState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const handleClick = (id) => {
        const newUserFriendMap = userFriendState.map(user => {
            if (id === user.id) {
                return {...user, check: !user.check}
            }
            return user;
        });

        setUserFriendState(newUserFriendMap);
    }

    const handleSubmit = () => {
        if (!submit) {
            return;
        }

        const users_share = userFriendState.filter(user => user.check && user.search);
        const users_id = users_share.map(user => user.id);

        dispatch(shareVideo({
            "users_id": users_id,
            "video_id": video_id
        }));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={cx('container')}>
                <div className={cx('modal')}>
                    <div className={cx('div-send-message')}>
                        <div className={cx('div-close-button')} onClick={handleClose}>
                            <CloseIcon height={"2.4rem"} width={"2.4rem"} />
                        </div>
                        <h2 className={cx('h2-modal-title')}>Gửi đến bạn bè</h2>
                        <div className={cx('search-container')}>
                            <SearchIcon />
                            <input 
                                placeholder="Tìm kiếm" 
                                onChange={e => setSearchValue(e.target.value)} 
                                className={cx('input-user')} 
                                value={searchValue} 
                            />
                        </div>
                        <p className={cx('p-user-title')}>Bạn bè</p>
                        <div className={cx('div-user-list-container')}>
                            <div className={cx('div-user-list-inner-container')}>
                                {userFriendState.length > 0 ? (
                                    userFriendState.map(result => {
                                        return (
                                            result.search && <UserItem key={result.id} data={result} handleClick={handleClick} />
                                        )
                                    })
                                ) : (
                                    <span>Bạn chưa có bạn bè nào.</span>
                                )}
                            </div>
                        </div>
                        <div className={cx('div-send-container')}>
                            <button 
                                className={cx('send-button')} 
                                disabled={!submit}
                                onClick={handleSubmit}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Share;