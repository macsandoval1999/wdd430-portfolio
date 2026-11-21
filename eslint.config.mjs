/* NOTE:
    This file tells ESLint how to check the project's code for potential problems.
    It uses Next.js's recommended Core Web Vitals and TypeScript rules and ignores generated build files.
    ESLint finds and reads this configuration when it runs, then uses the exported eslintConfig to check files.
    The "npm run lint" script runs ESLint, but it can also be run directly or by an enabled editor extension.
    Running "npm run dev", "npm run build", or the app itself does not automatically run ESLint.
*/



/****** IMPORTS ******/
// defineConfig allows ESLint configuration to be defined using a function.
// globalIgnores allows specifying files and directories that ESLint should ignore.
import { defineConfig, globalIgnores } from "eslint/config";
// nextVitals provides Next.js's recommended rules for Core Web Vitals.
import nextVitals from "eslint-config-next/core-web-vitals";
// nextTs provides Next.js's recommended rules for TypeScript.
import nextTs from "eslint-config-next/typescript";



/****** The Configuration Function ******/
// defineConfig is a function that combines the recommended rule sets and ignore patterns into one configuration. 
// It takes in an array of configuration objects and returns a configuration array for ESLint.
//...nextVitals and ...nextTs spread the recommended rules into the configuration array.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Here you pass in the files and directories that ESLint should ignore.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);



// Export the configuration so ESLint can use it when linting the project.
export default eslintConfig;
