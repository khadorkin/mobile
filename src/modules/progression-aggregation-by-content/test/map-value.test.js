import aggregations from '..';
import {pipe, set, unset} from 'lodash/fp';

const {mapValue} = aggregations;
const PROGRESSION = require('./fixtures/progression');

describe('progression-aggregation-by-content | mapValue', () => {
  it('should check meta', () => {
    expect(() =>
      pipe(
        unset('content.meta'),
        mapValue
      )({content: PROGRESSION})
    ).toThrow(new Error('progression.meta is required for aggregations'));
  });

  it('should map progression without state to default completion value', () => {
    expect(
      pipe(
        unset('content.state'),
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
      stars: 0,
      updatedAt: PROGRESSION.meta.updatedAt
    });
  });

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
      stars: 0,
      success: false,
      updatedAt: PROGRESSION.meta.updatedAt
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
      stars: 0,
      updatedAt: PROGRESSION.meta.updatedAt
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
      stars: 0,
      updatedAt: PROGRESSION.meta.updatedAt
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
      stars: 0,
      updatedAt: PROGRESSION.meta.updatedAt
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
      stars: 0,
      updatedAt: PROGRESSION.meta.updatedAt
    });
  });
});
