export default class Utils {
  static getFormattedDate(stringOfDate: string) {
    const zeroPad = (num: number, length: number) =>
      (Array(length).join('0') + num).slice(-length)

    const date = new Date(stringOfDate)
    return (
      date.getFullYear() +
      '-' +
      zeroPad(date.getMonth() + 1, 2) +
      '-' +
      zeroPad(date.getDate(), 2)
    )
  }
}
