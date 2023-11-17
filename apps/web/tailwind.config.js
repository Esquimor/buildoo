const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),,
    "../../packages/shared/ui/{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}",
    "../../packages/shared/ui/tailwind.config.js"
  ],
};
