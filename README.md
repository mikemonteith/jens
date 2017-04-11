# Jens

A desktop app, enabling content editors to contribute to projects that would usually require developer expertise.

#### Examples:
For simple websites, a traditional web-hosted CMS can be avoided, non-developers contributing directly to the project's codebase via git, then deploying generated bundles to the web.

A mobile app that contains translation files can be maintained by the person doing the translating instead of using up a developer's time.

## Development

```
git clone https://github.com/mikemonteith/jens
cd jens
npm install
npm start
```

The app uses [electron](https://electron.atom.io/).  
The user interface is [React](https://facebook.github.io/react/), using [Redux](http://redux.js.org/docs/introduction/) actions and [sagas](https://redux-saga.github.io/redux-saga/).

Lint before committing code with `npm run lint`

### Contributing

Yes please! The more the merrier.

### Feedback

Please do open github issues to discuss this project, feature requests, bug reports, or anything else that would contribute to the community.
