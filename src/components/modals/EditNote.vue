<template>
  <q-card
    dark
    class="full-width"
  >
    <modal-header>{{ $t("editNoteTitle") }}</modal-header>
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-gutter-md">
        <modal-note-title
          ref="modalNoteTitle"
          :title.sync="noteToSubmit.title"
        />
        <modal-note-text :text.sync="noteToSubmit.text" />
      </q-card-section>
      <modal-button />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex"
export default {
  components: {
    "modal-header": require("components/modals/shared/ModalHeader.vue").default,
    "modal-note-title": require("components/modals/shared/ModalNoteTitle.vue")
      .default,
    "modal-note-text": require("components/modals/shared/ModalNoteText.vue")
      .default,
    "modal-button": require("components/modals/shared/ModalButton.vue").default
  },
  props: {
    note: {
      type: Object,
      required:true
    }, 
    id:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      noteToSubmit: {}
    }
  },
  mounted() {
    this.noteToSubmit = Object.assign({}, this.note)
  },
  methods: {
    ...mapActions("notes", ["updateNote"]),
    submitForm() {
      this.$refs.modalNoteTitle.$refs.title.validate()
      if (!this.$refs.modalNoteTitle.$refs.title.hasError) {
        this.submitNote()
      }
    },
    submitNote() {
      this.updateNote({
        id: this.id,
        updates: this.noteToSubmit
      })
      this.$emit("close")
      this.$q.notify({ message: this.$t('editedMessage'), color: 'positive', timeout: 1000 })
    }
  }
}
</script>
