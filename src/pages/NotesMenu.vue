<template>
  <q-page padding>
    <div style="margin: 0 20%">
      <!-- Modifying buttons -->
      <div class="text-right">
        <label
          class="toggle-switchy"
          data-size="sm"
          data-style="rounded"
        >
          <input
            id="example"
            type="checkbox"
          >
          <span class="toggle">
            <span class="switch" />
          </span>
        </label>
        <q-btn
          flat
          round
          color="negative"
          icon="clear"
          @click="showDeleteButton = !showDeleteButton"
        />
        <q-btn
          class="q-ma-sm"
          flat
          round
          color="primary"
          icon="add"
          @click="showFolderDialog = true"
        />
      </div>

      <!-- Folder list display -->
      <q-list
        bordered
        dark
        separator
        style="border-radius: 15px"
      >
        <q-item
          v-for="(folders, key) in orderedFolders"
          :key="key"
          clickable
          @click="changePath(folders.title)"
        >
          <q-item-section
            v-if="showDeleteButton"
            avatar
          >
            <q-btn
              flat
              round
              size="sm"
              color="negative"
              icon="clear"
              @click.stop="passId(key)"
            />
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              :name="folders.name"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t(folders.title) }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              {{ Object.keys(notes(folders.title)).length }}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              name="chevron_right"
              color="primary"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Delete Warning dialog -->
    <q-dialog
      v-model="confirm"
    >
      <q-card
        dark
        style="max-width: 39%"
      >
        <q-card-section class="row no-wrap items-center q-my-md">
          <q-avatar
            color="red"
            text-color="white"
            icon="delete"
          />
          <span class="q-mx-md text-h6">
            {{ $t('deleteWarningFolder') }}
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
            @click="promptToDelete(tempId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
    <!-- Create Folder dialog -->
    <q-dialog v-model="showFolderDialog">
      <add-folder
        @close="showFolderDialog = false"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    'add-folder': require('components/modals/CreateFolder.vue').default
  },
  data() {
    return {
      confirm: false,
      showDeleteButton: false,
      showFolderDialog: false,
      tempId: ''
    }
  },
  computed: {
    ...mapGetters('notes', ['notes', 'folders']),
    orderedFolders(){
      return _.orderBy(this.folders, ['order', 'title'], ['asc'])
    }
  },
  methods:{
    test(){
      console.log(this.orderedFolders)
    },
    ...mapActions('notes', ['deleteFolder']),
    passId(id){
      this.confirm = true
      this.tempId = id
    },
    promptToDelete(id) {
      if(this.folders[id].canDelete){
        this.deleteFolder({ 
          id: id,
          title: this.folders[id].title })
        this.confirm = false
        this.showDeleteButton = false
        this.$q.notify({ message: this.$t('deletedFolder'), color: 'positive', timeout: 1000 })
      } else {
        this.$q.notify({ message: this.$t('cantDelete'), color: 'negative', timeout: 1000 })
      }
    },
    changePath(param){
      this.$router.push({ path: 'notes', query: { placeFolder: param } })
    }
  }
}
</script>
