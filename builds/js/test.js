var EventUtil, assert, log, results, test;

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
  results = document.getElementById("results");
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

EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventLinstener) {
      return element.addEventLinstener(type, handler, false);
    } else if (element.attachEvent) {
      return element.attachEvent("on" + type, handler);
    } else {
      return element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventLinstener) {
      return element.removeEventLinstener(type, handler, false);
    } else if (element.detachEvent) {
      return element.detachEvent("on" + type, handler);
    } else {
      return element["on" + type] = null;
    }
  }
};

assert(true, "this is for test--sucess!");

assert(false, "this is for test--fail");
