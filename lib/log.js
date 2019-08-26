const DEBUG_MODE = false;

const info = (message) => {
  process.stdout.write(`[INFO] ${message}\n`);
};

const error = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[ERROR] ${message}\n`);
};

const warn = (message) => {
  if (DEBUG_MODE) process.stdout.write(`[WARN] ${message}\n`);
};

module.exports = {
  info,
  error,
  warn,
};
