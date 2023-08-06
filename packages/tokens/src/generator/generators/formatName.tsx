import * as _ from "lodash";

export const NAME_FORMATS = {
  css: (name: string) => `--${_.kebabCase(name)}`,
  cssReference: (name: string) => `var(--${_.kebabCase(name)})`,
  cssClass: (name: string) => `.${_.kebabCase(name)}`,
  constant: (name: string) => _.snakeCase(name).toUpperCase(),
  camel: (name: string) => _.camelCase(name),
  snake: (name: string) => _.snakeCase(name),
  kebab: (name: string) => _.kebabCase(name),
  original: (name: string) => name,
};

export function formatName(name: string, style: keyof typeof NAME_FORMATS): string {
  return NAME_FORMATS[style](name);
}
