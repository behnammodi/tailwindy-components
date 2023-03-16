import { createElement } from "react";
import type { FunctionComponent } from "react";
import { elements } from "./elements";

type TailwindyComponent = FunctionComponent & {
  __TAILWINDY__: {
    classes: string;
    element?: FunctionComponent;
  };
};

export type TailwindyElements = {
  [K in typeof elements[number]]: ([
    classes,
  ]: TemplateStringsArray) => FunctionComponent<JSX.IntrinsicElements[K]>;
};

export type TailwindyConstructor = (
  element: FunctionComponent | TailwindyComponent
) => ([classes]: TemplateStringsArray) => TailwindyComponent;

export type Tailwindy = TailwindyConstructor & TailwindyElements;

const createTailwindyComponents = (elements) => {
  const createTailwindy = (element) => (classes: string) => {
    const Component: TailwindyComponent = ({
      className,
      ...props
    }: {
      className: string;
    }) => {
      const cn = `${classes} ${className}`;

      return createElement(element, {
        className: cn,
        ...props,
      });
    };

    Component.__TAILWINDY__ = {
      classes,
    };

    return Component as unknown as TailwindyComponent;
  };

  const isTailwindyComponent = (
    element: any
  ): element is TailwindyComponent => {
    return !!(element as any).__TAILWINDY__;
  };

  const tailwindy: TailwindyConstructor =
    (element) =>
    ([classes]: TemplateStringsArray) =>
      isTailwindyComponent(element)
        ? createTailwindy(element.__TAILWINDY__.element)(
            `${element.__TAILWINDY__.classes} ${classes}`
          )
        : createTailwindy(element)(classes);

  elements.forEach((element) => {
    tailwindy[element] = ([classes]: TemplateStringsArray) =>
      createTailwindy(element)(classes);
  });

  return tailwindy as Tailwindy;
};

const tailwindy = createTailwindyComponents(elements);

export default tailwindy;
