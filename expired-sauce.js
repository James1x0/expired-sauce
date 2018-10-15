const {
  SAUCE_ACCESS_KEY,
  SAUCE_USERNAME,
  USAGE_THRESHOLD
} = process.env;

(async function () {
  try {
    // Establish that keys exist or throw an error
    if (!SAUCE_ACCESS_KEY || !SAUCE_USERNAME) {
      throw new Error('Expired Sauce requires "SAUCE_ACCESS_KEY" and "SAUCE_USERNAME" to be specified.');
    }

    const { promisifyAll } = require('bluebird'),
          SauceLabsAPI = require('saucelabs');

    // Connect to sauce labs
    const sl = promisifyAll(new SauceLabsAPI({
      username: SAUCE_USERNAME,
      password: SAUCE_ACCESS_KEY
    }));

    // Fetch account minutes left
    let { minutes } = (await sl.getAccountDetailsAsync() || {});

    // Get the usage threshold from env vars, or default to 20 minutes
    let usageThreshold = USAGE_THRESHOLD ? parseInt(USAGE_THRESHOLD) : 20;

    process.exit(minutes < usageThreshold ? 1 : 0);
  } catch (e) {
    console.error('Expired Sauce failed to run:', e);
  }
})();
