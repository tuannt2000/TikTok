import classNames from "classnames/bind";
import styles from "./Report.module.scss";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ArrowRightIcon, CloseIcon, ArrowLeftIcon } from "~/components/Icons";
import { MENU_REPORT } from "~/constants/Report";
import { useDispatch, useSelector } from "react-redux";
import { setReportVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Report() {
    const [history, setHistory] = useState([{ data: MENU_REPORT }]);
    const report = useSelector(state => state.video.report);

    const dispatch = useDispatch();

    const currentMenu = history[history.length - 1];

    const handleSetMenu = (data) => {
        const isParent = !!data.children;
        if (isParent) {
            setHistory((prev) => [...prev, data.children]);
        }
    };

    const handlePrevMenu = () => {
        setHistory((prev) => prev.slice(0, history.length - 1));
    };

    const renderItems = () => {
        if (currentMenu.data.length === 1) {
            return (
                <div className={cx("div-form-radio")}>
                    <div className={cx('div-title')}>
                        { currentMenu.data[0].title }
                    </div>
                    <div className={cx('div-sub-title')}>
                        Chúng tôi không cho phép:
                    </div>
                    { currentMenu.data.map((item, index) => (
                        <ul key={index} className={cx('div-list-report')}>
                            {item.report_text.map((result, report_index) => (
                                <li key={report_index} className={cx('list-item')} >
                                    <span>{ result }</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                    <div className={cx('div-footer')}>
                        <button className={cx('button-submit')}>Gửi</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={cx("div-form-radio")}>
                    <div className={cx("div-select-text")}>
                        Vui lòng chọn tình huống
                    </div>
                    { currentMenu.data.map((item, index) => (
                        <label
                            onClick={() => handleSetMenu(item)}
                            key={index}
                            className={cx("label-radio")}
                        >
                            <div className={cx("div-reason-text")}>{item.text}</div>
                            <ArrowRightIcon className={cx("arrow-right-icon")} />
                        </label>
                    ))}
                </div>
            );
        }
    };

    return (
        <Modal open={report}>
            <div className={cx("container")}>
                <div className={cx("modal")}>
                    <div className={cx("modal-wrapper")}>
                        <section>
                            <form>
                                <div className={cx("div-form-header")}>
                                    {history.length > 1 && (
                                        <div onClick={handlePrevMenu} className={cx("div-back")}>
                                            <ArrowLeftIcon />
                                        </div>
                                    )}
                                    <h4 className={cx("form-title")}>Báo cáo</h4>
                                    <div 
                                        className={cx("close-btn")}
                                        onClick={() => {
                                            dispatch(setReportVideo());
                                            setHistory((prev) => prev.slice(0, 1));
                                        }}
                                    >
                                        <CloseIcon />
                                    </div>
                                </div>
                                {renderItems()}
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Report;
