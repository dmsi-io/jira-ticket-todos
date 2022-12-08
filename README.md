# `eslint-plugin-jira-ticket-todos` <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

===================

[![github actions][actions-image]][actions-url]
[![Maintenance Status][status-image]][status-url]
[![NPM version][npm-image]][npm-url]

Jira todo linting check for `eslint`

## Installation

npm:
```sh
npm install eslint eslint-plugin-jira-ticket-todos --save-dev
```

yarn:
```sh
yarn add -D eslint eslint-plugin-jira-ticket-todos
```

It is also possible to install ESLint globally rather than locally (using `npm install -g eslint`). However, this is not recommended, and any plugins or shareable configs that you use must be installed locally in either case.

## Configuration (legacy: `.eslintrc*`)

If you do not use a preset you will need to specify individual rules and add extra configuration.

Add "jira-ticket-todos" to the plugins section.

```json
{
  "plugins": [
    "jira-ticket-todos"
  ]
}
```

Enable the rules that you would like to use.

```json
{
  "rules": {
    "jira-ticket-todos/jira-ticket-todos": "error",
    "jira-ticket-todos/jira-ticket-todos": ["error", {"matchString": "TODO[:\-.]?", "ignoreCase":  true }]
  }
}
```

[npm-url]: https://www.npmjs.com/package/eslint-plugin-jira-ticket-todos
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-jira-ticket-todos.svg
[package-url]: https://npmjs.org/package/eslint-plugin-jira-ticket-todos
[npm-version-svg]: https://versionbadg.es/Adam-Schlichtmann/jira-ticket-todos.svg

[status-url]: https://github.com/Adam-Schlichtmann/jira-ticket-todos/pulse
[status-image]: https://img.shields.io/github/last-commit/Adam-Schlichtmann/jira-ticket-todos.svg

[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/Adam-Schlichtmann/jira-ticket-todos
[actions-url]: https://github.com/Adam-Schlichtmann/jira-ticket-todos/actions
