// @flow strict

import {createVideo, lessonWithPdf} from '../src/__fixtures__/lessons';
import utils from './utils';

const video = createVideo({});

describe('Lesson', () => {
  beforeAll(async () => {
    await utils.reloadApp();
  });

  describe('Lesson tab with many resources', () => {
    beforeAll(async () => {
      await waitFor(element(by.id('catalog-item-basic-dis-1'))).toBeVisible();
      await element(by.id('catalog-item-basic-dis-1')).tap();
    });

    it('should see lesson tab', async () => {
      await waitFor(utils.getLessonTab(element)).toBeVisible();
      await weExpect(utils.getLessonTab(element)).toBeVisible();
    });

    it('should be redirected to lesson tab', async () => {
      await utils.getLessonTab(element).tap();
      await waitFor(element(by.id('lesson-screen'))).toBeVisible();
      await waitFor(element(by.id('additional-stars-note'))).toBeVisible();
      await weExpect(element(by.id('video'))).toBeNotVisible();
      await weExpect(element(by.id('preview-video'))).toBeVisible();
      await weExpect(element(by.id('video'))).toBeNotVisible();
      await weExpect(element(by.id('video-replay'))).toBeNotVisible();
    });

    describe('Video', () => {
      it('should start the video', async () => {
        await element(by.id('preview-video')).tap();
        await waitFor(element(by.id('video-container'))).toBeVisible();
        await weExpect(element(by.id('video-container-container'))).toBeNotVisible();
        await weExpect(element(by.id('video-container'))).toBeVisible();
        await weExpect(element(by.id('video'))).toBeVisible();
        await weExpect(element(by.id('video-pause'))).toBeVisible();
        await weExpect(element(by.id('video-play'))).toBeNotVisible();
        await weExpect(element(by.id('video-seekbar'))).toBeVisible();
        await weExpect(element(by.id('video-timer'))).toBeVisible();
        await weExpect(element(by.id('video-fullscreen-expand'))).toBeVisible();
      });

      it('should pause the video', async () => {
        await element(by.id('video-pause')).tap();
        await weExpect(element(by.id('video-play'))).toBeVisible();
        await weExpect(element(by.id('video-pause'))).toBeNotVisible();
      });

      it('should resume the video', async () => {
        await element(by.id('video-play')).tap();
        await weExpect(element(by.id('video-play'))).toBeNotVisible();
        await weExpect(element(by.id('video-pause'))).toBeVisible();
      });

      it('should fast forward the video', async () => {
        await element(by.id('video-seekbar-pin')).swipe('right');
        await waitFor(element(by.id('video-replay'))).toBeVisible();
        await weExpect(element(by.id('video-replay'))).toBeVisible();
      });

      it('should replay the video', async () => {
        await element(by.id('video-replay')).tap();
        await weExpect(element(by.id('video-replay'))).toBeNotVisible();
        await weExpect(element(by.id('video'))).toBeVisible();
      });

      // This is not possible to test it with iOS native fullscreen

      // it('should expand the video', async () => {
      //   await element(by.id('video-fullscreen-expand')).tap();
      //   await waitFor(element(by.id('video-container-fullscreen'))).toBeVisible();
      //   await weExpect(element(by.id('video-container'))).toBeNotVisible();
      //   await weExpect(element(by.id('video-container-fullscreen'))).toBeVisible();
      //   await weExpect(element(by.id('video-fullscreen-shrink'))).toBeVisible();
      // });
      //
      // it('should shrink the video', async () => {
      //   await element(by.id('video-fullscreen-shrink')).tap();
      //   await waitFor(element(by.id('video-container'))).toBeVisible();
      //   await weExpect(element(by.id('video-container'))).toBeVisible();
      //   await weExpect(element(by.id('video-container-fullscreen'))).toBeNotVisible();
      //   await weExpect(element(by.id('video-fullscreen-expand'))).toBeVisible();
      // });
    });

    describe('Browser', () => {
      it('should see video selected', async () => {
        await waitFor(element(by.id(`resource-${video._id}-selected`))).toBeVisible();
        await waitFor(element(by.id(`resource-${video._id}-description`))).toBeVisible();
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-pdf-icon`))).toBeNotVisible();
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-video-icon`))).toBeVisible();
      });

      it('should scroll down to pdf', async () => {
        await waitFor(element(by.id('resources-scroller'))).toBeVisible();
        await element(by.id('resources-scroller')).swipe('up');
      });

      it('should select pdf', async () => {
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-description`))).toBeVisible();
        await element(by.id(`resource-${lessonWithPdf._id}-unselected`)).tap();
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-selected`))).toBeVisible();
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-pdf-icon`))).toBeVisible();
        await waitFor(element(by.id(`resource-${lessonWithPdf._id}-video-icon`))).toBeNotVisible();
      });
    });

    describe('PDF', () => {
      it('should see elements', async () => {
        await weExpect(element(by.id('preview-pdf'))).toBeVisible();
        await weExpect(element(by.id('preview-pdf-icon'))).toBeVisible();
        await weExpect(element(by.id('button-open-pdf'))).toBeVisible();
      });

      it('should open the pdf', async () => {
        await element(by.id('button-open-pdf')).tap();
        await waitFor(element(by.id('pdf-screen'))).toBeVisible();
        await weExpect(element(by.id('pdf-screen'))).toBeVisible();
      });

      it('should close the pdf', async () => {
        await weExpect(element(by.id('button-close'))).toBeVisible();
        await element(by.id('button-close')).tap();
        await waitFor(element(by.id('pdf-screen'))).toBeNotVisible();
        await weExpect(element(by.id('pdf-screen'))).toBeNotVisible();
        await weExpect(element(by.id('button-close'))).toBeNotVisible();
      });
    });
  });

  describe('Lesson tab with one resource only', () => {
    beforeAll(async () => {
      await element(by.id('header-back')).tap();
      await waitFor(element(by.id('catalog-item-no-clue-dis-1'))).toBeVisible();
      await element(by.id('catalog-item-no-clue-dis-1')).tap();
    });

    it('should not see resources browser', async () => {
      await waitFor(element(by.id('resources-scroller'))).toBeNotVisible();
    });
  });
});
