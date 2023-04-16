import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon, ClearSearchIcon } from '~/components/Icons';
import { useState, useEffect, useRef, memo } from 'react';
import { useDebounce } from '~/hooks';
import { useSelector, useDispatch } from "react-redux";
import { getResultSearch, setResultSearch } from '~/redux/actions/search';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult]   = useState(false);
    const search       = useSelector(state => state.search);
    const currentUser  = useSelector(state => state.user.currentUser);
    const dispatch     = useDispatch();
    const navigate     = useNavigate();
    const [searchParams] = useSearchParams();
    const debounced    = useDebounce(searchValue, 500);
    const inputTextRef = useRef();

    useEffect(() => {
        setSearchValue(searchParams.get('q') ? decodeURI(searchParams.get('q')) : '');
    }, [searchParams]);

    useEffect(() => {
        if(!debounced.trim()){
            dispatch(setResultSearch());
            return;
        }

        dispatch(getResultSearch({q: debounced, navigate, logined: Object.keys(currentUser).length ? true : false}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

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

    const handleSubmit = (e) => {
        if (e.keyCode === 13 && searchValue) {
            setShowResult(false);
            inputTextRef.current.blur();
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    q: encodeURI(searchValue)
                }).toString()
            });
        }
    }

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && search.data.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tài khoản</h4>
                            {search.data.map(result => (
                                <AccountItem hanleClick={() => setShowResult(false)} key={result.id} data={result}/>
                            ))}
                            <Link onClick={() => setShowResult(false)} 
                                to={{
                                    pathname: `/search`,
                                    search: createSearchParams({
                                        q: encodeURI(searchValue)
                                    }).toString()
                                }} 
                                className={cx('sug-more')}
                            >
                                <p>Xem tất cả kết quả dành cho "{searchValue}"</p>
                            </Link>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
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
                        onKeyDown={handleSubmit}
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

export default memo(Search);