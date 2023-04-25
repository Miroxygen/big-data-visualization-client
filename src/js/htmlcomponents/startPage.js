/**
 * The startpage of the application.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

import './nav-bar.js'
import './chart-displayer.js'
import './data-selecter.js'
import { DataHandlerService } from '../services/dataHandlerService.js'
import { FetchDataService } from '../services/fetchDataService.js'

const template = document.createElement('template')

template.innerHTML = `
<style>
.hidden {
  display: none;
}
#holder {
  width: 1100px;
  height: 630px;
  background: white;
  right:200px;
  top:80px;
  position: absolute;
  box-shadow: 0 2px 20px rgba(0, 0, 0.0, 0.3);
  
}

button {
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #666;
}
#startButton {
  top:550px;
  right: 650px;
  position:absolute;
  padding: 15px 25px;
}
#dataButton {
  margin:15px;
  margin-left:400px;
}
#exitButton {
  margin-left:450px;
  padding:10px;
}
</style>
<button id="startButton">Open Diagram App</button>
<div id="holder" class="hidden">
<nav-bar>
  <button id="dataButton">Get sample data</button>
  <button id="exitButton">X</button>
</nav-bar>
<data-selecter id="dataSelect" class="hidden"></data-selecter>
<chart-displayer id="chartDisplayer" class="hidden"></chart-displayer>
</div>
`
 
 export class StartPage extends HTMLElement {
    #holder
    #startButton
    #exitButton
    #chartDisplayer
    #dataButton
    #dataSelect
    constructor(dataHandler = new DataHandlerService(), fetchData = new FetchDataService()) {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.dataHandler = dataHandler
      this.fetchData = fetchData

        this.#holder = this.shadowRoot.querySelector('#holder')
        this.#startButton = this.shadowRoot.querySelector('#startButton')
        this.#exitButton = this.shadowRoot.querySelector('#exitButton')
        this.#chartDisplayer = this.shadowRoot.querySelector("#chartDisplayer")
        this.#dataButton = this.shadowRoot.querySelector('#dataButton')
        this.#dataSelect = this.shadowRoot.querySelector('#dataSelect')

        this.#startButton.addEventListener('click', () => {
          this.#holder.classList.remove('hidden')
        })

        this.#exitButton.addEventListener('click', () => {
          this.#holder.classList.add('hidden')
        })

        this.#dataButton.addEventListener('click', () => {
          this.#dataSelect.classList.toggle('hidden')
        })

        this.#holder.addEventListener('userselecteddata', async () => {
          await this.setChartData()
        })
    }

    getDataFromChart() {
      const chartData = this.#chartDisplayer.getChartData()
      let chartDataContainer = []
      if(chartData.includes('&')) {
        chartDataContainer = chartData.split('&')
      } else {
        chartDataContainer.push(chartData)
      }
      return chartDataContainer
    }

    /**
     * Sets the charts data based on fetched data.
     */
    async setChartData() {
      const chartData = this.getDataFromChart()
      let label, dataType, data, secondData
      const chartDataSet = { firstlabel : "", firstdata : "", secondlabel : "", seconddata : ""}
      for (let index = 0; index < chartData.length; index++) {
        if(chartData[index].includes("lang")) {
          dataType = "chart"
          label = ["en", "ja", "es", "fr", "zh", "Other"]
          data = await this.fetchSourceData(chartData[index])
          data = this.countData(data)
          chartDataSet.firstlabel = "Number of tweets in language "
          chartDataSet.firstdata = data
        } else if(chartData.length > 1) {
          secondData = await this.fetchTermAggregatedeData(chartData[index])
          secondData = this.sortAggregatedData(secondData, 5, "tweet_count")
          chartDataSet.secondlabel = chartData[index]
          chartDataSet.seconddata = secondData
        } else if(!chartData[index].includes("lang")) {
          dataType = "median"
          data = await this.fetchSourceData(chartData[index])
        }
      }
      if(dataType === "chart") {
        this.#chartDisplayer.setChartData(label, chartDataSet)
        this.#chartDisplayer.displayChart()
      } else {
        this.#chartDisplayer.displayMedian(this.calculateMedian(data))
      }
      
    }

    /**
     * Fetches source data.
     * @param {string} source The source data to fetch.
     * @returns Array of data.
     */
    async fetchSourceData(source) {
      const response = await window.fetch(`https://big-data-api.herokuapp.com/api/v1/resource/source/tweeteddata/${source}`)
      const data = await response.json()
      return data.sortedData
    }

    /**
     * Fetches termed aggregated data.
     * @param {string} source Which source to aggregate.
     * @returns Array of data.
     */
    async fetchTermAggregatedeData(source) {
      const response = await window.fetch(`https://big-data-api.herokuapp.com/api/v1/resource/term-aggregation/tweeteddata/lang.keyword/${source}`)
      const data = await response.json()
      return data.aggregations.language_type.buckets
    }

    /**
     * Counts the occurences of certain data.
     */
    countData(data) {
      const counts = {}
      for(const value of data) {
        counts[value] = counts[value] ? counts[value] + 1 : 1
      }
      let countsArray = Object.values(counts)
      countsArray = countsArray.sort((a, b) => b - a)
      return countsArray.slice(0, 5)
    }

    /**
     * Sorts aggregated data based on its values to fit chart.
     * @param {object} data Object with data.
     * @param {number} chartSize Determines index size of returned object.
     * @param {string} value The value to extract from object.
     */
    sortAggregatedData(data, chartSize, value) {
      const aggreGatedData = []
      let lastValuesToFitChartSize = 0
      for (let index = 0; index < (chartSize); index++) {
        aggreGatedData.push(data[index][value].value)
      }
      for (let index = 0; index < (chartSize); index++) {
        lastValuesToFitChartSize += parseInt(data[index][value].value)  
      }
      aggreGatedData.push(lastValuesToFitChartSize.toString())
      return aggreGatedData
    }

    /**
     * Calculcates a median number.
     */
    calculateMedian(data) {
      const numberArray = data.map(parseFloat)
      const sortedArray = numberArray.sort((a, b) => a - b)
      const middleNumber = Math.floor(sortedArray.length / 2)
      if (sortedArray.length % 2 === 1) {
        return sortedArray[middleNumber];
      }
      return (sortedArray[middleNumber - 1] + sortedArray[middleNumber]) / 2
    }
  }

  customElements.define('start-page', StartPage)

