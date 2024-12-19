import { supportedResources, settingName, resourceFluids } from "./util";

const isResourceFinite = (internalName: string) => settings["startup"][settingName(internalName)].value;

for (const [_mod, resource] of supportedResources()) {
  if (!isResourceFinite(resource)) continue;

  // data.raw["mining-drill"]["pumpjack"].mining_speed = 2

  data.raw.resource[resource]!.infinite = false
  data.raw.resource[resource]!.minimum = 25000
  data.raw.resource[resource]!.normal = 100000
  data.raw.resource[resource]!.infinite_depletion_amount = 5
  data.raw.resource[resource]!.minable = {

    mining_time: 0.275,
    results: [
      {
        type: "fluid",
        name: resourceFluids[resource],
        amount_min: 5,
        amount_max: 5,
        probability: 1
      }
    ]
  }
};
