<template>
  <v-row v-if="count > 0" class="DataBlock">
    <CountBoxOfInspectionAndPositiveSituation
      v-show="!isFiltered"
      :manager="manager"
    />
    <CountBoxOfTheDayBeforeRation v-show="!isFiltered" :manager="manager" />
    <GraphCardOfAllPatients
      :key="isFiltered"
      :manager="manager"
      :md="isFiltered ? 12 : 6"
    />
    <GraphCardOfInspectionPersons v-show="!isFiltered" :manager="manager" />
    <GraphCardOfDischarge v-show="!isFiltered" :manager="manager" />
    <GraphCardOfDead v-show="!isFiltered" :manager="manager" />
    <TableCardOfPositiveCasesAttributes :manager="manager" :md="12" />
  </v-row>
  <v-row v-else class="DataBlock">
    <v-col cols="12" :md="12" class="DataCard">
      データがありません。
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import GraphCardOfAllPatients from '~/packages/components/Organisms/Cards/Graph/GraphCardOfAllPatients.vue'
import GraphCardOfInspectionPersons from '~/packages/components/Organisms/Cards/Graph/GraphCardOfInspectionPersons.vue'
import GraphCardOfDead from '~/packages/components/Organisms/Cards/Graph/GraphCardOfDead.vue'
import GraphCardOfDischarge from '~/packages/components/Organisms/Cards/Graph/GraphCardOfDischarge.vue'
import CountBoxOfInspectionAndPositiveSituation from '~/packages/components/Organisms/Cards/CountBox/CountBoxOfInspectionAndPositiveSituation.vue'
import CountBoxOfTheDayBeforeRation from '~/packages/components/Organisms/Cards/CountBox/CountBoxOfTheDayBeforeRation.vue'
import TableCardOfPositiveCasesAttributes from '~/packages/components/Organisms/Cards/Table/TableCardOfPositiveCasesAttributes.vue'

export default {
  name: 'DataBlock',
  components: {
    TableCardOfPositiveCasesAttributes,
    CountBoxOfTheDayBeforeRation,
    CountBoxOfInspectionAndPositiveSituation,
    GraphCardOfDischarge,
    GraphCardOfDead,
    GraphCardOfInspectionPersons,
    GraphCardOfAllPatients
    // LoadClasses,
  },
  computed: {
    ...mapState('data/jgJpn', ['manager', 'count', 'isFiltered'])
  }
}
</script>
<style lang="scss" scoped>
.DataBlock {
  margin: 20px -8px;

  .DataCard {
    @include largerThan($medium) {
      padding: 10px;
    }

    @include lessThan($small) {
      padding: 4px 8px;
    }
  }
}
</style>
