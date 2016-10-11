import * as hellojs from 'hellojs';
import {HEADER_HEIGHT} from '../shared/constants';
import {playCameraSound} from '../shared/audio';
import HomePage from './home';
import SharePage from './share';
import {PAGES} from '../shared/constants';
import {showPage, showPrompt} from '../shared/helpers';

const hello = hellojs.default;
const PAGE_NAME = PAGES.SNAPSHOT;

let backBtn = document.getElementById('btn-back-snapshot');
let tweetButton = document.getElementById('btn-share-twitter');
let drawingCanvas = document.getElementById('canvas-draw');
let saveCanvas = document.getElementById('canvas-save');
let saveImage = document.getElementById('image-save');
let saveCtx = saveCanvas.getContext('2d');
let video = document.querySelector('video');

function initControls() {

  tweetButton.addEventListener('click', () => {

    hello('twitter').login()
      .then(res => {
        console.log('Logged into Twitter', res);
        SharePage.show({username: res.authResponse.screen_name});

      }, err => {
        console.error('Error logging in to Twitter', err);
      });
  });


  backBtn.addEventListener('click', () => {
    HomePage.show();
  });

}

export default {

  init: function () {
    initControls();
  },

  show: function () {

    playCameraSound();

    saveCanvas.width  = video.videoWidth;
    saveCanvas.height = video.videoHeight;

    // Copy video and annotations onto a single canvas for saving
    saveCtx.drawImage(video, 0, 0);
    saveCtx.drawImage(drawingCanvas, 0, 0);

    saveCtx.font = '16px Arial';
    saveCtx.fillStyle = '#fff';

    // Add the URL at the bottom
    saveCtx.fillText('snapw.at', saveCanvas.width - 72, saveCanvas.height - 15);
    
    saveImage.src = saveCanvas.toDataURL('image/png');
    saveImage.style.display = 'block';

    showPage(PAGE_NAME);

  }

};
