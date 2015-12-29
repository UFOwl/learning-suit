useless = (callback)->
  callback()

name = "feizhen"

assert useless(()-> name), "useless works with #{name}"
