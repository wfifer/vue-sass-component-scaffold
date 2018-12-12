A basic CLI tool for scaffolding Vue.js components

## Installation

  `npm install -g vue-sass-component-scaffold`

## Usage

  vuecs path/to/ComponentName

  will create the directory ComponentName containing

  ###### index.vue
  ```html
    <template>
      <div class="component-name">
      </div>
    </template>

    <script>
      export default {
        name: 'ComponentName'
      };
    </script>

    <style scoped lang="scss">
      @import './component-name.scss';
    </style>
  ```

  ###### ComponentName.scss
    ```css
    .component-name {
    }
  ```