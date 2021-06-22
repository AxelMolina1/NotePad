<template>
  <q-layout view="hHh Lpr fFf">
    <q-header
      elevated
      class="bg-black"
    >
      <q-toolbar>
        <q-toolbar-title class="text-center q-ml-xl my-font ">
          <router-link
            v-slot="{ navigate }"
            to="/"
            custom
          >
            <span
              class="text-h4 cursor-pointer"
              @click="navigate"
            >
              {{ $t('titleApp') }}
            </span>
          </router-link>
        </q-toolbar-title>
        <q-btn-group>
          <q-btn
            :style="{ background: enColor }"
            dense
            :ripple="false"
            label="EN"
            @click="($i18n.locale = 'en-us'), languageColor()"
          />

          <q-btn
            :style="{ background: frColor }"
            dense
            :ripple="false"
            label="FR"
            @click="($i18n.locale = 'fr'), languageColor()"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawerLeft: false,
      enColor: '#DAA520',
      frColor: 'black',
      showEditNote: false
    }
  },
  computed: {
    ...mapGetters('notes', ['notes'])
  },
  created(){
    this.languageColor()
  },
  methods: {
    languageColor() {
      if (this.$i18n.locale == 'fr') {
        this.enColor = 'black'
        this.frColor = '#DAA520'
      } else {
        this.enColor = '#DAA520'
        this.frColor = 'black'
      }
    }
  }  
}
</script>
<style lang="stylus">
.q-toolbar__title span:hover
  color: #daa520 !important
  transition: color 0.5s
.q-toolbar__title span
  transition: color 0.5s
</style>
