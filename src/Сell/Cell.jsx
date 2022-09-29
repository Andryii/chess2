import React from 'react';
import CellStyle from "./Cell.module.css"
const Cell = ({cellsize, parity, figure}) => {
    return (
        <div  style={{ height: cellsize, width: cellsize }} className={[CellStyle.Cell, CellStyle[parity]].join(' ') }>
            
        </div>
    );
};

export default Cell;