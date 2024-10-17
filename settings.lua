local util = require("util")

util.forEachFluidInSupportedMods(function(_mod, resoure)
  data:extend({
    util.createFiniteFluidSetting(resoure)
  })
end)
