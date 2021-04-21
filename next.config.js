const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
});
