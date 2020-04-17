<template>
  <Card
    title="検査・陽性者の前日比"
    title-id="the-day-before-ratio"
    description="※ 確定日に対してのPCR検査実施累計、感染者累計、退院数の前日比"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :date="date"
    :md="md"
  >
    <CountBox :count-data="countData" />
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import CountBox from '@/packages/extensions/UI/Atoms/CountBox/CountBox'
import Card from '~/packages/extensions/UI/Organisms/Card/Card.vue'
import JgJpnDataManager from '~/packages/extensions/Domain/DataManager/JgJpnDataManager'

export default {
  components: { Card, CountBox },
  props: {
    manager: {
      type: JgJpnDataManager,
      required: true
    },
    md: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      countData: this.manager.createBoxDataOfTheDayBeforeRatio()
    }
  },
  computed: {
    ...mapState('data/jgJpn', ['date'])
  }
}
</script>
