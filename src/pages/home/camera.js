import webrtcAdapter from 'webrtc-adapter';
import {HEADER_HEIGHT} from '../../shared/constants';

let video = document.querySelector('video');

function alertUnsupported() {
  alert('Oh no! Your browser does not appear to have camera support (getUserMedia) ' +
        'or there was a problem initiating it. Sorry, I am still working on alternatives!');
}

export default function init() {

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alertUnsupported();
    return;
  }

  navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((stream) => {

      let videoTracks = stream.getVideoTracks();

      console.log('Using video device: ' + videoTracks[0].label);

      stream.oninactive = function() {
        console.log('Stream inactive');
      };

      video.srcObject = stream;

    })
    .catch((err) => {
      console.error('getUserMedia error', err);
      alertUnsupported();
    });

}
