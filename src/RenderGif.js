import React from 'react';
import './index.css';

class RenderGif extends React.Component {
    render() {
        const gifsArray = this.props.gifList
        console.log(gifsArray);
        
        return (
            <div className='flex-container'>
                <ul>
                    {gifsArray.map(gif => 
                        <li className='render-list'>
                            <img alt='gifs' src={gif} />
                    </li>)}
                </ul>
        </div>
    )
}
}

export default RenderGif;