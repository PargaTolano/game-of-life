function randomBit(){
    return Math.random() <.5 ? 0 : 1;
}

const DIRECTIONS = [
    [ 1, 0],[-1, 0],
    [ 0, 1],[ 0,-1],
    [ 1, 1],[ 1,-1],
    [-1, 1],[-1,-1]
];

class Grid {
    m_data=[]
    m_width;
    m_height;

    constructor(width, height){
        this.m_width=width;
        this.m_height=height;
        this.clear();
    }

    isCellSet(x,y){
        return this.m_data[x][y]===1;
    }
    toggleCell(x,y){
        this.m_data[x][y]=this.m_data[x][y]===0 ? 1: 0;
        return this.isCellSet(x,y);
    }
    
    simulate(){
        let sumtable=Array.from(Array(this.m_width), ()=>Array(this.m_height).fill(0));
        
        this.traverse((x,y)=>{
            DIRECTIONS.forEach(dir=>{
                if( ((x+dir[0]) > -1)                && 
                    ((x+dir[0]) <  this.m_width)     && 
                    ((y+dir[1]) > -1)                && 
                    ((y+dir[1]) <  this.m_height) 
                )
                    sumtable[x][y]+=this.m_data[x+dir[0]][y+dir[1]];
            });  
        });

        this.traverse((x,y)=>{
            if(sumtable[x][y] < 2 || sumtable[x][y] > 3)
                this.m_data[x][y] = 0;
            else if(sumtable[x][y] === 3)
                this.m_data[x][y] = 1;
        });
    }

    clear(){
        this.m_data=Array.from(Array(this.m_width), ()=>Array(this.m_height).fill(0));
    }
    resize(width, height){
        this.m_width=width;
        this.m_height=height;
        this.clear();
    }
    randomize(){
        this.m_data=Array.from(Array(this.m_width), ()=>Array(this.m_height).fill().map(()=>randomBit()));
    }

    /**
     * @param {Function} fn
     */
    traverse(fn){
        for(let x=0; x<this.m_width; x++)
            for(let y=0; y<this.m_height; y++){
                fn( x, y, this.m_data[x][y]);
            }
    }

    get w(){
        return this.m_width;
    }
    get h(){
        return this.m_height;
    }
}

export default Grid;