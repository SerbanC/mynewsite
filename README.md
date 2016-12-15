This is the second iteration of my own website, which I'm using mostly to play around, learn, improve.
Feel free to look around.

My aim was to use vanilla but future-facing code, so I decided to use:
* **[CSSNext](cssnext.io) via [PostCSS](http://postcss.org/) for CSS**
  
  Because I wanted to play around with the upcoming features. CSSNext is a collection of plugins, each for a specific feature, which are also available independently, but the people at CSSNext seem to be keeping a watch over which features are _actually_ meant to be implemented into the CSS spec in the future, and keep the collection pure from this point of view.
* **[Babel](https://babeljs.io/) (es2015 preset) for JS**

  Because it's a way of using ES6 today, that has the biggest community (which translates to documentation, plugins, support, etc.).
* **[Webpack](https://webpack.github.io/) for the bundling**

  Because I wanted to learn it better.
  
  The Webpack configuration was initially created based on the official docs, then I went through [this free online book at SurviveJS](http://survivejs.com/webpack/introduction/) and applied as needed.

* **[Yarn](https://yarnpkg.com/) for package management**

  Because it's shiny and new, and allegedly better than the NPM manager.
  
## Run it
If you'd like to play around, clone and do either an `npm i` or `yarn` depending on which one you're using, then start the dev server with `npm`/`yarn start`, or build it with `npm`/`yarn build`.
 
Note: there's no eslint in `package.json` because I used the eslint plugin in WebStorm.
