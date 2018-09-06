const through = require('through2');

module.exports = function (render, extraProviders) {
  function transform(file, encoding, callback) {
    if (!file.isDirectory()) {
      const route = file.relative
        .replace(/\\/g, '/')
        .replace(/index\..+$/, '');

      render(route, extraProviders).then((html) => {
        file.contents = Buffer.from(html, encoding);
        callback(null, file);
      }, (e) => callback(e));
    } else {
      callback();
    }
  }

  return through.obj(transform);
}