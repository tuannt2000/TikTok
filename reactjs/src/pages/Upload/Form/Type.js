import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useRef, useState } from "react";
import { ArrowSelectIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_SELECT = [
    {
        id: 1,
        title: 'Công khai',
        selected: true
    },
    {
        id: 2,
        title: 'Bạn bè',
        selected: false
    },
    {
        id: 3,
        title: 'Riêng tư',
        selected: false
    }
];

function Type() {
    const [showType, setShowType] = useState(false);
    const [type, setType] = useState(MENU_SELECT[0].title);

    const arrowIconRef = useRef();

    const handleClickSelect = () => {
        arrowIconRef.current.style.transform = !showType ?  'rotate(180deg)' : 'rotate(0deg)';
        setShowType(!showType);
    };

    const handleSetType = (type) => {
        setType(type.title);
        MENU_SELECT.forEach(result => {
            result.selected = false;

            if (type.id === result.id) {
                result.selected = true;
            }

            return result;
        })
    };

    return (
        <div className={cx('type-video')}>
            <div className={cx('title-type')}>
                <span>Ai có thể xem video này</span>
            </div>
            <div
                className={cx('type-select')}
                onClick={handleClickSelect}
            >
                <div className={cx('type-selector')}>
                    <div className={cx('type-selector-left')}>
                        <span>{type}</span>
                    </div>
                    <div
                        className={cx('type-selector-right')}
                        ref={arrowIconRef}
                    >
                        <ArrowSelectIcon />
                    </div>
                </div>
                <div className={cx('type-dropdown')}>
                    <div className={cx('select-dropdown', {'invisible': !showType})}>
                        {MENU_SELECT.map(result => (
                            <span
                                key={result.id}
                                className={cx('dropdown-item', {'is-selected' : result.selected})}
                                onClick={() => handleSetType(result)}
                            >{result.title}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Type;