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

- [ValibotForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEvkQGbMlp1q3zHCPrkAEdhq1Iin2ZBpSWzjITitRIynZg6L/veJRkJSnStQUSW7x7+NzLc6R1jH6u62TXQLSIljY3onZMclVeZpGzWcQsuKZeZUpUtTaO/cWlWGv3qzYV2xhdsbMkHdk80dlPmVqmgQo34sJBVUvuAFeMLccUKZqW6cgfTaMQaVbxOrmzWmFeR78v6xyY1IKRxdsw3myDTNp4cxZtnavtIk33+33SqPq+THJdpSfU1XfJPJmnhbBuZMVAWTQdOEOCLxIGyNU8Of8hOQ90QhVwICZP1GaqxWKczbXaiPJJKchRCwnmz9oJrR6XxKXU+9/I5kwDQ1r5FvL7T9jv7CGk+t6ABbODUSmOmxK6Sq5v/4ADPg/OSheNRPQLzhuwWjY+xwB726gC0x7hKNt3pIxQ5Qd7fXCgbF+UT5S6QXiS65cXSj+le5FcjLr4ZML+36gemQGeO7GDKXP6Bjas7Ua2G9IB11joItxikys+BnYT8givKXUup0yv7yB3U2adweqnrBLqd1Cl204Z8gh5Ygr8ngaJlAOz4Tmwt9yK3JdlQxNo06KjQyxjNbd2r00xMmJTMoVjZR3a8Niwy6HSmFikLoXyrNjalnE7CkM6kB8rLlQPuIEcYyz7MsL3CsHthDIO0SpbWgxGMQz82wgDmNfHD1thGf7xwcg2AmTxkYJ1JQVU1SDNGhDqG1IEZ8Bh656hUF/g+PyG5VtusEQw1qPbUVI2SHb5TMXYswaBQluGXHr94lBn/PcgW3yOGmKVSV/JpBMyJis9Tv5B49nZpDsCJ4G+jPbkfNM50fKIuw1fNLvIiUqjb9C2A33CS8qSeyyeFaV6p7BP8YRdroKIYsPi0L+E9ECSeDLpz6PfpyUkSBrTAHt/wfAT233mpwTX3hsS8sHCif3MDwANBx5WWuFaQgmqWNGQMprSZdrZ/G7C+FPY4XFViB3LJTYej/5GwoGVvJ69yqIB4Vn5GuTqmhRHPlqN3ELVjWO7Gd5zIJHmSTFBarxU3EMN6O6X/gdr4Bin4fD6nKGys9fzOSZyPI7bQ4oESta2S/y92J2K6VZfUdz7fvS+or5+bE8ljizfUmVP8/lC141zWvXhwwqDX+VS5Pc+ZZpYDHOLD0zgTAVMPzdpNxTdsjbwJCF6xfBpeNcLOEp8BCTu05A+ekHBpXUPEvDe0TX4CU1IJDoz+B6AuIcF86b+pk5IvwDAxwWbJ68NVIN73NOAms0aNSOzrnkuHBKe0+HKtdRmwUy55vGrix+n7Hu8O/z/jpv42a6JP5EYA8+iz9i/XbX/AVomV0A=)
- [ZodForm](https://play.vuejs.org/#eNqlVlFv4zYM/itCXuIAidylu+GWpUF3QwfcHrZDe9jDEGCn2IyrVpY8SU7SBv7voyjbcbstt92ANjHJTx8/ipTi4+j7quK7GkaL0dJlVlaeKaGLq/XIu/WIOfB1tVprWVbGevabyX80tmRba0o25mlrB4Lxd2u9TCMFLkDDQ1kp4QEtxpbd0hTNZTqIjaajyD4rRcUfnNGo5RjWrNsAClkw8gQf5pptkcnY4F6P7r2v3CJN9/s9r3X1WPDMlOkJdf01v+AXaS6dH3gx0Xo07TifTX6ODMPXl3w+5/NUyU0qdQ4HXgaGQNCsdYNFeJcZvZXFqxJwfSUV2F8qL41+WYpQyux/Ip+3NfRysnvIHv/G/+AOUeYHCw7sDgYleGEL8DF8c/czHPC5D5YmrxWizwRvwRlVB40R9q7WOcoe4Ejte+qI1MVHd3PwoF1XVBBKu0F4atMPZ0o/yb3kl4NdHEzUvxvJI7MgMi93MGXe3MKWNe14tkPZ42oHyH6Hm1uKIaidiBfY5x6AvQ8RjGkPdisyYO+Ek1lQ6WI9yCfVgjlvcV8Qy1glnNsbmw+cWN9a44Q4jz6cfHbVC0+IRZlC6sCKu9Qw4QZpaEsp/qtQue4At5BhjmVMMW1TrRDcTEhxzFa6wmEyymHhj1paQF2fPt5Lx/BP9E62laDyT5SsLSmiyhppNoDQnVAyj8GIKyWqeYXCdoHA57csuxcWSwTrAroZiHKxC1cvmpIExmduNg+Q+bgpvZJnHstLQr+j3t/BWmMXVCDvi2gmnJYk5KbHCddG44Xjn6Kzw07a0T51679kwdKTt9Pox+fzSZr4RQOaUP+nbNx3fPyPUeo3hYctdbLQ7zXuXjJhV6vYWrllSdxVTl1CkmQy6Q5cWGcUcCRNxl08Z/iJTRiH2UE7RKOgkCweyc/c6jQyeCLJQltBATpf0egymt1l2vrCasKE49bi0crljmUKO4Dne6vgwApRzebrUY8IrGIDanVDk4B8ZA3CUle1Z7sZXmSgkOZVMXEI8ObwTxVguDPDL1HPMZTh8X6cYetmby4uUMjxONwe6kikZE2zxN+V3amY1vqC4j50M/gF9XXzeypx4Pk/VXY0ny90U3tvdJc+Wpj8OlMyewySaWIxzR0+MIkzFTHd3KTtULRmZeGVIHp3CDJC6AyOhA+AxH0a0hdvHmg6/6QAbyNTQZhQTk2iM4PvC4h7WrDg6u5vTv2LAHxcsAv+xkLZh4d7GlGzWa1n5DaVyKRHwq/ocGVGhWvFFhuRzC+/nbJv8DIJ/zthk7+smoQTiTnwLAbF4bWp+RMdfUdw)
- ~~YupForm~~ (The dependencies of Yup do not support ESM)
