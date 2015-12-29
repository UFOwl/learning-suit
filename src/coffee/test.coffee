results = undefined
log = ()->
  try
    console.log.apply(console, arguments);
  catch error
    try
      opera.postError.apply(opera, arguments);
    catch error
      alert Array::join.call(arguments, " ")

assert = (value, desc)->
  li = document.createElement "li"
  li.className = if value then "pass" else "fail"
  li.appendChild(document.createTextNode desc)
  results = document.getElementById "results"
  results.appendChild(li)
  if not value
    li.parentNode.parentNode.className = "fail"
  li

test = (name, fn)->
  results = document.getElementById "results"
  results = assert(true, name).appendChild document.createElement "ul"
  fn()
