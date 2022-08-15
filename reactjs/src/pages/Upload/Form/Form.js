import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Caption from './Caption';
import { useState } from 'react';
import { TickIcon } from '~/components/Icons';
import Button from "./Button";
import Switch from "./Switch";

const cx = classNames.bind(styles);

const MENU_CHECKBOX = [
    {
        id: 1,
        title: 'Bình luận',
        checked: true
    },
    {
        id: 2,
        title: 'Duet',
        checked: true
    },
    {
        id: 3,
        title: 'Stitch',
        checked: true
    }
];

function Form() {
    const [listCheckBox, setListCheckBox] = useState(MENU_CHECKBOX);

    const handleChangeCheckBox = (checkbox) => {
        const newState = [...listCheckBox];
        newState[checkbox.id - 1].checked = !checkbox.checked;
        setListCheckBox(newState);
    };

    return (
        <div className={cx('container')}>
            <Caption />
            <div className={cx('cover-image')}>
                <span className={cx('title-cover-image')}>Ảnh bìa</span>
                <div className={cx('cover-image-container-v2')}>
                    <div className={cx('cover-image-bg-container-v2')}>
                        <div className={cx('cover-image-candidate')} />
                    </div>
                </div>
            </div>
            <div className={cx('access-title')}>
                <span>Cho phép người dùng:</span>
            </div>
            <div className={cx('checkbox-container')}>
                {listCheckBox.map(result => (
                    <div key={result.id} className={cx('checkbox')}>
                        <div className={cx('css-ypesld')}>
                            <label className={cx('checkbox-title')} onClick={() => handleChangeCheckBox(result)}>
                                <span>{result.title}</span>
                            </label>
                            <div className={cx('css-4pkwts')}>
                                <input type={"checkbox"} className={cx('css-1pzrh5a')} checked={result.checked} onChange={() => handleChangeCheckBox(result)} />
                                <div className={cx('css-mbgljv', {'checked': result.checked})}>
                                    <TickIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Switch/>
            <Button/>
        </div>
    );
}

export default Form;