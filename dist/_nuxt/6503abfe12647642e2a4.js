(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{463:function(e,t,r){"use strict";r.r(t);r(26),r(11),r(6),r(5),r(13);var n=r(3),o=r(58),c=r(339),d=r(345),m=r(344),h=r(343),l=r(342),f=r(341),v=r(340);function O(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var w={components:{TableCardOfPositiveCasesAttributes:c.a,CountBoxOfTheDayBeforeRation:d.a,CountBoxOfInspectionAndPositiveSituation:m.a,GraphCardOfDischarge:h.a,GraphCardOfDead:l.a,GraphCardOfInspectionPersons:f.a,GraphCardOfAllPatients:v.a},data:function(){return{md:12}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.d)("data/jgJpn",["manager","count","isFiltered"])),head:function(){var e="https://covid19.wlaboratory.com/",t=(new Date).getTime(),r="ja"===this.$i18n.locale?"".concat(e,"/ogp/").concat(this.$route.params.card,".png?t=").concat(t):"".concat(e,"/ogp/").concat(this.$i18n.locale,"/").concat(this.$route.params.card,".png?t=").concat(t),n="".concat(this.updatedAt," | ").concat(this.$t("当サイトは全国の新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために開設したものです。"));return{title:this.title,meta:[{hid:"og:url",property:"og:url",content:e+this.$route.path+"/"},{hid:"og:title",property:"og:title",content:this.title+" | "+this.$t("全国版")+" "+this.$t("新型コロナウイルス感染症")+this.$t("対策サイト")},{hid:"description",name:"description",content:n},{hid:"og:description",property:"og:description",content:n},{hid:"og:image",property:"og:image",content:r},{hid:"twitter:image",name:"twitter:image",content:r}]}}},y=r(7),C=r(40),$=r.n(C),j=r(289),P=r(458),component=Object(y.a)(w,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",["inspection-and-positive-situation"===this.$route.params.card?r("CountBoxOfInspectionAndPositiveSituation",{directives:[{name:"show",rawName:"v-show",value:!e.isFiltered,expression:"!isFiltered"}],attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"the-day-before-ratio"===this.$route.params.card?r("CountBoxOfTheDayBeforeRation",{directives:[{name:"show",rawName:"v-show",value:!e.isFiltered,expression:"!isFiltered"}],attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"graph-card-of-all-patients"===this.$route.params.card?r("GraphCardOfAllPatients",{key:e.isFiltered,attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"graph-card-of-inspection-persons"===this.$route.params.card?r("GraphCardOfInspectionPersons",{directives:[{name:"show",rawName:"v-show",value:!e.isFiltered,expression:"!isFiltered"}],attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"graph-card-of-discharge"===this.$route.params.card?r("GraphCardOfDischarge",{directives:[{name:"show",rawName:"v-show",value:!e.isFiltered,expression:"!isFiltered"}],attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"graph-card-of-dead"===this.$route.params.card?r("GraphCardOfDead",{directives:[{name:"show",rawName:"v-show",value:!e.isFiltered,expression:"!isFiltered"}],attrs:{manager:e.manager,md:e.md}}):e._e(),e._v(" "),"positive-cases-attributes"===this.$route.params.card?r("TableCardOfPositiveCasesAttributes",{attrs:{manager:e.manager,md:e.md}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports;$()(component,{VContainer:j.a,VRow:P.a})}}]);