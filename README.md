# Fluxon x UCU Summer School project template `🤓`

Oh boy... Welcome to the project repository, hope you are excited! This README file gives you some context on how to start your work on the project, guides you through the local development setup, and provides some useful materials to help you learn stuff we're using here.

^ 🚧 students, replace this paragraph with your project description once you are all set up! Make this document yours! 🚧

Technologies used:

- [React](https://react.dev/) - UI framework/library
- [TypeScript](https://www.typescriptlang.org/) - strict types for JavaScript
- [Firebase](https://firebase.google.com/docs) - authentication functionality (Firebase Auth), database (Firestore), web app hosting (Firebase Hosting). Basically, it serves as the backend for our app.
- [Chakra UI](https://chakra-ui.com/) - UI component library
- [Vite](https://vitejs.dev/) - thing that bundles all the above together. A tool that takes all the source code files and bundles them together to build the app 🛠️

## Local development

This bulleted list will help you set up your machine for local development.

1. All following commands use a shell terminal (bash, zsh, whatever). On MacOS and Linux, it is available for you out of the box. On Windows, you have to either install WSL (which is time consuming), or Git Bash. This answer contains some useful links: https://superuser.com/a/1763710
1. Create a GitHub account (if haven't yet). Don't forget to pick a cool username 😎
1. Install Git (if haven't yet or not available): https://github.com/git-guides/install-git
1. Install Node.js 20: follow instructions on https://nodejs.org/en/download/package-manager
1. Install VSCode or your preferred text editor / IDE: https://code.visualstudio.com/Download
1. Configure your editor to run ESLint on file save. This will ensure the code looks great for everyone the same way 💅
   - if using VSCode, paste the following snippet into .vscode/settings.json file (create if missing): `{"typescript.tsdk": "node_modules/typescript/lib","editor.codeActionsOnSave": {"source.fixAll.eslint": "explicit"},"[json]": {"editor.defaultFormatter": "vscode.json-language-features","editor.formatOnSave": true}}`
   - if using any other IDE, start questioning your life decisions. Or just ask mentors for help 😇
1. Clone this Git repository:
   - create a dedicated folder for cool projects like this one (or use your preferred one): `cd ~; mkdir Projects; cd Projects`.
   - copy the Git repository URL: on the GitHub page of this repository, click the green `<> Code` button > `📋` button to the right of the repository url.
   - in the cool projects folder, execute the `git clone <copied repository url>` command, pasting the repo url. This will copy the project files from GitHub to your machine.
   - navigate to the cloned repository by `cd <repository name>`.
1. Install JavaScript dependencies using NPM: `npm install`
1. Start the app dev server with `npm run dev`
1. Go to http://localhost:5173/ to see this wonderful project live
1. Make changes to files within the src/ folder to see them reflected on the page
1. You should be all set! Now you can start contributing to the project! 🤘

## Deployment

TODO: Fill in this section.

## USEFUL MATERIALS

> Before you proceed with this section, yet another reminder: there is no such thing as a stupid or lame question. If you're feeling like you don't know something, this means there's room for improvement – just say it out loud and your mentor or peers will help you! We're all here to learn something new ([even mentors!](https://github.com/FluxonApps/ucu-summer-school-project-template/assets/86969397/73f4948e-fb0d-4dc8-b43d-b9859acf0612)), so let's have fun learning together!!!

> No, seriously, if there's anything, no matter however """obvious""" this thing feels to you, don't be shy asking about it. Or we'll be after you when the Summer School is over 🥷

[React.js official guide](https://react.dev/learn)

[React.js cheat sheet](https://devhints.io/react) - we're mostly interested in "Other components", "Hooks", and "JSX patterns" sections.

[Firebase official guide](https://firebase.google.com/docs/web/setup)

[Git cheat sheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf)

### Web Basics

We've also got some basics for you – it's never late to learn them!

[HTML & CSS guide](https://internetingishard.netlify.app/) - a well-rounded guide on how webpages work

JavaScript guides:

- https://www.geeksforgeeks.org/introduction-to-javascript/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
- ask a mentor for JS introduction and other materials

The above list is incomplete, so if you need anything - you know [whom](https://github.com/FluxonApps/ucu-summer-school-project-template/assets/86969397/f93ff07b-f70e-476d-9ed5-14f25d474a53) to ask 😊

Good luck!
