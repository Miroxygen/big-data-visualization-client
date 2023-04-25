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
<chart-displayer id="chartDisplayer"></chart-displayer>
</div>
`
customElements.define('start-page',
  /**
   * Custom HTML element.
   */
  class extends HTMLElement {
    #holder
    #startButton
    #exitButton
    #chartDisplayer
    #dataButton
    #dataSelect
    /**
     * Constructor for class.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#holder = this.shadowRoot.querySelector('#holder')
      this.#startButton = this.shadowRoot.querySelector('#startButton')
      this.#exitButton = this.shadowRoot.querySelector('#exitButton')
      this.#chartDisplayer = this.shadowRoot.querySelector('#chartDisplayer')
      this.#dataButton = this.shadowRoot.querySelector('#dataButton')
      this.#dataSelect = this.shadowRoot.querySelector('#dataSelect')
      this.dataHandler = new DataHandlerService()
      this.fecthData = new FetchDataService()

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

    /**
     * Gets the users data choice.
     *
     * @returns {Array} Array of data.
     */
    getData () {
      const chartData = this.#dataSelect.getData()
      let chartDataContainer = []
      if (chartData.includes('&')) {
        chartDataContainer = chartData.split('&')
      } else {
        chartDataContainer.push(chartData)
      }
      return chartDataContainer
    }

    /**
     * Sets the charts data based on fetched data.
     */
    async setChartData () {
      const chartData = this.getData()
      let label, dataType, data, secondData
      const chartDataSet = { firstlabel: '', firstdata: '', secondlabel: '', seconddata: '' }
      for (let index = 0; index < chartData.length; index++) {
        if (chartData[index].includes('lang')) {
          dataType = 'chart'
          label = ['en', 'ja', 'es', 'fr', 'zh', 'Other']
          data = await this.fecthData.getElasticSourceData(chartData[index], 'https://big-data-api.herokuapp.com')
          data = this.dataHandler.countData(data)
          chartDataSet.firstlabel = 'Number of tweets in language '
          chartDataSet.firstdata = data
        } else if (chartData.length > 1) {
          secondData = await this.fetchData.getElasticTermAggregatedeData(chartData[index], 'https://big-data-api.herokuapp.com')
          secondData = this.dataHandler.sortAggregatedData(secondData, 5, 'tweet_count')
          chartDataSet.secondlabel = chartData[index]
          chartDataSet.seconddata = secondData
        } else if (!chartData[index].includes('lang')) {
          dataType = 'median'
          data = await this.fetchData.fetchSourceData(chartData[index], 'https://big-data-api.herokuapp.com')
        }
      }
      if (chartData.length > 1) {
        this.#chartDisplayer.setCorrectDescription(`${chartData[0]}&${chartData[1]}`)
      } else {
        this.#chartDisplayer.setCorrectDescription(`${chartData[0]}`)
      }
      if (dataType === 'chart') {
        this.#chartDisplayer.setChartData(label, chartDataSet)
        this.#chartDisplayer.displayChart()
      } else {
        this.#chartDisplayer.displayMedian(this.dataHandler.calculateMedian(data))
      }
    }
  }
)
