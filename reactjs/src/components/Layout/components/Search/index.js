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
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputTextRef = useRef();

    useEffect(() => {
        if(!debounced.trim()){
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [debounced]);

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
                            {searchResult.map(result => (
                                <AccountItem 
                                    key={result.id} 
                                    data={result}
                                />
                            ))}
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
                    {!!searchValue && !loading && (
                        <button 
                        className={cx('clear')} 
                        onClick={handleClear}
                    >
                        <ClearSearchIcon />
                    </button>
                    )}                  
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
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