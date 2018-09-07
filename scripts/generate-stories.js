// @flow

import path from 'path';
import fs from 'fs';

import globby from 'globby';
import shelljs from 'shelljs';

const files = globby
  .sync('**/*.stories.js', {
    cwd: path.resolve(__dirname + '/../src'),
    nodir: true,
  })
  .sort()
  .map(story => `require('./${story}');`)
  .join('\n');

const outputFilePath = path.resolve(__dirname + '/../src/stories.js');

shelljs.mkdir('-p', path.dirname(outputFilePath));
fs.writeFileSync(
  outputFilePath,
  '// @flow' +
    '\n' +
    '// THIS FILE IS AUTOGENERATED' +
    '\n' +
    '/* eslint-disable import/max-dependencies */' +
    '\n' +
    files +
    '\n',
);
shelljs.exec('git add ' + outputFilePath);
