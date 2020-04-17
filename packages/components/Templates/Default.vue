<template>
  <v-app class="app">
    <v-overlay
      v-if="loading || !jgJpn.loaded"
      color="#F8F9FA"
      opacity="1"
      z-index="9999"
    >
      <div class="loader">
        <div class="logo"><span class="icon" />全国版</div>
        <scale-loader color="#eb998e" />
      </div>
    </v-overlay>
    <div v-if="hasNavigation" class="appContainer">
      <div class="naviContainer">
        <SideNavigationCustom
          :is-navi-open="isOpenNavigation"
          :class="{ open: isOpenNavigation }"
          @openNavi="openNavigation"
          @closeNavi="hideNavigation"
        />
      </div>
      <main
        v-if="jgJpn.loaded"
        class="mainContainer"
        :class="{ open: isOpenNavigation }"
      >
        <v-container class="px-4 py-8">
          <nuxt />
        </v-container>
      </main>
    </div>
    <div v-else class="embed">
      <v-container>
        <nuxt />
      </v-container>
    </div>
    <NoScript />
    <development-mode-mark />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { mapState, mapActions } from 'vuex'
import NoScript from '@/components/NoScript.vue'
import DevelopmentModeMark from '@/components/DevelopmentModeMark.vue'
import SideNavigationCustom from '~/packages/components/Organisms/SideNavigationCustom.vue'

type LocalData = {
  hasNavigation: boolean
  isOpenNavigation: boolean
  loading: boolean
  dataLoad: boolean
}

export default Vue.extend({
  components: {
    DevelopmentModeMark,
    ScaleLoader,
    SideNavigationCustom,
    NoScript
  },
  data(): LocalData {
    let hasNavigation = true
    let loading = true
    if (this.$route.query.embed === 'true') {
      hasNavigation = false
      loading = false
    } else if (this.$route.query.ogp === 'true') {
      hasNavigation = false
      loading = false
    }

    return {
      dataLoad: false,
      hasNavigation,
      loading,
      isOpenNavigation: false
    }
  },
  computed: {
    ...mapState('data', ['jgJpn'])
  },
  mounted() {
    this.LOAD_DATA()
    this.loading = false
  },
  methods: {
    ...mapActions('data/jgJpn', ['LOAD_DATA']),
    openNavigation(): void {
      this.isOpenNavigation = true
    },
    hideNavigation(): void {
      this.isOpenNavigation = false
    }
  },
  head(): MetaInfo {
    const { htmlAttrs } = this.$nuxtI18nSeo()
    return {
      htmlAttrs,
      link: [
        {
          rel: 'canonical',
          href: `https://covid19.wlaboratory.com${this.$route.path}`
        }
      ],
      meta: [
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content:
            '全国版' + ' ' + '新型コロナウイルス感染症' + ' ' + '対策サイト'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '当サイトは全国の新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するためのサイトです'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://covid19.wlaboratory.com${this.$route.path}`
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.$i18n.locale
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            '全国版' + ' ' + '新型コロナウイルス感染症' + ' ' + '対策サイト'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '当サイトは全国の新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するためのサイトです'
        },
        // {
        //   hid: 'og:image',
        //   property: 'og:image',
        //   content: this.$tc('ogp.og:image')
        // },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content:
            '全国版' + ' ' + '新型コロナウイルス感染症' + ' ' + '対策サイト'
        }
        // {
        //   hid: 'twitter:image',
        //   name: 'twitter:image',
        //   content: this.$tc('ogp.og:image')
        // }
      ]
    }
  }
})
</script>
<style lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
  background-color: inherit !important;
}

.embed {
  .container {
    padding: 0 !important;
  }

  .DataCard {
    padding: 0 !important;
  }
}

.appContainer {
  position: relative;

  @include largerThan($small) {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto;
  }

  @include largerThan($huge) {
    grid-template-columns: 325px 1fr;
    grid-template-rows: auto;
  }
}

.naviContainer {
  background-color: $white;
}

@include lessThan($small) {
  .naviContainer {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: z-index-of(sp-navigation);
  }
}

@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: fixed;
    top: 0;
    overflow-y: auto;
    width: 240px;
    height: 100%;
    border-right: 1px solid $gray-4;
    border-left: 1px solid $gray-4;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    overscroll-behavior: contain;
  }
}

@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}

.open {
  height: 100vh;

  @include largerThan($small) {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.mainContainer {
  grid-column: 2/3;
  overflow: hidden;

  @include lessThan($small) {
    .container {
      padding-top: 16px;
    }
  }
}

.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  img {
    display: block;
    margin: 0 auto 20px;
  }
}

$icon-size: 3rem;

.logo {
  font-size: $icon-size * 0.6;
  color: gray;
}

.icon {
  display: inline-block;
  width: $icon-size;
  height: $icon-size;
  border-radius: 50%;
  background: #eb998e;
  margin-right: -$icon-size * 0.5;
}
</style>
