import React from 'react';
import './Block.css'

interface BlockProps {
    login: string;
    pw: string
}

const Block: React.FC<BlockProps> = ({ login, pw }) => {
    return (
        <>
        <div className="block-box">
            <p className='log-text'>{login}</p>
            <p className='pw-text'>{pw}</p>
        </div>
        </>
    );
};

export default Block;
