/**
 * @fileoverview detect TODO tags that do not have a jira ticket number attached to them
 * @author Adam
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../index.js"),

    RuleTester = require("eslint").RuleTester;
    RuleTester.setDefaultConfig({
        parserOptions: {
          ecmaVersion: 6,
          sourceType: "module"
        }
      });


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("jira-ticket-todos", rule, {

    valid: [
        "// TODO: IS-455",
        "// TODO: AW-62",
        "// TODO MIA-323",
        "// TODO WE-2",
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "// TODO: Hello how is your day Mine is good",
            errors: [{
                message: "Add a Jira ticket number (EG: AW-62)",
                type: "Program"
            }]
        },
        {
            code: "// TODO: aw-1",
            errors: [{
                message: "Add a Jira ticket number (EG: AW-62)",
                type: "Program"
            }]
        },
        {
            code: "// TODO:",
            errors: [{
                message: "Add a Jira ticket number (EG: AW-62)",
                type: "Program"
            }]
        },
        {
            code: "// TODO: AQ 234",
            errors: [{
                message: "Add a Jira ticket number (EG: AW-62)",
                type: "Program"
            }]
        }

    ]
});