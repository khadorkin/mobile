const {pipe, set, unset} = require('lodash/fp');
const {mapValue} = require('..');
const PROGRESSION = require('./fixture');

describe('progression-aggregation-by-content | mapValue', () => {
  it('should map progression to completion value', () => {
    expect(
      pipe(
        set('content.state.step.current', 4),
        mapValue
      )({content: PROGRESSION})
    ).toEqual({
      content: {
        version: '1',
        ref: '1.A1',
        type: 'chapter'
      },
      latestNbQuestions: 3,
      success: false,
      latestDate: PROGRESSION.meta.updatedAt
    });

    expect(
      pipe(
        unset('content.content.version'),
        mapValue
      )({content: PROGRESSION})
    ).toEqual({
      content: {
        version: '1',
        ref: '1.A1',
        type: 'chapter'
      },
      latestNbQuestions: 0,
      success: false,
      latestDate: PROGRESSION.meta.updatedAt
    });

    expect(
      pipe(
        set('content.state.step.current', 0),
        mapValue
      )({content: PROGRESSION})
    ).toEqual({
      content: {
        version: '1',
        ref: '1.A1',
        type: 'chapter'
      },
      latestNbQuestions: 0,
      success: false,
      latestDate: PROGRESSION.meta.updatedAt
    });

    expect(
      pipe(
        set('content.state.step.current', 4),
        set('content.state.nextContent.type', 'failure'),
        mapValue
      )({content: PROGRESSION})
    ).toEqual({
      content: {
        version: '1',
        ref: '1.A1',
        type: 'chapter'
      },
      latestNbQuestions: 0,
      success: false,
      latestDate: PROGRESSION.meta.updatedAt
    });

    expect(
      pipe(
        set('content.state.step.current', 4),
        set('content.state.nextContent.type', 'success'),
        mapValue
      )({content: PROGRESSION})
    ).toEqual({
      content: {
        version: '1',
        ref: '1.A1',
        type: 'chapter'
      },
      latestNbQuestions: 3,
      success: true,
      latestDate: PROGRESSION.meta.updatedAt
    });
  });
});
