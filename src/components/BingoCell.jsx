import { useState } from 'react';
import './BingoCell.css';

const BingoCell = ({ number }) => {

    const [selected, setSelected] = useState(false);

    return (
        <div className="bingo-cell" onClick={()=>setSelected(prev => !prev)} >
            <div className={selected ? "covered-cell" : ""} >
                {number}
            </div>
        </div>
    );
}

export default BingoCell;