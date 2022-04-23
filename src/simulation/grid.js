const DIRECTIONS = [
    [ 1, 0],
    [-1, 0],
    [ 0, 1],
    [ 0,-1],
    [ 1, 1],
    [ 1,-1],
    [-1, 1],
    [-1,-1]
];

function randomBit(){
    return Math.random() <.5 ? 0 : 1;
}

class Grid {
    data;
    w;
    h;
    refresh;
    pause;

    changeListeners = [];

    constructor(w, h, refresh = 100){
        this.data = Array.apply(null, Array(w*h)).fill(0);
        this.w = w;
        this.h = h;
        this.refresh = refresh;
        this.pause = true;
    }
    toggleCell(idx){
        if(!this.pause)
            return;
        this.data[idx]=this.data[idx] === 0 ? 1 : 0;
        this.onChange();
    }
    // O(mn) time O(mn) space
    simulate(){
        let w = this.w;
        let h = this.h;
        let sums = Array.apply(null, Array(w*h)).fill(0);
        for(let i = 0; i < w; i++){
            for(let j = 0; j < h; j++){
                let sum = 0;
                for( let dir of DIRECTIONS ){
                    if( (i+dir[0] > -1)     && 
                     (i+dir[0] < w)         && 
                     (j+dir[1] > -1)        && 
                     (j+dir[1] < h) 
                    ){
                        let row = (i+dir[0])*w;
                        sum+=this.data[row+(j+dir[1])];
                    }
                }
                sums[i*w+j] = sum;
            }
        }
        for(let i = 0; i < w; i++){
            for(let j = 0; j < h; j++){
                let row = i*w;
                if(sums[row+j] < 2 || sums[row+j]>3){
                    this.data[row+j] = 0;
                }
                else if(sums[row+j] === 3){
                    this.data[row+j] = 1;
                }
            }
        }

        this.onChange();
    }

    simulate_recurrent(){
        let that = this;
        const recur = ()=>{
            if(that.pause)
                return;
            that.simulate();
            setTimeout(recur, that.refresh);
        };
        requestAnimationFrame(recur);
    }

    pause_simulation(){
        this.pause = true;
        this.onChange();
    }

    resume(){
        this.pause = false;
        this.simulate_recurrent();
    }

    clear(){
        if (!this.pause)
            return;
        this.data = this.data.map(()=>0);
        this.onChange(this.data);
    }

    randomize(){
        if (!this.pause)
            return;
        this.data = this.data.map( () => randomBit());
        this.onChange(this.data);
    }

    resize(w,h){
        if(!this.pause)
            return;

        this.w = w;
        this.h = h;
        this.data = Array.apply(null, Array(w*h)).fill(0);
        this.onChange(); 
    }

    //events
    onChange(){
        for(let list of this.changeListeners){
            list(this.data);
        }
    }

    addChangeListener(x){
        this.changeListeners.push(x);
    }

    removeChangeListener(x){
        let idx = this.changeListeners.indexOf(x)
        this.changeListeners.splice(idx,1);
    }
}

export default Grid;