const dotenv = require('dotenv');
const path = require('path');
const {ENV_FILE, ENV_DIR, PROJECT_DIR, CONFIG_DIR, NODE_MODULES_DIR, PACKAGE_DIR} = require("./src/constants/AppConstants");

// todo only for local dev
// const ROOT_DIR = path.resolve(__dirname, ...Array(PARENT_DIR_LEVELS).fill(DOUBLE_DOT));
const ROOT_DIR =
    path.resolve(
        __dirname,
        NODE_MODULES_DIR,
        PACKAGE_DIR
    );
const CONFIG_PATH = process.env.CONFIG_PATH || ROOT_DIR;

const DOTENV_PATH = path.join(
    CONFIG_PATH,
    CONFIG_DIR,
    PROJECT_DIR,
    ENV_DIR,
    ENV_FILE
);

const result = dotenv.config({ path: DOTENV_PATH }) || dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('Loaded environment variables:', result.parsed);
}

module.exports = function override(config, env) {
    // Add polyfills for Node.js core modules (e.g., path)
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),
    };

    return config;
};
