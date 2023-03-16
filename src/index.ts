import { createElement, ReactElement } from "react";
import type { ReactNode } from "react";

type TailwindyComponent = ReactNode & {
  __TAILWINDY__: {
    classes: string;
    element: ReactNode;
  };
};

export type TailwindyElements = {
  [K in typeof elements[number]]: ([
    classes,
  ]: TemplateStringsArray) => ReactElement<JSX.IntrinsicElements[K]>;
};

export type TailwindyConstructor = (
  element: ReactElement | TailwindyComponent
) => ([classes]: TemplateStringsArray) => TailwindyComponent;

export type Tailwindy = TailwindyConstructor & TailwindyElements;

const createTailwindyComponents = (elements) => {
  const createTailwindy = (element) => (classes: string) => {
    function Component({ className, ...props }: { className: string }) {
      const cn = `${classes} ${className}`;

      return createElement(element, {
        className: cn,
        ...props,
      });
    }

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

const elements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "use",
  "var",
  "video",
  "wbr", // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan",
] as const;

const tailwindy = createTailwindyComponents(elements);

export default tailwindy;
