// @flow strict

import type {Lesson} from '../services/content/types';

export const lessonWithVideo: Lesson = {
  _id: '5c3dfa39660b9b1278c0fb61',
  poster:
    '//static.coorpacademy.com/content/CoorpAcademy/content-partnerships-fabernovel/cockpit-fabernovel/default/vignette_fabernovel_new-1543482536203.png',
  description: 'Des données au service de tous',
  videoId: '303449523',
  mediaUrl:
    '//player.vimeo.com/external/266296680.hd.mp4?s=bb8ba7fa2f35cf447571022ca3007cb6437a373e&profile_id=175',
  downloadUrl:
    '//player.vimeo.com/external/303449523.sd.mp4?s=ee82aad8a793d94b289638b4bd8823c30964ba36&profile_id=164&oauth2_token_id=411503075',
  mimeType: 'application/vimeo',
  ref: 'les_E1TniqOCB',
  type: 'video',
  subtitles: [
    '//alanlanglois.net/https266296680hdmp4sbb8ba7fa2f35cf447571022ca3007cb6437a373eprofile_id175.de.vtt'
  ],
  posters: [],
  src: []
};

export const lessonWithPdf: Lesson = {
  _id: '5c3dfa39660b9b1278c0fb60',
  poster:
    '//static.coorpacademy.com/content/CoorpAcademy/content-partnerships-fabernovel/cockpit-fabernovel/default/image-support-de-cours-1543490353160.jpg',
  description: 'Des données au service de tous - PDF',
  mediaUrl:
    '//static.coorpacademy.com/content/CoorpAcademy/content-partnerships-fabernovel/cockpit-fabernovel/raw/fabernovel_data_fr_4a4_des-donnees-au-service-de-tous_vdef-1543484261461.pdf',
  mimeType: 'application/pdf',
  ref: 'les_E13dGsu0H',
  type: 'pdf',
  subtitles: [],
  posters: [],
  src: []
};
