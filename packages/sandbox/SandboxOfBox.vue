<template>
  <Card
    title="検査・陽性者の前日比"
    title-id="the-day-before-ratio"
    description="※ 確定日に対してのPCR検査実施累計、感染者累計、退院数の前日比"
    url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    :date="date"
  >
    <CountBox :count-data="countData" />
  </Card>
</template>

<script lang="ts">
import CountBox from '@/packages/extensions/UI/Atoms/CountBox/CountBox'
import JgJpnDataManager from '@/packages/extensions/Domain/DataManager/JgJpnDataManager'
import Utils from '~/packages/utils/Utils'
import Card from '~/packages/extensions/UI/Organisms/Card/Card.vue'

export default {
  components: { Card, CountBox },
  data() {
    const dataManager = new JgJpnDataManager()

    const countData = dataManager.createBoxDataOfTheDayBeforeRatio()
    const lastData: any = dataManager.get().pop()
    const date = Utils.getFormattedDate(lastData.確定日)

    return {
      countData,
      date
    }
  }
}
</script>
