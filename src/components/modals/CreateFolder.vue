<template>
  <q-card
    dark
    class="full-width"
  >
    <modal-header>{{ $t("newFolderTitle") }}</modal-header>
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-gutter-md">
        <modal-note-title
          ref="modalNoteTitle"
          :title.sync="folderToSubmit.title"
        />
      </q-card-section>
      <modal-button />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex"
import { mapGetters } from "vuex"
export default {
  components: {
    "modal-header": require("components/modals/shared/ModalHeader.vue").default,
    "modal-note-title": require("components/modals/shared/ModalNoteTitle.vue")
      .default,
    "modal-button": require("components/modals/shared/ModalButton.vue").default
  },
  data() {
    return {
      folderToSubmit: {
        title: "",
        name: "folder_open",
        canDelete: true,
        order : 2
      }
    }
  },
  methods: {
    ...mapActions("notes", ["addFolder"]),
    ...mapGetters("notes", ['foldersTitle']),
    submitForm() {
      var array = this.foldersTitle()
      for(let i=0; i<Object.keys(this.foldersTitle()).length; i++){
        if(array[i] == this.folderToSubmit.title){
          this.$q.notify({ message: this.$t('existFolder'), color: 'negative', timeout: 1000 })
          return
        }
      }
      this.$refs.modalNoteTitle.$refs.title.validate()
      if (!this.$refs.modalNoteTitle.$refs.title.hasError) {
        this.submitFolder()
      }
    },
    submitFolder() {
      this.addFolder(this.folderToSubmit)
      this.$emit("close")
      this.$q.notify({ message: this.$t('savedFolder'), color: 'positive', timeout: 1000 })
    }
  }
}
</script>
