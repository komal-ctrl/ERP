// middleware/trimInput.js
function trimUser(req, res, next) {
  if (req.body && typeof req.body === "object") {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key.trim()] = req.body[key].trim();
        if (key !== key.trim()) {
          delete req.body[key];
        }
      }
    }
  }
  next();
}

module.exports = trimUser;
