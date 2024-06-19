# vue-formor

Form validation for Vue in composition functions with Valibot or Zod or Yup.

The main branch refers to the `vue-formor` v5 release. Check out the [v4.x branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v4.x) for v4.

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

- [ValibotForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEvlgGbClt0KHzHG/rkAEdhq1Iin2ZBpSWTjITitRIynZg6L/veJRkJSnSrQMSW7x7+NzLc6R1in5smmTfQrSK1jY3onFMclVdZZGzWcQsuLbZZErUjTaO/cGl2Gr3szY1K42u2SxJJzZPNPsuU+s0UOFGXDioG8kd4Iqx9ZQiRdM6nfijRRQiLWveJHdWK8zr5PdlvQOTWjGyeBvGW5bIpI03Z9HOucau0vRwOCStau6rJNd1ekalhbBussYQWbQY2UJqL1IFSOARqoAjUXiGLlMd5u9srlUpqifZ4+ZGSDC/N05o9bgKLqU+/EI2Z1oY88l3kN9/xn5njyHHDwYsmD1ManDcVNCXcH37GxzxeXTWumglol9w3oDVsvU5Bti7VhWY9gRH2b4nMYSqPtrrowNlh6J8otQNwpNCP71Q+jndy+Ry0sUnQ/XvpvPEDPDciT0smNM3ULKun9J+Lkdca6GPcItNrvkU2I/GI7ym1LlcML29g9wtmHUGq1+wWqhfQVVut2DII+SZKfB7GiRSDkzJc2DvuBW5L8uGJtCm71c9H4IZa7i1B22KqRXbkikcLOvQhmeFXY21xsQjdSWU58XmdozbSSBSgvxYc6EGwA3kGGR9Dw+6nKL7oBvc1s0p+xC3tpXFsBTNwN+tMFCs2KePO2EZ/vHRyEoBsvhEYam8AVW3SLMFhPrmFMEZcNjGZyjUGjg+v2X5jhssFoz16G6SlA3yXT1TNPasQazQoDGXQcs41Bn/OUoYv0I9scpkqGTeixqTlR7nf6FxNpv3x2HQ6r/Snp1veydaHnF34YvmGDlRc/SNKvegz3hJY3JPxbOiUu8V9imes6tNEFGULA79S0gPJInn8+Fs+n1aQoKkMQ2z9xcMP7HdMz8luPbekJAPFk7vF+5/Gg48uLTCtYQKVLGhAWQ0geu0t/ndhPEnssfjqhB7lktsPF4DpYQjq3izfJ1FI8Kz8i3IzTUpjny0mriFalrH9ku880AizZNigtR4wbiHBtA9LP3v1cgxTcPhVbpEZZdvLi4wkdNp2h5SJFCyrlvjb8f+XEy/+oriPgyj9xX1DWN7LnFi+T9VDjRfLnTbOqfVED6sMPgPuRT5vU+ZJhbD3OIDEzhTATPMTdoPRb9sDDxJiN4wfBre9QKOEp8Aifs8pI/eT3Bp3YMEvHd0A35CExKJzgy+EyDuYcW8abizE9IvAPBxxS6SNwbq0T3taUAtl61aklk3PBcOCV/R4cq11GbFTLXl8evLbxfsG7w7/P+em/jZrrk/kRgDz6LP2L9cdf8AA8xYuQ==)
- [ZodForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEvlgGbClt0KHzHG/rkAHdh61Iin0YBKy0dFaYUKRGUrYTQ/99x6Mky9nqvgGJrbt7ePcc7yGtQ/RzXSfbBqJFtLS5EbVjkqvyKouczSJmwTX1KlOiqrVx7C9d/KpNxTZGV2ySpJ3tE0x+yNQyDSlwARoOqlpyB2gxtuyXpmgu01EsmkUh+7zidXJvtUIuB78m6wJIZMHI431Ya77BTNp4dxbdOVfbRZrudrukUfVDmeS6So+otBDWjWwskUWzPtuTLs6lwXAqxToVqoB9UvmlfmWbqRZ5O5trtRHlM9a4sBYSzB+1E1qdsudS6t1v5HOmgYFHfgf5w//47+0+8HtnwILZwoi746YEF8LXt7/DHp+HYKWLRiL6TPAGrJaN5xhgbxpVIO0Rjti+pSEIVb6313sHyvZNeaK0G4SnyfxypvUj3cvkcrSLIxF9ngoPzADPndjCjDl9AxvWdorsdDjgGguY/RY3t+JjUCeFE+zTAMCh+wjGlAOz4TmwN9yK3LO0oR/MJ+SPC2adwY1BMGM1t3anTTH2YoeZQo1Yhz6UO7saqMeUR+pSKJ8X96ll3I4K0aZS/E8uC9UDbiDHIssHeNSbMborusJl7ZTYh7qVLS2WpWoG/mmEgWLBPry/E5bhHx+cbCNAFh+oLLXXo6oG06wBoVsuRRGCAVcJ5PUMhaMDjs+vWX7HDTYLxnp0OyJlw0SuTgYU+4xPiV7fQ+7C9gxMnpLQXuxnH/j+DcZos6AGk6GJdprQkpjc9DhNkGb8YnaKnHYi78f2ZTV8xtddRnw+V6INXyTUmFQwY5Nh7pOPRmnqFB6P04pSvVW4c/GUXa3CWMWGxWFHE5oQJomn0/7g+XVaQoJJ40kfLxh+4gAmXjdo+2gg5IuFo/mJC53kgieTLLQllKCKFUmSkSaXaefzqwnjj12HR6sQW5ZL3H885xsJe1byev4yiwaEz8rXIFfXpALMR9YoLFTdOLad44UGEtM8ayYIAG8Q91gDhnvT/wgNOcY0HN6Tcxzd/NXFBRI5HMbbQxMJKVnbLvGHZXtsprO+orl3vQK/or9evccWR55v6bJP8+lG141zWvXlg4XFf8qlyB88ZVIslrnFByZQUwHT6ybtRNGZtYFnhOi1wdPwoTM4Ij4CUu6jSE9eOtC07lEC3kS6Bq/QhIZEZwZfGBD3uGDe1d/iCc0vAPBxwS6SVwaqITze04Cazxs1J7eueS4cJnxBhyvX0l8qplzz+OXl9zP2HV4l/n/LTfyfVVN/IrEGnkXP2L8xtf8Ckf1Fdw==)
- ~~YupForm~~ (The dependencies of Yup do not support ESM)
