import axios, { AxiosResponse } from 'axios'
import Cache from '@/packages/extensions/Domain/Cache/Cache'

export default class RemoteData {
  private cacheKey = this.constructor.name + '/' + this.url

  constructor(private readonly url: string) {}

  async get(): Promise<{ response: AxiosResponse<any>; cache: boolean }> {
    const cachedResponse = Cache.get(this.cacheKey)
    if (cachedResponse) {
      return { response: cachedResponse, cache: true }
    }

    const response = await axios.get(this.url)
    Cache.add(this.cacheKey, response)

    return { response, cache: false }
  }

  getFromCache() {
    return { response: Cache.get(this.cacheKey), cache: true }
  }
}
