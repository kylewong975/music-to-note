import React, { Component } from 'react';
import swal from 'sweetalert';
import {IconButton, Card, LinearProgress} from '@material-ui/core';
import Audiotrack from '@material-ui/icons/Audiotrack';
import CloudUpload from '@material-ui/icons/CloudUpload';
import './styles/upload_audio.css';

let buttonStyle = {
    backgroundColor: '#bbbbee',
    margin: '10px',
};

let audio_form = new FormData();
let server_endpoint = 'http://httprelay.io/link/h53f';

export class UploadAudio extends Component {
    readFile = () => {
        let file = document.getElementById('upload-audio');
        audio_form.set("audio", file.files[0], file.value);
    }
    upload = () => {
        fetch(server_endpoint, 
            {method: "POST", body: audio_form})
        .then(response => {
            swal("Uploaded!", "File has been uploaded!", "success");
            this.props.uploadCallback('X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|');
        });
        
        // this.props.uploadCallback('X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n');
        // this.props.uploadCallback('X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n');
    }
    record = () => {
        swal("Recorded!", "Audio has been recorded!", "success");
    }
    render() {
        return (
            <Card className="button-holder">
                <IconButton style={buttonStyle} onClick={this.record}>
                    <Audiotrack/>
                </IconButton>
                <label>              
                    <IconButton style={buttonStyle} onClick={this.upload}>          
                        <CloudUpload/>
                    </IconButton>
                    <input type="file" id="upload-audio" onChange={this.readFile} />
                </label>
            </Card>
        )
    }
}

export default UploadAudio