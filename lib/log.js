let DEBUG_MODE = false;

const info = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[INFO] ${message}\n`);
};

const error = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[ERROR] ${message}\n`);
};

const warn = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[WARN] ${message}\n`);
};

const setDebug = (debug) => {
  DEBUG_MODE = debug;
};

module.exports = {
  info,
  error,
  warn,
  setDebug
};
