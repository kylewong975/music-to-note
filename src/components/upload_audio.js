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
  

export class UploadAudio extends Component {
    upload = () => {
        swal("Uploaded!", "File has been uploaded!", "success");
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
                <IconButton style={buttonStyle} onClick={this.upload}>
                    <CloudUpload/>
                </IconButton>
            </Card>
        )
    }
}

export default UploadAudio
