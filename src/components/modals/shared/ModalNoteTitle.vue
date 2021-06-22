<template>
  <q-input
    ref="title"
    dark
    :value="title"
    :label="$t('inputTitle')"
    :rules="[val => !!val || $t('inputRequiredTitle')]"
    autofocus
    @input="$emit('update:title', $event)"
  >
    <template #append>
      <q-icon
        v-if="title"
        name="close"
        class="cursor-pointer"
        @click="$emit('update:title')"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    title:{
      type: String,
      default: ''
    }
  }
}
</script>
