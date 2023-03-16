<br />
<img src="https://user-images.githubusercontent.com/1549069/225756692-dad51108-8b99-4267-90a1-a8b1bc61afee.svg"  width="40%">

<br />
## tailwindy-components

A library to improve readability of [tailwindcss](https://tailwindcss.com/) classes

### Install

```bash
npm install tailwindy-components
or
yarn add tailwindy-components
```

## Example:

Instead of this code:

```jsx
<figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
```

We can write something like this:

```jsx
// Card.jsx
<Card>
  <Logo src="/sarah-dayan.jpg" alt="" width="384" height="512" />
  <Container>
    <blockquote>
      <Text>
      “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </Text>
    </blockquote>
    <Caption>
      <Name>Sarah Dayan</Name>
      <Rule>Staff Engineer, Algolia</Rule>
    <Caption>
  </Container>
</Card>
```

```js
// styles.js
import tailwindy from 'tailwindy-components';

export const Card = tailwindy.figure`
  md:flex
  bg-slate-100
  rounded-xl
  p-8
  md:p-0
  dark:bg-slate-800
`;

export const Logo = tailwindy.img`
  w-24
  h-24
  md:w-48
  md:h-auto
  md:rounded-none
  rounded-full
  mx-auto
`;

export const Container = tailwindy.div`
  pt-6
  md:p-8
  text-center
  md:text-left
  space-y-4
`;

export const Text = tailwindy.p`
  text-lg
  font-medium
`;

export const Caption = tailwindy.figcaption`
  font-medium
`;

export const Name = tailwindy.div`
  text-sky-500
  dark:text-sky-400
`;

export const Rule = tailwindy.div`
  text-slate-700
  dark:text-slate-500
`;
```

[Edit on Codesandbox](https://codesandbox.io/s/tailwindy-example-1-ezzokr)

---

<br />
<br />

tailwindy-components

```

A library to improve readability of tailwindcss classes
```

tailwindcss:

```
A utility-first CSS framework packed with classes
like flex, pt-4, text-center and rotate-90 that can be
composed to build any design, directly in your markup.
```
