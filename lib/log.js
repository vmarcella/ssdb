let DEBUG_MODE = false;

/**
 * @name info
 * @private
 * @desc Log an information message.
 */
const info = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[INFO] ${message}\n`);
};

/**
 * @name info
 * @private
 * @desc Log an error message.
 */
const error = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[ERROR] ${message}\n`);
};

/**
 * @name info
 * @private
 * @desc Log a warning message.
 */
const warn = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[WARN] ${message}\n`);
};

/**
 * @name setDebug
 * @private
 * @desc set the logger debug mode for enabling and disabling logging.
 */
const setDebug = (debug) => {
  DEBUG_MODE = debug;
};

module.exports = {
  info,
  error,
  warn,
  setDebug,
};
