import React from "react";
import { renderToString } from "react-dom/server";
import tailwindy from "../src/index";

describe("test tailwindy", () => {
  test("should return", () => {
    const Title = tailwindy.div`
      inline-block
      text-2xl
      sm:text-3xl
      font-extrabold
      text-slate-900
      tracking-tight
      dark:text-slate-200
    `;

    const html = renderToString(<Title />);

    expect(html).toBe("");
  });
});


