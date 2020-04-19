export default class CacheForPage {
  static list: { [key: string]: any } = {}

  static size(): any {
    return Object.keys(CacheForPage.list).length
  }

  static add(key: string, data: any): void {
    CacheForPage.list[key] = data
  }

  static get(key: string): any {
    return CacheForPage.list[key]
  }

  static reset() {
    CacheForPage.list = {}
  }
}
