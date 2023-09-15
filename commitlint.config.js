module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+-\d+) - (\w+)(?:\(([^)]+)\))?: (.+)$/,
      headerCorrespondence: ['ticketNumber','type', 'scope','subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'chore', // Maintenance or chore tasks
        'docs', // Documentation changes
        'style', // Code style/formatting changes
        'refactor', // Code refactoring
        'test', // Adding or modifying tests
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'], // Enforce sentence case for subject
    'subject-empty': [2, 'never'], // Enforce that subjects are not empty
    'type-case': [2, 'always', 'lower-case'], // Enforce lowercase type
    'ticketNumber-format': [2, 'always', '^\\w+-\\d+'],     
 },
plugins: [
    {
      rules: {
        'ticketNumber-format': (parsed) => {
      const jiraTicketPattern = /^([A-Z]+-[0-9]+)\s-\s(\w+)(\(.+\))?:\s(.+)$/;

      if (!jiraTicketPattern.test(parsed.subject)) {
        return [2, 'always', 'Invalid commit message format. Example: "JIRA-123 - feat(component): add new feature"'];
      }

      return [0];
    },      }
    }
  ]

};
