local util = require("util")

util.forEachFluidInSupportedMods(function(_mod, resource)
  if util.isResourceFinite(resource) then
    util.makeResourceFinite(resource)
  end
end)
