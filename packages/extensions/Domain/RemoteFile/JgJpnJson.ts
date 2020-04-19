import { RemoteFile } from '@mm0202/remote-file'

export default class JgJpnJson extends RemoteFile {
  static URL = '/data/jg-jpn.json'

  constructor() {
    super(JgJpnJson.URL)
  }
}
