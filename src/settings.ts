import { createFiniteResourceSetting, forEachResourceInSupportedMods } from "./util";

forEachResourceInSupportedMods((_mod, resoure) => {
  data.extend([
    createFiniteResourceSetting(resoure)
  ])
});
