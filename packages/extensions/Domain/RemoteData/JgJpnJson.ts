import RemoteData from './RemoteData'

export default class JgJpnJson extends RemoteData {
  static URL = '/data/jg-jpn.json'

  constructor() {
    super(JgJpnJson.URL)
  }
}
