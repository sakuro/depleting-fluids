const modPrefix = "depleting-fluids-finite";

const modResources: { [key: string]: string[] } = {
  "base": ["crude-oil"],
  "space-age": ["fluorine-vent", "sulfuric-acid-geyser"]
};

export const resourceFluids: { [key: string]: string } = {
  "crude-oil": "crude-oil",
  "fluorine-vent": "fluorine",
  "sulfuric-acid-geyser": "sulfuric-acid"
}

export const settingName = (internalName: string) => `${modPrefix}-${internalName}`;

export const supportedResources = function*() {
  for (const mod in modResources) {
    if (mods[mod]) {
      for (const resource of modResources[mod]) {
        yield [mod, resource] as const;
      }
    }
  }
};
