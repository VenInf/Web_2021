export class TetrisMap
{

    constructor(context, colors)
    {
        this.tetrisMap =[];
        this.scale = 32;
        this.context = context;
        this.colors = colors;
        for(let line = -2; line <= 20; ++line)
        {
            this.tetrisMap[line] = [];
            for(let column = 0; column <10; ++column)
            {
                this.tetrisMap[line][column] = 0;
            }
        }
    }

    addFigure(figure)
    {

        for(let i_y = 0; i_y<figure.matrix.length; i_y++)
        {
            for(let i_x = 0; i_x<figure.matrix[0].length;i_x++)
            {
                if(figure.matrix[i_y][i_x])
                {
                    let y = figure.cords.y+i_y;
                    let x = figure.cords.x+i_x;
                    this.tetrisMap[y][x] = figure.matrix[i_y][i_x];
                }
            }
        }
    }

    draw(figure)
    {
        for(let i_y = 0; i_y<figure.matrix.length; i_y++)
        {
            for (let i_x = 0; i_x < figure.matrix[0].length; i_x++)
            {
                if (figure.matrix[i_y][i_x])
                {
                    let y = figure.cords.y + i_y;
                    let x = figure.cords.x + i_x;
                    this.context.fillStyle = figure.color;
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale - 1, this.scale - 1);
                }
            }
        }

    }

    canPlace(currentFig)
    {
        for(let i_x = 0; i_x<currentFig.matrix.length; i_x++)
        {
            for (let i_y = 0; i_y < currentFig.matrix[0].length; i_y++)
            {
                let y = currentFig.cords.y + i_y;
                let x = currentFig.cords.x + i_x;

                if (currentFig.matrix[i_y][i_x])
                {
                    if (x < 0 || y+1  >= this.tetrisMap.length-1 || x >= this.tetrisMap[0].length || this.tetrisMap[y+1][x] )
                    {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    refreshMap()
    {
        for(let y = 0; y < this.tetrisMap.length; ++y)
        {
                for (let x = 0; x < this.tetrisMap[y].length; ++x)
                {
                    this.context.fillStyle = this.colors[this.tetrisMap[y][x]];
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale - 1, this.scale - 1);
                }
        }
    }

    deleteOldFig(currentFig)
    {
        for(let i_y = 0; i_y<currentFig.matrix.length; i_y++)
        {
            for(let i_x = 0; i_x<currentFig.matrix[0].length;i_x++)
            {
                if(currentFig.matrix[i_y][i_x])
                {
                    let y =currentFig.cords.y+i_y;
                    let x =currentFig.cords.x+i_x;

                    this.context.fillStyle = this.colors[0];
                    this.context.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
                }
            }
        }
    }
}