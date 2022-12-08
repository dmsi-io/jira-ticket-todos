/**
 * @fileoverview detect TODO tags that do not have a jira ticket number attached to them
 * @author Adam Schlichtmann
 */
'use strict';
const rule = require('../../../index.js');
const { RuleTester } = require('eslint');
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

new RuleTester().run('jira-ticket-todos', rule.rules['jira-ticket-todos'], {
  valid: [
    '// TODO: IS-455',
    '// TODO: AW-62',
    '// TODO MIA-323',
    '// TODO WE-2',
    { code: '// TODO', options: [{ matchString: 'X' }] },
    { code: '// TODO', options: [{ matchString: 'X', ignoreCase: true }] },
    { code: '// TODO', options: [{ matchString: 'todo' }] },
  ],

  invalid: [
    {
      code: '// TODO: Hello how is your day Mine is good',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// TODO: aw-1',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// TODO:',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// TODO: AQ 234',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// XXX: AQ 234',
      options: [{ matchString: 'XXX' }],
      errors: [
        {
          message:
            "Comments containing 'XXX' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// XXX: AQ 234',
      options: [{ matchString: 'xxx', ignoreCase: true }],
      errors: [
        {
          message:
            "Comments containing 'xxx' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// xXx: AQ 234',
      options: [{ matchString: 'xxx', ignoreCase: true }],
      errors: [
        {
          message:
            "Comments containing 'xxx' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
        },
      ],
    },
    {
      code: '// TODO: AQ 234\nlet foo = 3;',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
          column: 1,
          endColumn: 16,
        },
      ],
    },
    {
      code: 'let foo = 3; // TODO: AQ 234',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Line',
          column: 14,
          endColumn: 29,
        },
      ],
    },
    {
      code: '/*\n* TODO:\n* This is a test\n* for block columns\n*/',
      errors: [
        {
          message:
            "Comments containing 'TODO' must contain a Jira story number (e.g., ABC-123).",
          type: 'Block',
          column: 1,
          line: 1,
          endColumn: 3,
          endLine: 5,
        },
      ],
    },
  ],
});
