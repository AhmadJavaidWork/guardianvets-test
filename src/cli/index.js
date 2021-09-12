const program = require('commander');
const { prompt } = require('inquirer');
const actions = require('./actions');

// Questions
const loginORRegisterQuest = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email: ',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password: ',
  },
];

const logoutQuestions = [
  {
    type: 'input',
    name: 'token',
    message: 'Enter your token: ',
  },
];

program.version('1.0.0').alias('v').description('Guardianvets Nodejs Test');

program
  .command('register')
  .alias('r')
  .description('Register a new user')
  .action(() => {
    prompt(loginORRegisterQuest).then(({ email, password }) =>
      actions.register(email, password)
    );
  });

program
  .command('login')
  .alias('li')
  .description('Login')
  .action(() => {
    prompt(loginORRegisterQuest).then(({ email, password }) =>
      actions.login(email, password)
    );
  });

program
  .command('logout')
  .alias('lo')
  .description('Logout')
  .action(() => {
    prompt(logoutQuestions).then(({ token }) => actions.logout(token));
  });

program.parse(process.argv);
