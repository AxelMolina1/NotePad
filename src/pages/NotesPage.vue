<template>
  <q-page
    padding
    class="q-mx-xl"
  >
    <!-- Notes display -->
    <div>
      <notes 
        :notes="notes(placeFolder)"
        :place-folder="placeFolder"
      />
    </div>

    <!-- No note message  -->
    <span
      v-if="!Object.keys(notes(placeFolder)).length"
      class="text-h5 text-bold absolute-center"
      style="color: grey"
    >
      {{ $t('noteEmpty') }}
    </span>

    <!-- New Note dialog  -->
    <q-dialog v-model="showCreateNote">
      <add-note 
        :place-folder="placeFolder"
        @close="showCreateNote = false"
      />
    </q-dialog>

    <!-- New Note button -->
    <div
      v-if="placeFolder != 'archive' && placeFolder != 'bin'"
      class="fixed-bottom text-center q-mb-xl" 
      style="left: 47.5%; right: 47.5%"
    >
      <q-btn
        outline
        round
        style="color: goldenrod"
        size="xl"
        icon="add"
        @click="showCreateNote = true"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    'add-note': require('components/modals/CreateNote.vue').default,
    'notes': require('components/Note.vue').default
  },
  data() {
    return {
      showCreateNote: false,
      placeFolder: this.$router.currentRoute.query.placeFolder
    }
  },
  computed: {
    ...mapGetters('notes', ['notes'])
  }
}
</script>
