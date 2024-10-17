local util = require("util")

util.forEachResourceInSupportedMods(function(_mod, resoure)
  data:extend({
    util.createFiniteResourceSetting(resoure)
  })
end)
