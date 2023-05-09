import classNames from "classnames/bind";
import styles from "./Privacy.module.scss";
import Modal from "@mui/material/Modal";
import { ChevronDownIcon } from "~/components/Icons";
import Select from "./Select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const SELECT_OPTIONS = [
    {
        title: "Công khai",
        description: "Bất kỳ ai trên TikTok",
        video_status: 0,
        active: true
    },
    {
        title: "Bạn bè",
        description: "Những follower mà bạn follow lại",
        video_status: 1,
        active: false
    },
    {
        title: "Riêng tư",
        description: "Chỉ hiển thị với tôi",
        video_status: 2,
        active: false
    }
]

function Privacy({ video_id, open, handleClose }) {
    const [selectMenu, setSelectMenu] = useState(SELECT_OPTIONS);
    const [select, setSelect] = useState(false);
    const [switchButton, setSwitchButton] = useState(false);
    const video_detail = useSelector(state => state.video.video_detail);

    useEffect(() => {
        setSwitchButton(video_detail.comment === 1);
        setMenuPivacy(video_detail.status);
    }, [video_detail]);

    const getTextStatus = () => {
        const active = selectMenu.filter(item => item.active);
        return active[0].title;
    }

    const handleChangeSelectMenu = (video_status) => {
        setMenuPivacy(video_status);
    }

    const setMenuPivacy = (id) => {
        const newSelectMenu = SELECT_OPTIONS.map(item => {
            item.active = false;
            if (id === item.video_status) {
                item.active = true;
            }

            return item;
        });
        setSelectMenu(newSelectMenu);
    }
    
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={cx('container')}>
                <div className={cx('modal')}>
                    <div className={cx('div-content-wrapper')}>
                        <h2 className={cx('h2-title')}>Cài đặt quyền riêng tư</h2>
                        <p className={cx('p-desc')}>Ai có thể xem video này</p>
                        <div 
                            className={cx('div-container')}
                            onClick={() => setSelect(!select)}
                        >
                            <div className={cx('div-selection-container')}>
                                <p className={cx('p-selected')}>{getTextStatus()}</p>
                                <ChevronDownIcon width={"2.4rem"} height={"2.4rem"} />
                            </div>
                            {select && (
                                <>
                                <div className={cx('div-select-mask')}></div>
                                <ul className={cx('ul-option-container')}>
                                    {selectMenu.map((item, index) => (
                                        <Select key={index} item={item} handleChangeSelectMenu={handleChangeSelectMenu} />
                                    ))}
                                </ul>
                                </>
                            )}
                        </div>
                        <div className={cx('div-switch-container')}>
                            <div className={cx('div-switch-item-container')}>
                                <span className={cx('span-switch-text')}>Cho phép bình luận</span>
                                <div className={cx('tiktok-switch')} onClick={() => setSwitchButton(!switchButton)}>
                                    <div className={cx('tiktok-switch-wrap', {'on': switchButton})}>
                                        <span className={cx('tiktok-switch-inner', {'on': switchButton})} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className={cx('p-hint')}>Các video thuộc tài khoản riêng tư không hỗ trợ tính năng Duet và Stitch</p>
                    </div>
                    <button className={cx('button-save')} onClick={handleClose}>Xong</button>
                </div>
            </div>
        </Modal>
    );
}

export default Privacy;
