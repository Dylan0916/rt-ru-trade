module.exports = {
  '*.ts': [
    'prettier --parser typescript --write',
    () => 'tsc -p tsconfig.json',
    'jest --runInBand --findRelatedTests',
  ],
};
