import Download from './Download'

class Main {
  constructor() {
    Download.mkdirWorkingDir()
  }

  async execute() {
    await new Download(
      'https://covid19.wlaboratory.com/data/jg-jpn.json',
      'jg-jpn.json'
    ).download()
  }
}

const main = new Main()
main.execute()
