import React, { Component } from 'react';
import swal from 'sweetalert';
import {IconButton, Card, LinearProgress} from '@material-ui/core';
import Audiotrack from '@material-ui/icons/Audiotrack';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Edit from '@material-ui/icons/Edit';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Refresh from '@material-ui/icons/Refresh';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import './styles/upload_audio.css';

let buttonStyle = {
    backgroundColor: '#bbbbee',
    margin: '10px',
};

let audio_form = new FormData();
let server_endpoint = 'http://httprelay.io/link/h53f';

export class UploadAudio extends Component {
    state = {
        isStart: true,
        currTitle: '',
    };

    readFile = () => {
        let file = document.getElementById('upload-audio');
        audio_form.set("audio", file.files[0], file.value);
    }

    start = () => {
        this.setState({
            isStart: false,
        });
        let params = {
            shouldPullFromFirebase: true,
        };
        this.props.uploadCallback(params);
    }

    pause = () => {
        this.setState({
            isStart: true,
        });
        let params = {
            shouldPullFromFirebase: false,
        };
        this.props.uploadCallback(params);
    }

    cloudDownload = () => {
      swal({
          buttons: {
              cancel: {
                  text: 'No',
                  visible: true,
              },
              confirm: {
                  text: 'Yes',
                  visible: true,
              },
          },
          text: 'Are you sure you want to download PDF?',
      }).then(confirmDownload => {
          if(confirmDownload) {
              this.props.convertToPdf();
          }
      });
    }

    restartSheet = () => {
        swal({
            buttons: {
                cancel: {
                    text: 'No',
                    visible: true,
                },
                confirm: {
                    text: 'Yes',
                    visible: true,
                },
            },
            text: 'Are you sure you want to restart the music sheet?',
        }).then(confirmRestart => {
            if(confirmRestart) {
                this.props.restartSheet();
            }
        });
    }

    editTitle = () => {
        swal({
            content: "input",
            buttons: {
                cancel: {
                    text: 'Cancel',
                    value: this.state.currTitle ? this.state.currTitle : '',
                    visible: true,
                },
                confirm: {
                    text: 'Save',
                    visible: true,
                },
            },
            text: 'Edit Music Sheet Title',
        }).then(title => {
            this.props.editTitle(title);
            this.setState({
                currTitle: title,
            })
        });
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

    getListings = () => {
      swal({
          text: 'Browse some sheet music on eBay!',
          content: "input",
          button: {
            text: "Search!",
            closeModal: false,
          },
      })
          .then(name => {
              if (!name) throw null;
              let maxItems = 3;
              let query = 'sheet music'
              let url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${maxItems}`;
              fetch(url, {
                  method: 'get',
              });
              swal(
                  '',
                  'Top recommendation: 1864 Stephen Foster Sheet Music - "Beautiful Dreamer"; $6.00',
                  "success"
              );
          });
    }

    render() {
        return (
            <Card className="button-holder">
                {this.state.isStart ? (
                    <Tooltip title="Start Recording">
                        <IconButton style={buttonStyle} onClick={this.start}>
                            <PlayArrow/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Pause Recording">
                        <IconButton style={buttonStyle} onClick={this.pause}>
                            <Pause/>
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip title="Restart Music Sheet">
                    <IconButton style={buttonStyle} onClick={this.restartSheet}>
                        <Refresh/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Title">
                    <IconButton style={buttonStyle} onClick={this.editTitle}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                    <IconButton style={buttonStyle} onClick={this.record}>
                        <Audiotrack/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Download Music Sheet">
                    <IconButton style={buttonStyle} onClick={this.cloudDownload}>
                        <CloudDownload/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Browse Music Sheets">
                    <IconButton style={buttonStyle} onClick={this.getListings}>
                        <ShoppingCart/>
                    </IconButton>
                </Tooltip>
            </Card>
        )
    }
}

export default UploadAudio
