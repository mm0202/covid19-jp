<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">
        {{ headerItem.title }}
      </page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }} </span>
        <time :datetime="updatedAt">{{ date }}</time>
      </div>
      <div v-if="!['ja', 'ja-basic'].includes($i18n.locale)" class="Annotation">
        <span>{{ $t('注釈') }} </span>
      </div>
    </div>
    <!--        <whats-new class="mb-4" :items="newsItems"/>-->
    <!--        <static-info-->
    <!--                class="mb-4"-->
    <!--                :url="localePath('/flow')"-->
    <!--                :text="$t('自分や家族の症状に不安や心配があればまずは電話相談をどうぞ')"-->
    <!--                :btn-text="$t('相談の手順を見る')"-->
    <!--        />-->
    <FilterBlock />
    <!--    <FilterBlock v-if="!isMobile.any" class="filter-block" />-->
    <DataBlock />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import isMobile from 'ismobilejs'
import PageHeader from '@/components/PageHeader.vue'
import Data from '@/data/data.json'
import News from '@/data/news.json'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'
import DataBlock from '~/packages/components/Organisms/DataBlock.vue'
import Utils from '~/packages/utils/Utils'
import JgJpnDataManager from '~/packages/extensions/Domain/DataManager/JgJpnDataManager'
import FilterBlock from '~/packages/components/Organisms/FilterBlock/FilterBlock.vue'

export default Vue.extend({
  components: {
    // LoadClasses,
    FilterBlock,
    PageHeader,
    // WhatsNew,
    // StaticInfo,
    DataBlock
  },
  data() {
    const dataManager = new JgJpnDataManager()
    const date = Utils.getFormattedDate(
      dataManager.getRecent('確定日')
    ).replace(/-/g, '/')

    return {
      isMobile,
      date,
      Data,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: '全国の最新感染動向'
      },
      newsItems: News.newsItems
    }
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  head(): MetaInfo {
    return {
      title: '全国の最新感染動向' as string
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }

  @media (max-width: 700px) {
    .filter-block {
      display: none;
    }
  }
}
</style>
