import { createElement } from 'react';
import { FunctionComponent } from 'react';
import { elements } from './elements';

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

const createTailwindyComponents = (tags: typeof elements) => {
  const createTailwindy = (element: any) => (classes: string) => {
    const cls = cleanUp(classes);

    const Component = ({ className, ...props }: { className: string }) => {
      const cn = `${cls}${className ? (cls ? ' ' : '') + className : ''}`;

      return createElement(element, {
        ...(cn && { className: cn }),
        ...props,
      });
    };

    Component.__TAILWINDY__ = {
      classes: cls,
    };

    return (Component as unknown) as TailwindyComponent;
  };

  const isTailwindyComponent = (
    element: any
  ): element is TailwindyComponent => {
    return !!(element as any).__TAILWINDY__;
  };

  const cleanUp = (classes: string) =>
    classes.match(/[\w-:.]+/g)?.join(' ') || '';

  const tailwindy: TailwindyConstructor = element => ([classes]) =>
    isTailwindyComponent(element)
      ? createTailwindy(element.__TAILWINDY__.element)(
          `${element.__TAILWINDY__.classes} ${classes}`
        )
      : createTailwindy(element)(classes);

  tags.forEach((element: string) => {
    (tailwindy as any)[element] = ([classes]: TemplateStringsArray) =>
      createTailwindy(element)(classes);
  });

  return tailwindy as Tailwindy;
};

const tailwindy = createTailwindyComponents(elements);

export default tailwindy;
