export default class Cache {
  static list: { [key: string]: any } = {}

  static size(): any {
    return Object.keys(Cache.list).length
  }

  static add(key: string, data: any): void {
    Cache.list[key] = data
  }

  static get(key: string): any {
    return Cache.list[key]
  }

  static reset() {
    Cache.list = {}
  }
}
