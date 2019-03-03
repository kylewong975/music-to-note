import React, { Component } from 'react';
import './App.css';
import UploadAudio from './components/upload_audio';
import SheetMusicDisplay from './components/sheet_music_display';
import { Typography } from '@material-ui/core';


class App extends Component {
    state = {
        music: 'X:1\nT: Example\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD"'
    }
    componentDidMount(){
        this.setState({
            music: 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n'
        });
    }
    render() {
        return (
            <div className="app">
                <Typography variant="h2">
                    Music 2 Note
                </Typography>
                <UploadAudio />
                <SheetMusicDisplay tune={this.state.music}/>
            </div>
        );
    }
}

export default App;
