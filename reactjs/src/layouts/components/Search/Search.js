import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon, ClearSearchIcon } from '~/components/Icons';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '~/hooks';
import { useSelector, useDispatch } from "react-redux";
import { getResultSearch, setResultSearch } from '~/redux/actions/search';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult]   = useState(false);
    const search       = useSelector(state => state.search);
    const currentUser  = useSelector(state => state.user.currentUser);
    const dispatch     = useDispatch();
    const navigate     = useNavigate();
    const debounced    = useDebounce(searchValue, 500);
    const inputTextRef = useRef();

    useEffect(() => {
        if(!debounced.trim()){
            dispatch(setResultSearch());
            return;
        }

        dispatch(getResultSearch({q: debounced, navigate, logined: Object.keys(currentUser).length ? true : false}));
    }, [debounced, dispatch, navigate, currentUser]);

    const handleClear = () => {
        setSearchValue('');
        inputTextRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')){
            setSearchValue(searchValue);                                                                             
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult  && search.data.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tài khoản</h4>
                            {search.data.map(result => (
                                <AccountItem key={result.id} data={result}/>
                            ))}
                            <Link to={`/search`} className={cx('sug-more')}>
                                <p>Xem tất cả kết quả dành cho "{searchValue}"</p>
                            </Link>
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
                        onChange={handleChange}
                        value={searchValue}
                        ref={inputTextRef}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !search.isLoading && (
                        <button 
                        className={cx('clear')} 
                        onClick={handleClear}
                    >
                        <ClearSearchIcon />
                    </button>
                    )}                  
                    {search.isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <span className={cx('span-spliter')} />

                    <button className={cx('search-btn')} >
                        <SearchIcon />
                    </button>
                    <div className={cx('border-search')} />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;