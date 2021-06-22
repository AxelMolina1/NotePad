<template>
  <div class="q-mt-xl">
    <q-list 
      v-for="(note, key) in notes"
      :id="key"
      :key="key"
      :note="note"
      dark
    >
      <!-- Note row display -->
      <q-item
        clickable
        @click.stop="showEditNote = true"
      >
        <!-- Note title and text -->
        <q-item-section>
          <q-item-label class="text-h5">
            {{ note.title }}
          </q-item-label>
          <q-item-label
            class="ellipsis"
            caption
          >
            {{ noHtmlFormat(note.text) }}
          </q-item-label>
        </q-item-section>

        <!-- Note side menu -->
        <q-item-section side>
          <q-btn
            round
            flat
            icon="more_vert"
            @click.stop=""
          >
            <q-menu dark>
              <q-list
                v-for="(folder, id) in orderedFolders"
                :id="id"
                :key="id"
              >
                <q-item
                  v-if="(placeFolder == 'bin') && (folder.title == 'bin')"
                  v-close-popup
                  clickable
                  @click.stop="confirm = true"
                >
                  <q-item-section>
                    <q-item-label style="color : red">
                      {{ $t('delete') }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-else
                  v-close-popup
                  clickable
                  @click="changePlace(folder.title, key)"
                >
                  <q-item-section>
                    <q-item-label>
                      {{ $t('moveTo') }} {{ $t(folder.title) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>

        <!-- Delete Warning dialog -->
        <q-dialog
          v-model="confirm"
        >
          <q-card
            dark
            style="max-width: 39%"
          >
            <q-card-section class="row no-wrap items-center">
              <q-avatar
                color="red"
                text-color="white"
                icon="delete"
              />
              <span class="q-mx-md text-h6">
                {{ $t('deleteWarningMessage') }}
              </span>
            </q-card-section>
            <q-card-actions
              align="right"
              class="q-mr-md"
            >
              <q-btn
                v-close-popup
                flat
                :label="$t('cancel')"
                color="primary"
              />
              <q-btn
                v-close-popup
                flat
                :label="$t('confirmation')"
                color="primary"
                @click="promptToDelete(key)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Edit note dialog -->
        <q-dialog v-model="showEditNote">
          <edit-note
            :id="key"
            :note="note"
            @close="showEditNote = false"
          />
        </q-dialog>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'edit-note': require('components/modals/EditNote.vue').default
  },
  props: {
    notes: {
      type: Object,
      required:true
    },
    placeFolder:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      confirm: false,
      showEditNote: false
    }
  },
  computed:{
    ...mapGetters('notes', ['folders']),
    orderedFolders(){
      return _.orderBy(this.folders, ['order', 'title'], ['asc'])
    }
  },
  methods: {
    ...mapActions('notes', ['changePlaceState', 'deleteNote']),
    promptToDelete(id) {
      this.deleteNote(id)
      this.confirm = false
      this.$q.notify({ message: this.$t('deletedNote'), color: 'positive', timeout: 1000 })
    },
    changePlace(place, id){
      this.changePlaceState({
        id: id,
        place: place
      })
    },
    noHtmlFormat: string => string.replace(/<[^>]+>/g, '')
  }
}
</script>
