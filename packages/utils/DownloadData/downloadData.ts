import Download from './Download'

class Main {
  constructor() {
    Download.mkdirWorkingDir()
  }

  async execute() {
    await new Download(
      'https://covid19-data-2.wlaboratory.com/jg-jpn.json',
      'jg-jpn.json'
    ).download()
  }
}

const main = new Main()
main.execute()
