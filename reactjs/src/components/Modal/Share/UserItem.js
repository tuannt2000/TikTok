import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import { CheckboxIcon } from '~/components/Icons';
import { useState } from 'react';
import Avatar from '~/components/Avatar';

const cx = classNames.bind(styles);

function UserItem({ data }) {
    const [check, setCheck] = useState(false)

    return (
        <div 
            className={cx('div-user-item-container')}
            onClick={() => setCheck(!check)} 
        >
            <div className={cx('div-user-item')}>
                <Avatar to={false} size={48} data={data} />
                <div className={cx('div-right-part')}>
                    <div className={cx('div-nickname-container')}>
                        <span className={cx('span-nickname')}>{ data.full_name }</span>
                    </div>
                    <p className={cx('p-unique-id')}>{ data.nickname }</p>
                </div>
            </div>
            <div className={cx('div-checkbox-container')}>
                <label className={cx('label-checbox')}>
                    <div className={cx('div-checkbox-symbol')}>
                        <input 
                            type={"checkbox"} 
                            onChange={() => setCheck(!check)} 
                            className={cx('input-checkbox', {"active": check})}
                            checked={check}
                            value={data.id}
                        />
                        {check && (
                            <div className={cx('div-checkbox-icon')}>
                                <CheckboxIcon />
                            </div>
                        )}
                    </div>
                </label>
            </div>
        </div>
    );
}

export default UserItem;