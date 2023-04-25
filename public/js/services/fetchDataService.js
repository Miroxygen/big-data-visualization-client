
/**
 * Fetches specific data from sources.
 */
export class FetchDataService {
  /**
   * Fetches source data from ElasticSearch.
   *
   * @param {string} source Which source of data to retrieve.
   * @param {string} baseUrl Base url to fetch from.
   * @returns {object} Object with data.
   */
  async getElasticSourceData (source, baseUrl) {
    const response = await window.fetch(`${baseUrl}/api/v1/resource/source/tweeteddata/${source}`)
    const data = await response.json()
    return data.sortedData
  }

  /**
   * Fetches termed aggregated data from ElasticSearch,.
   *
   * @param {string} source Which source to aggregate.
   * @param {string} baseUrl Baseurl to fetch from.
   * @returns {Array} Array of data.
   */
  async getElasticTermAggregatedeData (source, baseUrl) {
    const response = await window.fetch(`${baseUrl}/api/v1/resource/term-aggregation/tweeteddata/lang.keyword/${source}`)
    const data = await response.json()
    return data.aggregations.language_type.buckets
  }
}
