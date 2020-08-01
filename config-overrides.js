/* eslint-disable react-hooks/rules-of-hooks */

const { useBabelRc, override, useEslintRc } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  useEslintRc()
);
