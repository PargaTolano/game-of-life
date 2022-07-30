import { useEffect, useState } from 'react';
import Canvas from '../simulation/canvas';
import gridEventSystem from '../simulation/grid-event-system';

const unlitColor='#1A3C40';
const litColor='#93C8C5';
const gridColor="#EDE6DB";

const useCanvas= (classname, grid, lineWidth=0.25)=>{
    const[canvas, setCanvas] = useState(null);
    const[gridDimemsions, setGridDimemsions] = useState({w:grid.w, h:grid.h});
    useEffect(()=>{

        const canvasElement=document.getElementsByClassName(classname)[0];
        const canvasParent=canvasElement.parentElement;

        let ncanvas = new Canvas(
            document.getElementsByClassName(classname)[0], 
            grid, 
            canvasParent.clientWidth, 
            canvasParent.clientHeight,
            lineWidth
        );
        setCanvas(ncanvas);

        const listener=()=>{
            setGridDimemsions({w: grid.w, h: grid.h});
            ncanvas.clear(unlitColor);
            ncanvas.fillGrid(unlitColor,litColor);
            ncanvas.drawGrid(gridColor);
        };

        listener();
        gridEventSystem.addListener(listener);

        return ()=>{
            gridEventSystem.removeListener(listener);
        };
    },[]);

    return {
        canvas,
        gridDimemsions
    };
};

export default useCanvas;