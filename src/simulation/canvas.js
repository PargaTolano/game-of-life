import Grid from './grid';

class Canvas {
    /**
     * @type {HTMLCanvasElement}
     */
    el;
    /**
     * @type {Grid}
     */
    grid;
    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    lineWidth;
    
    constructor(el, grid, w, h, lineWidth){
        this.el=el;
        this.grid=grid;
        this.el.width=w;
        this.el.height=h;
        this.lineWidth=lineWidth;
        this.ctx=el.getContext('2d');
    }

    set w(width){
        this.el.width=width;
    }
    get w(){
        return this.el.width;
    }

    set h(height){
        this.el.height=height;
    }
    get h(){
        return this.el.height;
    }

    toggleCell(x,y, offColor, onColor){
        this.fillCell(x, y, this.grid.toggleCell(x,y) ? onColor: offColor);
    }

    fillCell(x,y, color){
        const stepx = this.w / this.grid.w;
        const stepy = this.h / this.grid.h;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * stepx,
            y * stepy,
            this.w/this.grid.w, 
            this.h/this.grid.h
        );
    }

    fillGrid(offColor, onColor){
        this.grid.traverse( (x,y,v) => void 
            this.fillCell(x, y, v===0 ? offColor: onColor)
        );
    }

    drawGrid(color){
        // const ctx = this.ctx;
        // const w = this.w;
        // const h = this.h;
        // const grid = this.grid;
        
        // const rstep = w/grid.w;
        // const cstep = h/grid.h;

        // ctx.strokeStyle=color;
        // ctx.lineWidth=this.lineWidth;
        
        // // o(m+n) -> m = row_count; n = column_count
        // for(let r = rstep; r < w-1; r+= rstep){
        //     ctx.moveTo(r, 0);
        //     ctx.lineTo(r, h);
        // }
        // for(let c = cstep; c < h-1; c+= cstep){
        //     ctx.moveTo(0, c);
        //     ctx.lineTo(w, c);
        // }
        // ctx.stroke();
    }

    clear(color){
        this.el.width=this.el.width;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.w, this.h);
    }
}

export default Canvas;