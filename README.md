## Expired Sauce

I don't know if I'm the only one, but I don't want overage minutes billed from Sauce Labs. I also don't want to manually turn off CI builds after manually checking usage. This script fixes that.

### Installation
```
$ yarn global add expired-sauce
```

### Usage
```
$ SAUCE_USERNAME="something" SAUCE_ACCESS_KEY="abc" USAGE_THRESHOLD=20 expiredsauce
```

`SAUCE_USERNAME` & `SAUCE_ACCESS_KEY` are required environment variables, whereas `USAGE_THRESHOLD` defaults to 20.

`USAGE_THRESHOLD` is used to compare minutes left on your account. If you have 50 minutes left on your account and your `USAGE_THRESHOLD` is set to `55`, this script will return a `1` exit code (failing).
