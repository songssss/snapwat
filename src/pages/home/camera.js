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

  const maxWidth = video.clientWidth;
  const maxHeight = video.clientHeight - HEADER_HEIGHT;

  const constraints = {
    width: {ideal: maxWidth, max: maxWidth},
    height: {ideal: maxHeight, max: maxHeight}
  };

  navigator.mediaDevices.getUserMedia({audio: false, video: constraints})
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
