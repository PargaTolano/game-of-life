import React, { useState } from 'react';
import Grid from '../simulation/grid';
import useGridSimulation from '../hooks/useGridSimulation';

import {
    MdDeleteOutline,
    MdBrush,
    MdPlayArrow,
    MdOutlinePause,
    MdHeight,
    MdTimer
} from 'react-icons/md';

import {
    FaRandom
} from 'react-icons/fa';

import styles from '../styles/GOLMenu.module.css';

/**
 * 
 * @param {{grid: Grid}} props 
 * @returns 
 */
const GOLMenu = ({grid}) => {

    const {
        playing,
        refresh,
        onChangeRefresh,
        onClickPlay,
        onClickPause,
        onClickRandomize,
        onClickClear,
        onChangeW,
        onChangeH
    } = useGridSimulation(grid, 100);

    return (
        <nav className={styles.nav}>
            <div className={styles.actions}>
                {
                    playing ?
                    <MdOutlinePause 
                        className={styles.action}    
                        onClick={onClickPause}
                    />
                    :
                    <MdPlayArrow 
                        className={styles.action}   
                        onClick={onClickPlay} 
                    />
                }
                <FaRandom
                    className={styles.action} 
                    onClick={onClickRandomize}
                />
                <MdDeleteOutline 
                    className={styles.action}    
                    onClick={onClickClear}
                />
                <MdHeight 
                    className={styles.dimensionIcon} 
                    style={{
                        transform: 'rotate(90deg)'
                    }}
                />
                <input 
                    className={styles.dimensionInput}
                    type='text'
                    onChange={onChangeW}
                    defaultValue={grid.w}
                    disabled={playing}
                />
                <MdHeight className={styles.dimensionIcon}/>
                <input
                    className={styles.dimensionInput}
                    type='text'
                    onChange={onChangeH}
                    defaultValue={grid.h}
                    disabled={playing}
                />
                <MdTimer className={styles.dimensionIcon}/>
                <input
                    className={styles.dimensionInput}
                    type='text'
                    onChange={onChangeRefresh}
                    value={refresh}
                    disabled={playing}
                />
            </div>
        </nav>
    );
};

export default GOLMenu;