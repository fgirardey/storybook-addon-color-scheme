# Storybook Addon Color Scheme

Preview and render your stories in a given color scheme

## Installation

First, install the package.

```sh
npm install --save-dev storybook-addon-color-scheme
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-color-scheme', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to define the `colorScheme` parameter. You can do this the
component level, as below, to affect all stories in the file, or you can do it for a single story.

```js
// Button.stories.ts

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    colorScheme: "dark",
  },
};

export default meta;
```
