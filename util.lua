local util = {}

local modPrefix = "depleting-fluids-finite-"

local modResources = {
  ["base"] = {"crude-oil"},
  ["space-age"] = {"fluorine-vent", "sulfuric-acid-geyser"},
  ["James-Oil-Processing"] = {"adamo-carbon-natural-gas"},
  ["bobores"] = {"ground-water", "lithia-water"}
}

local resourceFluids = {
  ["crude-oil"] = "crude-oil",
  ["fluorine-vent"] = "fluorine",
  ["sulfuric-acid-geyser"] = "sulfuric-acid",
  ["adamo-carbon-natural-gas"] = "adamo-carbon-natural-gas",
  ["ground-water"] = "water",
  ["lithia-water"] = "lithia-water"
}

local settingName = function(internalName)
  return modPrefix .. internalName
end

util.forEachResourceInSupportedMods = function(func)
  for mod, resources in pairs(modResources) do
    if mods[mod] then
      for _, resource in ipairs(resources) do
        func(mod, resource)
      end
    end
  end
end

util.isResourceFinite = function(internalName)
  return settings["startup"][settingName(internalName)].value
end

util.createFiniteResourceSetting = function(internalName)
  return {
    type = "bool-setting",
    name = settingName(internalName),
    setting_type = "startup",
    default_value = true,
    order = "c",
    localised_name = {"mod-settings-name." .. settingName(internalName)},
    localised_description = {"mod-settings-description." .. settingName(internalName)}
  }
end

util.makeResourceFinite = function(internalName)
  -- data.raw["mining-drill"]["pumpjack"].mining_speed = 2

  data.raw.resource[internalName].infinite = false
  data.raw.resource[internalName].minimum = 25000
  data.raw.resource[internalName].normal = 100000
  data.raw.resource[internalName].infinite_depletion_amount = 5
  data.raw.resource[internalName].minable = {
    mining_time = 0.275,
    results = {
      {
        type = "fluid",
        name = resourceFluids[internalName],
        amount_min = 5,
        amount_max = 5,
        probability = 1
      }
    }
  }
end

return util
