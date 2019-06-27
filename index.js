const { get } = require('dot-prop');

const thing = {
  meta: {
    docs: {
        description: "disallow empty TODO tags",
        category: "Best Practices",
        recommended: true,
        schema: []
    },
    schema: [] // no options
  },
  create: function(context) {
    return {
      "Program": function(node) {
        // Check if there are comments 
        if(node.comments && node.comments.length){
          // Contains TODO
          for (var i = 0; i < node.comments.length; i++){
            //const value = get(node, 'comments.0.value', '');
            const value = node.comments[i].value;
            if (value.includes('TODO')) {
              // Contains 2-4 letters with a - followed by a number EG: AW-62 or MIAM-124152
              if(!(/[A-Z]{2,4}[-]\d+/.test(value))) {
                // Report Issue
                context.report({node, message: "Add a Jira ticket number (EG: AW-62)"})
              }
            }
          }
        }
      }
    }
  }
}

  module.exports.rules = {
      "jira-ticket-todos": thing,
  };