import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, SearchIcon } from '~/components/Icons';
import UserItem from './UserItem';
import { useCallback, useState } from 'react';

const cx = classNames.bind(styles);

function Share({ handleClose }) {
    const open = useSelector(state => state.modal.modelShare);
    const userFollowing = useSelector(state => state.user.userFollowing);
    const [searchValue, setSearchValue] = useState('');
    const newUserFollowing = useCallback(() => {
        return userFollowing.map(user => {
            return {...user, check: false}
        })
    }, [userFollowing])
    const [userFollowingState, setUserFollowingState] = useState(newUserFollowing);
    const dispatch = useDispatch();

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
                        <p className={cx('p-user-title')}>Đang Follow</p>
                        <div className={cx('div-user-list-container')}>
                            <div className={cx('div-user-list-inner-container')}>
                                {userFollowingState.map(result => (
                                    <UserItem key={result.id} data={result} />
                                ))}
                            </div>
                        </div>
                        <div className={cx('div-send-container')}>
                            <button className={cx('send-button')} disabled={true}>
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