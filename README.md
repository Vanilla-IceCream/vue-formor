# vue-formor

Form validation for Vue in composition functions with Valibot or Zod or Yup.

The `main` branch refers to the `vue-formor` v4 release.

- Check out the [`v3.x` branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v3.x) for `v3`.
- Check out the [`v2.x` branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v2.x) for `v2`.
- Check out the [`v1.x` branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v1.x) for `v1`.

## Installation

Install `vue-formor` with your favorite package manager:

```sh
$ npm i vue-formor
# or
$ yarn add vue-formor
# or
$ pnpm i vue-formor
# or
$ bun add vue-formor
```

## Usage

```js
// esm
import { useValibotSchema, useZodSchema, useYupSchema } from 'vue-formor';

// cjs
const { useValibotSchema, useZodSchema, useYupSchema } = require('vue-formor');
```

## Documentation

To learn more about `vue-formor`, check [its documentation](https://vitesheet.onrender.com/vue-formor/).

## Examples

See [./examples](./examples).

## Playground

- [ValibotForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEvkQGbMlp1qHzHCPrlgEdhq1Iin2ZBpSWzjITitRIynZg6L/veJRkJSnStQUSS7x79NzLc6R0jH6q62TXQLSIljY3onZMclVeZpGzWcQsuKZeZUpUtTaO/cWlWGv3qzYV2xhdsbMkHdk80dmPmVqmgQofxIWDqpbcAa4YW44pUjQt05E/mkYh0qzidXJntcK8jv65rHNgUgtGFm/DeLMNMmnjzVm0da62izTd7/dJo+r7Msl1lZ5QV98l82SeFsK6kRUDZdF04AwJvkgYIFfz5PwiOQ90QhVwICZP1GaqxWKczbXaiPJJKchRCwnmz9oJrR6XxKXU+9/I5kwDQ1r5FvL7T9jv7CGk+t6ABbODUSmOmxK6Sq5v/4AD3g/OSheNRPQLzhuwWjY+xwB726gC0x7hKNt3pIxQ5Qd7fXCgbF+UT5S6QXiS6+cXSj+le5FcjLr4ZML+36gemQGeO7GDKXP6Bjas7Ua2G9IB11joItxikys+BnYT8gi/F277C2x4I92U6fUd5Hi1zmADpqwS6ndQpdtOGVIJeSILITwTcikHZsNzYG+5FbmvzIY+0EOLjg6xjNXc2r02xciIfckUTpZ1aMOdwy6HYmNikboUyrNid1vG7SgMSUF+LLpQPeAGcoyx7MsI1xWC2wllHKJVtrQYjGIY+LcRBjCvjx+2wjL844ORbQTI4iMF60oKqKpBmjUg1DekCM6Aw9Y9Q6HEwPH+Dcu33GCJYKxHt6OkbFDt8pmQsWcNAoW2DLmMJIxDqfHfg3LxOcqIhSZ9MZNOy5isdDv5B41nZ5NuI5w0+mLmk/NN50TLI/o2XGiIkRP1Rt+gcAf6hJf0JfdYQitK9U5ht+IJu1wFKcWGxaGLCamCJPFk0m9M/5yWkCBpTGPs/QXDX2z6mZ8VXHtvSMgHC1v3M28CGhHctbTCtYQSVLGiUWU0q8u0s/mnCeO3Y4fHVSF2LJfYezwDNhIOrOT17FUWDQjPytcgV9ekO/LRauQWqm4c283wwAOJNE+KCWrj6eIeakB3v/RvroFjnIbDc3SGys5ez+eYyPE4bg8pEihZ2y7xxbE7FdOtvqK49/30fUV9/eSeShxZvqXKnubzha4b57Tqw4cVBr/Kpcjvfco0sRjmFm+YwJkKmH5u0m4oumVt4ElC9K3h0/CuF3CU+AhI3KchffSlgkvrHiTg6aNr8BOakEi0Z/CDAHEPC+ZN/XmdkH4BgLcLNk9eG6gG97inATWbNWpGZl3zXDgkPKfNlWupzYKZcs3jVxc/TNn3eHb4/x038bOnJn5HYgzciz5j/5nV/gcph1qN)
- [ZodForm](https://play.vuejs.org/#eNqlVlFv4zYM/itCXuIAidylu+GWpUF3QwfcHrZDe9jDEGCn2IyrVpY8SU7SBv7voyjbcbstt92ANjHJTx8/ipTi4+j7quK7GkaL0dJlVlaeKaGLq/XIu/WIOfB1tVprWVbGevabyX80tmRba0o25mlrB4Lxd2u9TCMFLkDDQ1kp4QEtxpbd0hTNZTqIjaajyD4rRcUfnNGo5RjWrNsAClkw8gQf5pptkcnY4F6P7r2v3CJN9/s9r3X1WPDMlOkJdf01v+AXaS6dH3gx0Xo07TifTX6ODMPXl3w+5/NUyU0qdQ4HXgaGQNCsdYNFeJcZvZXFqxJwfSUV2F8qL41+WYpQyux/Ip+3NfRysnvIHv/G/+AOUeYHCw7sDgYleGEL8DF8c/czHPC5D5YmrxWizwRvwRlVB40R9q7WOcoe4Ejte+qI1MVHd3PwoF1XVBBKu0F4atMPZ0o/yb3kl4NdHEzUvxvJI7MgMi93MGXe3MKWNe14tkPZ42oHyH6Hm1uKIaidiBfY5x6AvQ8RjGkPdisyYO+Ek1lQ6WI9yCfVgjlvcV8Qy1glnNsbmw+cWN9a44Q4jz6cfHbVC0+IRZlC6sCKu9Qw4QZpaEsp/qtQue4At5BhjmVMMW1TrRDcTEhxzFa6wmEyymHhj1paQF2fPt5Lx/BP9E62laDyT5SsLSmiyhppNoDQnVAyj8GIKyWqeYXCdoHA57csuxcWSwTrAroZiHKxC1cvmpIExmduNg+Q+bgpvZJnHstLQr+j3t/BWmMXVCDvi2gmnJYk5KbHCddG44Xjn6Kzw07a0T51679kwdKTt9Pox+fzSZr4RQOaUP+nbNx3fPyPUeo3hYctdbLQ7zXuXjJhV6vYWrllSdxVTl1CkmQy6Q5cWGcUcCRNxl08Z/iJTRiH2UE7RKOgkCweyc/c6jQyeCLJQltBATpf0egymt1l2vrCasKE49bi0crljmUKO4Dne6vgwApRzebrUY8IrGIDanVDk4B8ZA3CUle1Z7sZXmSgkOZVMXEI8ObwTxVguDPDL1HPMZTh8X6cYetmby4uUMjxONwe6kikZE2zxN+V3amY1vqC4j50M/gF9XXzeypx4Pk/VXY0ny90U3tvdJc+Wpj8OlMyewySaWIxzR0+MIkzFTHd3KTtULRmZeGVIHp3CDJC6AyOhA+AxH0a0hdvHmg6/6QAbyNTQZhQTk2iM4PvC4h7WrDg6u5vTv2LAHxcsAv+xkLZh4d7GlGzWa1n5DaVyKRHwq/ocGVGhWvFFhuRzC+/nbJv8DIJ/zthk7+smoQTiTnwLAbF4bWp+RMdfUdw)
- ~~YupForm~~ (The dependencies of Yup do not support ESM)
