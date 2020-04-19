import RemoteFile from './RemoteFile'

export default class JgJpnJson extends RemoteFile {
  static URL = '/data/jg-jpn.json'

  constructor() {
    super(JgJpnJson.URL)
  }
}
