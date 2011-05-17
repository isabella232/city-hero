This is the main README for the City Hero thing (known as ET below).

## What is this?

The ET is a site that makes the world a better place.

## How to Install

1. Install node (needs link)
2. Install npm (needs link)
2. Clone this repository
2. `cd city-hero`
3. `npm install` (will make some time)
3. Create new `lib/settings/auth.js` file from `lib/settings/auth.example.js`
4. Run application: `node lib/server.js`

## Coding Standards

  * [Crockford JavaScript Style Guide](http://javascript.crockford.com/code.html)
  * JSLint
  * Commenting via [JSDoc](http://code.google.com/p/jsdoc-toolkit/)
  
## Testing

  * Currently trying Expresso
    * To run tests from project base: `node_modules/expresso/bin/expresso test/<TEST_FILE>.js`
  * JSLint

## Credits and Resources

  * Node.js (version?)
  * See package.json for dependencies
  
## Deploy

  * Currently using DotCloud
  * See [DotCloud Node.JS docs](http://docs.dotcloud.com/components/nodejs/)
  * See [npm package.json documentation](https://github.com/isaacs/npm/blob/master/doc/json.md)
  * Must listen on port 8080 for DotCloud
  
## TODOs

  * Look at packaging, like ndistro
  
