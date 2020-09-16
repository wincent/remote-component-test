Simple test web components to explore Remote Component features ([IFI-2013](https://issues.liferay.com/browse/IFI-2013)).

Components can be found in [the `packages/` directory](https://github.com/wincent/remote-component-test/tree/master/packages).

# Demo

Live copies of the components are hosted on GitHub pages at [remote-component-test.wincent.com](http://remote-component-test.wincent.com/).

# Building

Install dependencies by running [Yarn](https://classic.yarnpkg.com/) from the repo root:

```sh
yarn
```

Most components don't have an build process, because the JavaScript is ready to be consumed as-is.

You can build components that have an actual build step by running `yarn build` from the component's directory, or you can run `yarn build` from the top-level to build them all. For example:

```sh
# Build the `<simple-react-app>` component.
(cd packages/simple-react-app && yarn build)

# Build the Angular component.
(cd packages/angular && yarn build)

# Build all components.
yarn build
```

For convenience, these `build` scripts create a commit with the generated files, so that they can be published to GitHub pages with a `git push`. To skip the commit, you can run `yarn build:nocommit` instead.

# See also

-   [wincent/remote-app-test](https://github.com/wincent/remote-app-test): Repository that explores a different model (embedding iframes) for composing remotely hosted modules.
