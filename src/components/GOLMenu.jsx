import React, { useState } from 'react';
import Grid from '../simulation/grid';

import {
    MdDeleteOutline,
    MdBrush,
    MdPlayArrow,
    MdOutlinePause,
    MdHeight
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

    const [playing, setPlaying] = useState(false);
    const [w, setW] = useState(grid.w);
    const [h, setH] = useState(grid.h);

    const onClickPlay = ()=>{
        grid.resume();
        setPlaying(true);
    };

    const onClickPause = ()=>{
        grid.pause_simulation();
        setPlaying(false);
    };

    const onClickRandomize = ()=>{
        grid.randomize();
    };

    const onClickClear = ()=>{
        grid.clear();
    };

    const onChangeW = e=>{
        try {
            let w = parseInt(e.target.value);
            grid.resize(w, grid.h);
            setW(w);
        } catch {
            if(e.target.value.length === 0){
                setW(0);
            } 
        }
    };

    const onChangeH = e=>{
        try {
            let h = parseInt(e.target.value);
            grid.resize(grid.w, h);
            setH(h);
        } catch {
            if(e.target.value.length === 0){
                setH(0);
            } 
        }
    };

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
                    value={w}
                    onChange={onChangeW}
                />
                <MdHeight className={styles.dimensionIcon}/>
                <input
                    className={styles.dimensionInput}
                    type='text'
                    value={h}
                    onChange={onChangeH}
                />
            </div>
        </nav>
    );
};

export default GOLMenu;