import React from 'react';
import { renderToString } from 'react-dom/server';
import tailwindy from '../src/index';

describe('test tailwindy', () => {
  test('should return a div tag with class included some css classes', () => {
    const Component = tailwindy.div`
      inline-block
      text-2xl
      sm:text-3xl
      font-extrabold
      text-slate-900
      tracking-tight
      dark:text-slate-200
    `;

    const html = renderToString(<Component />);

    expect(html).toBe(
      '<div class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200"></div>'
    );
  });

  test('should return a div without class prop', () => {
    const Component = tailwindy.div``;

    const html = renderToString(<Component />);

    expect(html).toBe('<div></div>');
  });

  test('should return a div with a css class', () => {
    const Component = tailwindy.div``;

    const html = renderToString(<Component className="custom" />);

    expect(html).toBe('<div class="custom"></div>');
  });

  test('should attach custom css class front of all classes', () => {
    const Component = tailwindy.div`
      text-slate-900
      tracking-tight
    `;

    const html = renderToString(<Component className="custom" />);

    expect(html).toBe(
      '<div class="text-slate-900 tracking-tight custom"></div>'
    );
  });

  test('should return a figure tag', () => {
    const Component = tailwindy.figure``;

    const html = renderToString(<Component />);

    expect(html).toBe('<figure></figure>');
  });
});
