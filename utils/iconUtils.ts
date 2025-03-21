// utils/fontAwesomeIcons.js
import * as icons from '@fortawesome/free-regular-svg-icons';;

const iconMap = Object.keys(icons).reduce((acc, key) => {
  if (key.startsWith('fa')) {
    acc[key] = icons[key];
  }
  return acc;
}, {});

export const getIcon = (iconName) => {
    console.log("iconName",iconName)
    const icon = iconMap[iconName];
    if (!icon) {
      console.warn(`Icon "${iconName}" not found.`);
      return iconMap['faQuestionCircle']; // Fallback icon
    }
    return icon;
  };