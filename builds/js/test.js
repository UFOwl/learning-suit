var assert, log, results, test;

results = void 0;

log = function() {
  var error, error1, error2;
  try {
    return console.log.apply(console, arguments);
  } catch (error1) {
    error = error1;
    try {
      return opera.postError.apply(opera, arguments);
    } catch (error2) {
      error = error2;
      return alert(Array.prototype.join.call(arguments, " "));
    }
  }
};

assert = function(value, desc) {
  var li;
  li = document.createElement("li");
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  results.appendChild(li);
  if (!value) {
    li.parentNode.parentNode.className = "fail";
  }
  return li;
};

test = function(name, fn) {
  results = document.getElementById("results");
  results = assert(true, name).appendChild(document.createElement("ul"));
  return fn();
};
