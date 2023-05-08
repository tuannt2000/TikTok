import classNames from "classnames/bind";
import styles from "./Privacy.module.scss";
import Modal from "@mui/material/Modal";
import { ChevronDownIcon } from "~/components/Icons";
import Select from "./Select";
import { useState } from "react";

const cx = classNames.bind(styles);

const SELECT_OPTIONS = [
    {
        title: "Công khai",
        description: "Bất kỳ ai trên TikTok"
    },
    {
        title: "Bạn bè",
        description: "Những follower mà bạn follow lại"
    },
    {
        title: "Riêng tư",
        description: "Chỉ hiển thị với tôi"
    }
]

function Privacy() {
    const [select, setSelect] = useState(false);
    const [switchButton, setSwitchButton] = useState(false);

    return (
        <Modal
            open={true}
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
                                <p className={cx('p-selected')}>Công khai</p>
                                <ChevronDownIcon width={"2.4rem"} height={"2.4rem"} />
                            </div>
                            {select && (
                                <>
                                <div className={cx('div-select-mask')}></div>
                                <ul className={cx('ul-option-container')}>
                                    {SELECT_OPTIONS.map((item, index) => (
                                        <Select key={index} title={item.title} description={item.description} />
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
                    <button className={cx('button-save')}>Xong</button>
                </div>
            </div>
        </Modal>
    );
}

export default Privacy;
