import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import { CheckboxIcon } from '~/components/Icons';
import Avatar from '~/components/Avatar';

const cx = classNames.bind(styles);

function UserItem({ data, handleClick }) {

    return (
        <div 
            className={cx('div-user-item-container')}
            onClick={() => handleClick(data.id)} 
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
                            onChange={() => handleClick(data.id)} 
                            className={cx('input-checkbox', {"active": data.check})}
                            checked={data.check}
                            value={data.id}
                        />
                        {data.check && (
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