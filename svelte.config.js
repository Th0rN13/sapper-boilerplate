const sveltePreprocess = require('svelte-preprocess')

const preprocess = sveltePreprocess({
  postcss: true,
});

module.exports = {
  preprocess: preprocess,
}
