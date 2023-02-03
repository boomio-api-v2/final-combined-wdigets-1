export const addStylesToHtml = (cssRules) => {
  const style = document.createElement('style');
  style.setAttribute('id', 'boomio--stylesheet');
  document.getElementsByTagName('head')[0].appendChild(style);
  if (style.styleSheet) {
    style.styleSheet.cssText = cssRules;
  } else {
    style.appendChild(document.createTextNode(cssRules));
  }
};

export const addCssLinkToHtml = (href) => {
  const link = document.createElement('link');
  link.setAttribute('href', href);
  link.setAttribute('rel', 'stylesheet');
  document.getElementsByTagName('head')[0].appendChild(link);
};

export const assignStyleOnElement = (style, properties) => {
  Object.assign(style, properties);
};
