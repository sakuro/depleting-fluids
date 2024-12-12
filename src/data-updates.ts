import { forEachResourceInSupportedMods, isResourceFinite, makeResourceFinite } from "./util";

forEachResourceInSupportedMods((_mod, resource) => {
  isResourceFinite(resource) && makeResourceFinite(resource);
});
