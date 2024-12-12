import { BoolSettingDefinition } from "factorio:settings";

const modPrefix = "depleting-fluids-finite";

const modResources: { [key: string]: string[] } = {
  "base": ["crude-oil"],
  "space-age": ["fluorine-vent", "sulfuric-acid-geyser"]
};

const resourceFluids: { [key: string]: string } = {
  "crude-oil": "crude-oil",
  "fluorine-vent": "fluorine",
  "sulfuric-acid-geyser": "sulfuric-acid"
}

const settingName = (internalName: string) => `${modPrefix}-${internalName}`;

export const forEachResourceInSupportedMods = (func: (mod: string, resource: string) => void) => {
  for (const mod in modResources) {
    if (mods[mod]) {
      for (const resource of modResources[mod]) {
        func(mod, resource);
      }
    }
  }
};

export const isResourceFinite = (internalName: string) => settings["startup"][settingName(internalName)].value;

export const createFiniteResourceSetting = (internalName: string): BoolSettingDefinition => (
  {
    type: "bool-setting",
    name: settingName(internalName),
    setting_type: "startup",
    default_value: true,
    order: "c",
    localised_name: [`mod-settings-name.${settingName(internalName)}`],
    localised_description: [`mod-settings-description.${settingName(internalName)}`]
  });

export const makeResourceFinite = (internalName: string) => {
  // data.raw["mining-drill"]["pumpjack"].mining_speed = 2

  data.raw.resource[internalName]!.infinite = false
  data.raw.resource[internalName]!.minimum = 25000
  data.raw.resource[internalName]!.normal = 100000
  data.raw.resource[internalName]!.infinite_depletion_amount = 5
  data.raw.resource[internalName]!.minable = {

    mining_time: 0.275,
    results: [
      {
        type: "fluid",
        name: resourceFluids[internalName],
        amount_min: 5,
        amount_max: 5,
        probability: 1
      }
    ]
  }
};
