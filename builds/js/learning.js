var name, useless;

useless = function(callback) {
  return callback();
};

name = "feizhen";

assert(useless(function() {
  return name;
}), "useless works with " + name);
