import React, { useEffect, useRef, useState } from 'react';
import useForcedUpdate from '../hooks/useForcedUpdate';
import styles from '../styles/GOLGrid.module.css';
import Grid from '../simulation/grid';

let isMouseDown = false;
/**
 * @type {Grid}
 */

const GOLGridItem = ({grid, idx, active})=>{
    const gridClass = active ? styles.gridItemActive : styles.gridItem;
    const onClick = ()=>{
        grid.toggleCell(idx);
    };
    const onMouseEnter = ()=>{
        if( !isMouseDown )
            return;
        grid.toggleCell(idx);
    };

    return (
        <div 
            draggable={false}
            className={gridClass}
            onMouseDown={onClick}
            onMouseEnter={onMouseEnter}
        ></div>
    );
};

const GOLGrid = ({grid}) => {
    const gridUIRef = useRef();
    const [data, setData] = useState(grid.data);

    const forceUpdate = useForcedUpdate();
    
    const onChangeGrid = x=>{
        setData(x);
        forceUpdate();
    };

    useEffect(()=>{
        const onMouseDown = ()=>isMouseDown=true;
        const onMouseUp = ()=>isMouseDown=false;
        gridUIRef.current.addEventListener('mousedown', onMouseDown);
        gridUIRef.current.addEventListener('mouseup', onMouseUp)

        //grid event
        grid.addChangeListener(onChangeGrid);
        
        return ()=>{
            gridUIRef.current.removeEventListener('mousedown', onMouseDown);
            gridUIRef.current.removeEventListener('mouseup', onMouseUp);
            grid.removeChangeListener(onChangeGrid);
        };
    },[]);

    const gridClass = `${styles.grid} ${grid.pause && styles.editing}`
    return (
        <div className={styles.gridFlexer}>
            <div className={styles.gridContainer}>
                <div
                    ref={gridUIRef}
                    draggable={false}
                    style={{
                        gridTemplateRows: `repeat(${grid.h},1fr)`, 
                        gridTemplateColumns: `repeat(${grid.w},1fr)`,
                        aspectRatio : `${grid.w} /  ${grid.h}`,
                        width: grid.w >= grid.h ? '100%' : 'auto',
                        height: grid.w >= grid.h ? 'auto' : '100%'
                    }} 
                    className={gridClass}
                >
                    {
                        data.map((x,i)=>
                            <GOLGridItem 
                                key={i} 
                                active={x}
                                grid={grid}
                                idx={i}
                            />
                        )
                    }
                </div>
            </div>
        </div>
        
    );
};

export default GOLGrid;