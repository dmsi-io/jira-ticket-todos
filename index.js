module.exports = {
  rules: {
    'jira-ticket-todos': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Disallow empty TODO tags',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              matchString: {
                default: 'TODO',
                minLength: 1,
                type: 'string',
              },
              ignoreCase: {
                default: false,
                type: 'boolean',
              },
            },
            required: ['matchString'],
            type: 'object',
          },
        ],
      },
      create: context => ({
        Program: node => {
          const config = context.options[0] || { matchString: 'TODO' };
          const todoMatcher = new RegExp(
            config.matchString,
            config.ignoreCase ? 'i' : '',
          );
          // Check if there are comments
          if (node.comments && node.comments.length) {
            // Contains TODO
            node.comments.forEach(comment => {
              const { value } = comment;
              // Contains 2-4 letters with a - followed by a number EG: AW-62 or MIA-124152
              if (todoMatcher.test(value) && !/[A-Z]{2,4}-\d+/.test(value)) {
                context.report({
                  node: comment,
                  message: `Comments containing '${config.matchString}' must contain a Jira story number (e.g., ABC-123).`,
                });
              }
            });
          }
        },
      }),
    },
  },
};
