<template>
  <q-editor
    dark
    filled
    :value="text"
    @input="$emit('update:text', $event)"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
