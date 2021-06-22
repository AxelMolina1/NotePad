<template>
  <q-card
    dark
    class="full-width"
  >
    <modal-header>{{ $t("newNoteTitle") }}</modal-header>
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
  props:{
    placeFolder: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      noteToSubmit: {
        title: "",
        text: "",
        place: this.placeFolder
      }
    }
  },
  methods: {
    ...mapActions("notes", ["addNote"]),
    submitForm() {
      this.$refs.modalNoteTitle.$refs.title.validate()
      if (!this.$refs.modalNoteTitle.$refs.title.hasError) {
        this.submitNote()
      }
    },
    submitNote() {
      this.addNote(this.noteToSubmit)
      this.$emit("close")
      this.$q.notify({ message: this.$t('savedMessage'), color: 'positive', timeout: 1000 })
    }
  }
}
</script>
