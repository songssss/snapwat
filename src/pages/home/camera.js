import webrtcAdapter from 'webrtc-adapter';
import {HEADER_HEIGHT} from '../../shared/constants';
import {showPrompt} from '../../shared/helpers';

let video = document.querySelector('video');

function showUnsupported() {
  showPrompt('webrtc-unsupported');
}

function initCameraStream() {

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showUnsupported();
    return;
  }

  navigator.mediaDevices.getUserMedia({audio: false, video: {
    width: {ideal: video.clientWidth},
    height: {ideal: video.clientHeight}
  }})
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
      showUnsupported();
    });

}

export default function init() {
  initCameraStream();
}
