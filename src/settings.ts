import { settingName, supportedResources } from "./util";

for (const [_mod, resource] of supportedResources()) {
  data.extend([
    {
      type: "bool-setting",
      name: settingName(resource),
      setting_type: "startup",
      default_value: true,
      order: "c",
      localised_name: [`mod-settings-name.${settingName(resource)}`],
      localised_description: [`mod-settings-description.${settingName(resource)}`]
    }
  ])
};
