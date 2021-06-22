import Vue from 'vue'
import { uid } from 'quasar'

const state = {
    notes: {
        "uid": {
            title: "Titre de la note",
            text: '<b>Texte de la note</b>',
            place: 'Notes'
        },
        "test": {
            title: "test",
            text: '<b>test</b>',
            place: 'bin'
        }
    },
    folders: {
        "notes": {
            title: "Notes",
            name: "folder_open",
            canDelete: false,
            order: 1
        },
        "archive": {
            title: "Archive",
            name: "inbox",
            canDelete: false,
            order: 3
        },
        "bin": {
            title: "bin",
            name: "delete_outline",
            canDelete: false,
            order: 3
        }
    }
}

const mutations = {
    updateNote(state, payload) {
        Object.assign(state.notes[payload.id], payload.updates)
    },
    deleteNote(state, id) {
        Vue.delete(state.notes, id)
    },
    addNote(state, payload) {
        Vue.set(state.notes, payload.id, payload.note)
    },
    addFolder(state, payload) {
        Vue.set(state.folders, payload.id, payload.folder)
    },
    deleteFolder(state, payload) {
        Vue.delete(state.folders, payload.id)
        Object.keys(state.notes).forEach(function (key) {
            if (state.notes[key].place == payload.title) {
                Vue.delete(state.notes, key)
            }
        })
    },
    changePlaceState(state, payload) {
        state.notes[payload.id].place = payload.place
    }
}

const actions = {
    updateNote({ commit }, payload) {
        commit('updateNote', payload)
    },
    deleteNote({ commit }, id) {
        commit('deleteNote', id)
    },
    deleteFolder({ commit }, payload) {
        commit('deleteFolder', payload)
    },
    addNote({ commit }, note) {
        let noteId = uid()
        let payload = {
            id: noteId,
            note: note
        }
        commit('addNote', payload)
    },
    addFolder({ commit }, folder) {
        let folderId = uid()
        let payload = {
            id: folderId,
            folder: folder
        }
        commit('addFolder', payload)
    },
    changePlaceState({ commit }, payload) {
        commit('changePlaceState', payload)
    }
}

const getters = {
    notes: state => place => {
        let notes = {}
        Object.keys(state.notes).forEach(function (key) {
            let note = state.notes[key]
            if (note.place == place) {
                notes[key] = note
            }
        })
        return notes
    },
    folders: state => {
        return state.folders
    },
    foldersTitle: state => {
        let titles = []
        let i = 0
        Object.keys(state.folders).forEach(function (key) {
            let folder = state.folders[key]
            titles[i] = folder.title
            i++
        })
        return titles
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}