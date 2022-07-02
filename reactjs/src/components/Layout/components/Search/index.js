import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon, ClearSearchIcon } from '~/components/Icons';
import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const inputTextRef = useRef();

    useEffect(() => {
        setSearchResult([1, 2, 3])
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        inputTextRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false);
    }

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input 
                        placeholder="Tìm kiếm tài khoản và video" 
                        spellCheck={false} 
                        className={cx('search-input')} 
                        onChange={e => {
                            setSearchValue(e.target.value);                                                                             
                        }}
                        value={searchValue}
                        ref={inputTextRef}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue && (
                        <button 
                        className={cx('clear')} 
                        onClick={handleClear}
                    >
                        <ClearSearchIcon />
                    </button>
                    )}                  
                    {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                    <span className={cx('span-spliter')}></span>

                    <button className={cx('search-btn')} >
                        <SearchIcon />
                    </button>
                    <div className={cx('border-search')}></div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;