local util = require("util")

util.forEachResourceInSupportedMods(function(_mod, resource)
  data:extend({
    util.createFiniteResourceSetting(resource)
  })
end)
