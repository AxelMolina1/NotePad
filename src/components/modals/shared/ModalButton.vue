<template>
  <q-card-actions
    class="q-mr-sm"
    align="right"
  >
    <q-btn
      type="submit"
      outline
      color="primary"
      :label="$t('saveButton')"
      class="q-my-md float-right"
      @click="$emit('click')"
    />
  </q-card-actions>
</template>

<script>
export default {}
</script>

<style></style>
