import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import jsxA11y from 'eslint-plugin-jsx-a11y';


const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    {
        plugins: {
            'jsx-a11y': jsxA11y,
            prettier: pluginPrettier,
        },
        rules: {
            "prettier/prettier": "error",
            ...jsxA11y.configs.recommended.rules,
        },
    },

    prettier,

    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
