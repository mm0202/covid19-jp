<template>
  <v-container>
    <v-row>
      <CountBoxOfInspectionAndPositiveSituation
        v-show="!isFiltered"
        v-if="this.$route.params.card === 'inspection-and-positive-situation'"
        :manager="manager"
        :md="md"
      />
      <CountBoxOfTheDayBeforeRation
        v-show="!isFiltered"
        v-if="this.$route.params.card === 'the-day-before-ratio'"
        :manager="manager"
        :md="md"
      />
      <GraphCardOfAllPatients
        v-if="this.$route.params.card === 'graph-card-of-all-patients'"
        :key="isFiltered"
        :manager="manager"
        :md="md"
      />
      <GraphCardOfInspectionPersons
        v-if="this.$route.params.card === 'graph-card-of-inspection-persons'"
        v-show="!isFiltered"
        :manager="manager"
        :md="md"
      />
      <GraphCardOfDischarge
        v-if="this.$route.params.card === 'graph-card-of-discharge'"
        v-show="!isFiltered"
        :manager="manager"
        :md="md"
      />
      <GraphCardOfDead
        v-if="this.$route.params.card === 'graph-card-of-dead'"
        v-show="!isFiltered"
        :manager="manager"
        :md="md"
      />
      <TableCardOfPositiveCasesAttributes
        v-if="this.$route.params.card === 'positive-cases-attributes'"
        :manager="manager"
        :md="md"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TableCardOfPositiveCasesAttributes from '../../packages/components/Organisms/Cards/Table/TableCardOfPositiveCasesAttributes'
import CountBoxOfTheDayBeforeRation from '../../packages/components/Organisms/Cards/CountBox/CountBoxOfTheDayBeforeRation'
import CountBoxOfInspectionAndPositiveSituation from '../../packages/components/Organisms/Cards/CountBox/CountBoxOfInspectionAndPositiveSituation'
import GraphCardOfDischarge from '../../packages/components/Organisms/Cards/Graph/GraphCardOfDischarge'
import GraphCardOfDead from '../../packages/components/Organisms/Cards/Graph/GraphCardOfDead'
import GraphCardOfInspectionPersons from '../../packages/components/Organisms/Cards/Graph/GraphCardOfInspectionPersons'
import GraphCardOfAllPatients from '../../packages/components/Organisms/Cards/Graph/GraphCardOfAllPatients'

export default {
  components: {
    TableCardOfPositiveCasesAttributes,
    CountBoxOfTheDayBeforeRation,
    CountBoxOfInspectionAndPositiveSituation,
    GraphCardOfDischarge,
    GraphCardOfDead,
    GraphCardOfInspectionPersons,
    GraphCardOfAllPatients
  },
  data() {
    return { md: 12 }
  },
  computed: {
    ...mapState('data/jgJpn', ['manager', 'count', 'isFiltered'])
  },
  head() {
    const url = 'https://covid19.wlaboratory.com/'
    const timestamp = new Date().getTime()
    const ogpImage =
      this.$i18n.locale === 'ja'
        ? `${url}/ogp/${this.$route.params.card}.png?t=${timestamp}`
        : `${url}/ogp/${this.$i18n.locale}/${this.$route.params.card}.png?t=${timestamp}`
    const description = `${this.updatedAt} | ${this.$t(
      '当サイトは全国の新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために開設したものです。'
    )}`

    return {
      title: this.title,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: url + this.$route.path + '/'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.title +
            ' | ' +
            this.$t('全国版') +
            ' ' +
            this.$t('新型コロナウイルス感染症') +
            this.$t('対策サイト')
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogpImage
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogpImage
        }
      ]
    }
  }
}
</script>
