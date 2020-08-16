module.exports = {
    "parser": "@typescript-eslint/parser",
    "extends": [
      "airbnb-typescript",
      "eslint:recommended",
      "prettier", 
      "prettier/@typescript-eslint", 
      "prettier/react",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "standard"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "project": "./tsconfig.json"
    },
    "plugins": [
      "@typescript-eslint",
      "react",
      "react-native"
    ],
    "settings": {
      "react": {
        "pragma": "React",
        "version": "detect"
      }
    },
    "globals": {
      "__DEV__": false,
      "jasmine": false,
      "beforeAll": false,
      "afterAll": false,
      "beforeEach": false,
      "afterEach": false,
      "test": false,
      "expect": false,
      "describe": false,
      "jest": false,
      "it": false
    },
    "rules": {
		"indent": [
			0,
			4
		  ],
	  "no-tabs": 0,
      "comma-dangle": 0,
      "no-dupe-class-members": "off",
      "no-unused-vars": 1,
      "no-undef": 1,
	  "quotes": 0,
	  "semi": ["warn", "always"],
      "react/no-unescaped-entities": 0,
      "react/prop-types": "off",
      "react-native/no-raw-text": 0,
      "space-before-function-paren": 0,
      "@typescript-eslint/ban-ts-ignore": 0,
      "@typescript-eslint/indent": [0, 4],
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/member-delimiter-style": 0,
      "@typescript-eslint/no-dupe-class-members": [
        "error"
	  ],
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-object-literal-type-assertion": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-var-requires": 0,
	  "@typescript-eslint/no-use-before-define": 0,
	  "@typescript-eslint/no-useless-constructor": 0,
	  "react/prefer-stateless-function" :0,
	  "no-useless-constructor": 0,
	  "react-native/no-color-literals": 0,
	  "react-native/sort-styles": 0,
	  "react-native/no-inline-styles" :0
    }
  }