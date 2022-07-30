import { useEffect, useState } from 'react';
import gridEventSystem from '../simulation/grid-event-system';

const useGridSimulation=(grid, _refresh=300)=>{

    const [refresh, setRefresh]=useState(_refresh);
    const [timer, setTimer]=useState(null); 
    const [playing, setPlaying] = useState(false);

    useEffect(()=>{
        if(timer){
            clearInterval(timer);
            setTimer(null);
        }

        if(playing){
            const simulate=()=>{
                grid.simulate();
                gridEventSystem.notifyChange();
            };
            setTimer(setInterval(simulate,refresh));
        }
    },[playing, refresh]);

    const onClickPlay = ()=>{
        setPlaying(true);
    };

    const onClickPause = ()=>{
        setPlaying(false);
    };

    const onClickRandomize = ()=>{
        if(playing) 
            return;
        grid.randomize();
        gridEventSystem.notifyChange();
    };

    const onClickClear = ()=>{
        if(playing) 
            return;
        grid.clear();
        gridEventSystem.notifyChange();
    };

    const onChangeW = e=>{
        if(e.target.value.length === 0){
            grid.resize(1, grid.h);
            gridEventSystem.notifyChange();
            return;
        }
        let w = parseInt(e.target.value);
        grid.resize(w, grid.h);
        gridEventSystem.notifyChange();
    };

    const onChangeH = e=>{
        if(e.target.value.length === 0){
            grid.resize(grid.w, 1);
            gridEventSystem.notifyChange();
            return;
        }
        let h = parseInt(e.target.value);
        grid.resize(grid.w, h);
        gridEventSystem.notifyChange();
    };

    const onChangeRefresh = e=>{
        if(e.target.value.length === 0){
            setRefresh(1);
            return;
        }
        let r = parseInt(e.target.value);
        setRefresh(r);
    };

    return {
        playing,
        onChangeRefresh,
        refresh,
        onClickPlay,
        onClickPause,
        onClickRandomize,
        onClickClear,
        onChangeW,
        onChangeH
    }
};

export default useGridSimulation;
