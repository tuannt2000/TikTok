import classNames from 'classnames/bind';
import styles from './Delete.module.scss';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Delete({ video_id, open, handleClose }) {
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteVideo({id: video_id}))
        handleClose()
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
                    <div className={cx('modal-title-container')}>
                        <div className={cx('modal-title')}>
                            Bạn có chắc chắn muốn xóa video này?
                        </div>
                    </div>
                    <div
                        className={cx('modal-btn', {'emphasis': true})}
                        onClick={handleDelete}
                    >
                        Xóa
                    </div>
                    <div
                        className={cx('modal-btn')}
                        onClick={handleClose}
                    >
                        Hủy
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Delete;