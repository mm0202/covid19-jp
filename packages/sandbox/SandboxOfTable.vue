<template>
  <v-col cols="12" md="6" class="DataCard">
    <DataTableCustom
      title="陽性患者の属性"
      title-id="positive-cases-attributes"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="date"
      :info="sumInfoOfPatients"
      url="https://jag-japan.com/covid19map-readme/#CSVAPI"
    />
  </v-col>
</template>

<script>
import JgJpnDataManager from '@/packages/extensions/Domain/DataManager/JgJpnDataManager'
import Utils from '~/packages/utils/Utils'
import formatGraph from '~/utils/formatGraph'
import DataTableCustom from '~/packages/components/Organisms/DataTableCustom'

export default {
  components: { DataTableCustom },
  data() {
    const dataManager = new JgJpnDataManager()

    const headers = [
      { text: '確定日', value: '確定日', formatType: 'date', primary: true },
      { text: '居住都道府県', value: '居住都道府県' },
      { text: '居住市区町村', value: '居住市区町村' },
      { text: '年代', value: '年代', formatType: 'age' },
      { text: '性別', value: '性別' }
    ]
    let datasets = dataManager.createTableData(headers)
    if (process.env.NODE_ENV !== 'production') {
      datasets = datasets.slice(0, 10)
    }

    const date = Utils.getFormattedDate(datasets[0].確定日)

    const patientsGraph = formatGraph(dataManager.createGraphData())
    const sumInfoOfPatients = {
      lText: patientsGraph[
        patientsGraph.length - 1
      ].cumulative.toLocaleString(),
      sText: this.$t('{date}までの累計', {
        date: patientsGraph[patientsGraph.length - 1].label
      }),
      unit: this.$t('人')
    }

    return {
      date,
      patientsTable: {
        datasets,
        headers
      },
      sumInfoOfPatients
    }
  }
}
</script>
