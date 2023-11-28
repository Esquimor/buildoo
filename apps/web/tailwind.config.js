const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "../../packages/shared/ui/{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}",
    "../../packages/shared/ui/tailwind.config.js"
  ],
  plugins: [
    require("flowbite/plugin")
  ],
};
