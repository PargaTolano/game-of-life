import React, { useEffect, useState } from 'react';
import useCanvas from '../hooks/useCanvas';

import styles from '../styles/CanvasGrid.module.css';

const getOffset = (el)=>{
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };  
};

const unlitColor='#1A3C40';
const litColor='#93C8C5';
const gridColor="#EDE6DB";

const GanvasGrid = ({grid}) => {
    const {
        canvas, 
        gridDimemsions
    } = useCanvas(styles.canvas, grid, 0);

    const onClick = e=>{
        const offset = getOffset(canvas.el);
        let rx = e.clientX-offset.left;
        let ry = e.clientY-offset.top;

        rx/=canvas.w;
        ry/=canvas.h;
        rx*=grid.w;
        ry*=grid.h;
        rx = Math.floor(rx);
        ry = Math.floor(ry);

        canvas.clear(unlitColor);
        canvas.toggleCell(rx, ry, unlitColor, litColor);
        canvas.fillGrid(unlitColor, litColor);
        canvas.drawGrid(gridColor);
    };

    return (
        <div className={styles.canvasContainer}>
            <canvas 
                className={styles.canvas}
                onClick={onClick}
            ></canvas>
        </div>
    );
        
}

export default GanvasGrid;