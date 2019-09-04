// from https://github.com/CoorpAcademy/api-progression/blob/master/lambda/aggregations/completion.js#L28

const moment = require('moment');
const {assign, set, toNumber, getOr} = require('lodash/fp');

const takeMaxDate = (date1, date2) => {
  console.log(date1);
  console.log(date2);
  if (date1 === undefined) return date2;
  if (date2 === undefined) return date1;

  console.log(moment(date1));
  console.log(moment(date2));
  if (moment(date2).isAfter(date1)) {
    return date2;
  }
  return date1;
};

const reduce = (prevCompletion, nextCompletion) => {
  console.log('reduce');
  const latestDate = takeMaxDate(
    prevCompletion && prevCompletion.updatedAt,
    nextCompletion && nextCompletion.updatedAt
  );

  // if not found, document should be created
  if (!prevCompletion) {
    return nextCompletion;
  }

  if (prevCompletion.success === true) {
    if (nextCompletion.success === false)
      return assign(prevCompletion, {
        latestDate
      });

    // if existing document in dynamoDB is already in success we update only if new stars are greater than prev's
    if (prevCompletion.stars < nextCompletion.stars) {
      return assign(nextCompletion, {
        latestDate
      });
    }
    if (prevCompletion.stars > nextCompletion.stars) {
      return assign(prevCompletion, {
        latestDate
      });
    }

    if (moment(nextCompletion.updatedAt).isBefore(prevCompletion.updatedAt)) {
      return assign(prevCompletion, {
        latestDate
      });
    }

    return assign(nextCompletion, {
      latestDate
    });
  } else {
    // prevCompletion.success === false

    // if incoming document is in success it should be updated
    if (nextCompletion.success === true)
      return assign(nextCompletion, {
        latestDate
      });

    // if incoming document is older than the current one.
    if (
      nextCompletion.success === false &&
      moment(nextCompletion.updatedAt).isBefore(prevCompletion.updatedAt)
    ) {
      return assign(prevCompletion, {
        latestDate
      });
    }

    if (nextCompletion.success === false && nextCompletion.latestNbQuestions === 0) {
      // if incoming document is in failure (so completion 0) it should be updated
      return assign(nextCompletion, {
        latestDate
      });
    }
    // if incoming document version is higher it should be updated
    if (
      toNumber(getOr('1', 'content.version', prevCompletion)) <
      toNumber(getOr('1', 'content.version', nextCompletion))
    ) {
      return assign(nextCompletion, {
        latestDate
      });
    }
    if (
      toNumber(getOr('1', 'content.version', prevCompletion)) >
      toNumber(getOr('1', 'content.version', nextCompletion))
    ) {
      return assign(prevCompletion, {
        latestDate
      });
    }

    // if a new completion is higher
    if (prevCompletion.latestNbQuestions <= nextCompletion.latestNbQuestions) {
      return assign(nextCompletion, {
        latestDate
      });
    }

    return assign(prevCompletion, {
      latestDate
    });
  }
};
const filter = () => true;

const mapId = record =>
  `${record.content.engine.ref}-${record.content.content.type}-${record.content.content.ref}-${
    record.content.userId
  }`;

const mapValue = record => {
  const {
    state,
    content,
    meta: {updatedAt: latestDate}
  } = record.content;

  const {step, nextContent} = state;
  const {current} = step;

  const aggregValue = {
    content: Object.assign({version: '1'}, content),
    latestNbQuestions: current ? current - 1 : 0,
    success: false,
    latestDate
  };

  if (nextContent.type === 'failure') {
    return set('latestNbQuestions', 0, aggregValue);
  }
  if (nextContent.type === 'success') {
    return assign(aggregValue, {
      success: true
    });
  }
  return aggregValue;
};

module.exports = {
  mapId,
  mapValue,
  filter,
  reduce
};
