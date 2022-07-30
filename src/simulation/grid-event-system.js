// composited object
/**
 * @type {Function[]}
 */
const listeners=[];

const addListener= listener => {
    listeners.push(listener);
};

const removeListener= listener => {
    const idx=listeners.indexOf(listener);
    listeners.splice(idx, 1);
};

const notifyChange=()=>{
    listeners.forEach(fn=>fn());
};

const gridEventSystem={
    addListener,
    removeListener,
    notifyChange
};

export default gridEventSystem;