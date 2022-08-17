import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Upload() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div
                className={cx('btn-file')}
                onClick={handleOpen}
            >
                Thay đổi video
            </div>
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
                                Thay thế video này?
                            </div>
                            <div className={cx('modal-sub-title')}>
                                Chú thích và cài đặt video vẫn sẽ được lưu.
                            </div>
                        </div>
                        <div
                            className={cx('modal-btn', {'emphasis': true})}
                        >
                            Thay thế
                        </div>
                        <div
                            className={cx('modal-btn')}
                            onClick={handleClose}
                        >
                            Tiếp tục chỉnh sửa
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Upload;