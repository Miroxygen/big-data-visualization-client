
/**
 * Handles data in a certain way to extract info or make it easier to work with.
 */
export class DataHandlerService {
  /**
   * Counts the occurences of values in a data collection.
   *
   * @param {Array} data Array of data.
   * @returns {Array} Array of data.
   */
  countData (data) {
    const counts = {}
    for (const value of data) {
      counts[value] = counts[value] ? counts[value] + 1 : 1
    }
    let countsArray = Object.values(counts)
    countsArray = countsArray.sort((a, b) => b - a)
    return countsArray.slice(0, 5)
  }

  /**
   * Sorts aggregated data from ElasticSearch based on its values and the desirable size of the returned array.
   *
   * @param {object} data Object with data.
   * @param {number} desiredArraySize Determines index size of returned object.
   * @param {string} value The value to extract from object.
   * @returns {object} Object of data.
   */
  sortAggregatedData (data, desiredArraySize, value) {
    const aggreGatedData = []
    let lastValuesToFitChartSize = 0
    for (let index = 0; index < (desiredArraySize); index++) {
      aggreGatedData.push(data[index][value].value)
    }
    for (let index = 0; index < (desiredArraySize); index++) {
      lastValuesToFitChartSize += parseInt(data[index][value].value)
    }
    aggreGatedData.push(lastValuesToFitChartSize.toString())
    return aggreGatedData
  }

  /**
   * Calculcates a median number.
   *
   * @param {Array} data Array of data.
   * @returns {number} Median number.
   */
  calculateMedian (data) {
    const numberArray = data.map(parseFloat)
    const sortedArray = numberArray.sort((a, b) => a - b)
    const middleNumber = Math.floor(sortedArray.length / 2)
    if (sortedArray.length % 2 === 1) {
      return sortedArray[middleNumber]
    }
    return (sortedArray[middleNumber - 1] + sortedArray[middleNumber]) / 2
  }
}
