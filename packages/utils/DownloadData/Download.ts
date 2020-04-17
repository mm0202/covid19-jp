import * as fs from 'fs'
import axios from 'axios'

export default class Download {
  static readonly WORKING_DIR = 'static/data'

  static mkdirWorkingDir() {
    fs.mkdir(Download.WORKING_DIR, (e: any) => e)
  }

  constructor(private url: string, private localFileName: string) {}

  public async download(): Promise<boolean | void> {
    console.log(`start ${this.localFileName}`)
    const response = await this.get()
    if (!response) {
      return false
    }

    const data =
      typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data)
    return this.write(data, this.localFileName)
  }

  private async get(): Promise<any> {
    return await axios
      .get(this.url)
      .catch(e => console.log(`Error : ${this.localFileName} : ${e.message}`))
  }

  private write(data: string, fileName: string) {
    return fs.writeFile(this.localFilePath(fileName), data, (e: any) => e)
  }

  private localFilePath(fileName: string): string {
    return Download.WORKING_DIR + '/' + fileName
  }
}
