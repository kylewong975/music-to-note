import React, { Component } from 'react';
import './App.css';
import UploadAudio from './components/upload_audio';
import SheetMusicDisplay from './components/sheet_music_display';
import { Typography } from '@material-ui/core';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDk8JlKOhj0xAc8HM5Q9gDwvybpQta90D4",
    authDomain: "hacktech2019-233403.firebaseapp.com",
    databaseURL: "https://hacktech2019-233403.firebaseio.com",
    projectId: "hacktech2019-233403",
    storageBucket: "hacktech2019-233403.appspot.com",
    messagingSenderId: "1080115241329"
};

firebase.initializeApp(config);
const db = firebase.database();

const freq_to_note = {
    19600:  ` G ` ,
    20765:  ` ^G ` ,
    22000:  ` A ` ,
    23308:  ` ^A ` ,
    24694:  ` B ` ,
    26163:  ` c ` ,
    27718:  ` ^c ` ,
    29366:  ` d ` ,
    31113:  ` ^d ` ,
    32963:  ` e ` ,
    34923:  ` f ` ,
    36999:  ` ^f ` ,
    39200:  ` g ` ,
    41530:  ` ^g ` ,
    44000:  ` a ` ,
    46616:  ` ^a ` ,
    49388:  ` b ` ,
    52325:  ` c' ` ,
    55437:  ` ^c' ` ,
    58733:  ` d' ` ,
    62225:  ` ^d' ` ,
    65925:  ` e' ` ,
    69846:  ` f' ` ,
}

function get_note(frequency){
    let temp = 0;
    let keys = Object.keys(freq_to_note);
    for(let i = 0; i < keys.length; i++){
        if(frequency > keys[i]){
            temp = keys[i];
        }else{
            return (keys[i] - frequency < frequency - temp) ? freq_to_note[keys[i]] : freq_to_note[temp];
        }
    }
}
// 'X:1\nT: Example\nM: 4/4\nL: 1/8\nR: reel\nK: C\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG'

class App extends Component {
    state = {
        music: []
    };

    componentDidMount(){
        const noteRef = db.ref().child('note');
        noteRef.on('value', snap => {
            this.setState( state => {
                state.music.push( get_note(snap.val()*100) )
                return {
                    music: state.music
                }
            })});
    }

    update = (param) => {
    }

    render() {
        return (
            <div className="app">
                <Typography variant="h2">
                    Music 2 Note
                </Typography>
                <UploadAudio uploadCallback={this.update}/>
                <SheetMusicDisplay tune={this.state.music}/>
            </div>
        );
    }
}

export default App;
