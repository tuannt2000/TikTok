import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = 'false', onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);

    useEffect(() => {
        setHistory([]);
        setHistory(prev => [...prev, { data : items }]);
    }, [items]);

    const currentMenu = history[history.length - 1];
    console.log(history, items)

    const renderItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={
                        () => {
                            if (isParent) {
                                setHistory(prev => [...prev, item.children])
                            } else {
                                onChange(item)
                            }
                        }
                } />
            )
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={currentMenu.title} onBack={
                    () => {
                        setHistory(prev => prev.slice(0, prev.length - 1))
                    }
                } />}
                <div className={cx('menu-body')}>
                    {renderItems()}
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            placement='bottom-end'
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func 
};

export default Menu;