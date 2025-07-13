module.exports = {
    //--require-module ts-node/register: lets Cucumber run TypeScript files.
    //--require Steps/**/*.ts: loads step definitions.
    //--format @cucumber/pretty-formatter: nice console output.
    //Feature/**/*.feature: feature files location.
    default: [
        '--require-module ts-node/register',
        '--require ./Steps/**/*.ts',
        '--format progress',
        './Feature/**/*.feature'
    ].join(' ')
};