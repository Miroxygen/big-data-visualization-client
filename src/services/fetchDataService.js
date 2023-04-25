import 'dotenv/config'


/**
 * Fetches specific data from sources.
 */
export class FetchDataService {

  /**
   * Fetches source data from ElasticSearch.
   * @param {string} source Which source of data to retrieve.
   * @returns {object} Object with data.
   */
  async getElasticSourceData(source) {
    const response = await window.fetch(`${process.env.BASE_URL}/api/v1/resource/source/tweeteddata/${source}`)
    const data = await response.json()
    return data.sortedData
  }

  /**
   * Fetches termed aggregated data from ElasticSearch,.
   * @param {string} source Which source to aggregate.
   * @returns {Array} Array of data.
   */
  async getElasticTermAggregatedeData(source) {
    const response = await window.fetch(`${process.env.BASE_URL}/api/v1/resource/term-aggregation/tweeteddata/lang.keyword/${source}`)
    const data = await response.json()
    return data.aggregations.language_type.buckets
  }
}