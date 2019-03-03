import React, { Component } from 'react';
import abcjs from "abcjs/midi";
import './styles/sheet_music_display.css';

export class SheetMusicDisplay extends Component {
    options = {
        viewportHorizontal: true,
        responsive: 'resize',
    }
    componentDidUpdate(props){
        abcjs.renderAbc("sheet", props.tune.join(' '), this.options);
    }
    render() {
        return (
            <div id="sheet"></div>
        )
    }
}

export default SheetMusicDisplay
