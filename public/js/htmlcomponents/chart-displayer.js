/**
 * The navbar of the application.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')

template.innerHTML = `
<style>
.hidden {
  display: none;
}
.hidden {
  display:none;
}
#canvasContainer {
  height:400px;
  margin-left:150px;
}
#chartChoice {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 56px;
  bottom: 188px;
}
.choice {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  cursor: pointer;
  margin-top:20px;
}
#median {
  position:absolute;
  font-size:50px;
  margin-left:250px;
}
#description {
  padding:10px;
  margin-left:20px;
}
</style>
<div id="description">
  <p id="descriptionText"></p>
</div>
<div id="chartContainer" class="hidden">
  <div id="chartChoice">
  <button class="choice" id="bar">Bar</button>
  <button class="choice" id="pie">Pie</button>
  <button class="choice" id="doughnut">Donut</button>
  </div>
  <div id="canvasContainer">
  <canvas id="chart"></canvas>
  </div>
</div>
<p id="median"></p>
`

customElements.define('chart-displayer',
  /**
   * Custom HTML element.
   */
  class extends HTMLElement {
    #chart
    #chartChoice
    #dataSelect
    #median
    #chartContainer
    #descriptionText
    /**
     * Constructor for custom element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#chart = this.shadowRoot.querySelector('#chart')
      this.#chartChoice = this.shadowRoot.querySelector('#chartChoice')
      this.#median = this.shadowRoot.querySelector('#median')
      this.#chartContainer = this.shadowRoot.querySelector('#chartContainer')
      this.#descriptionText = this.shadowRoot.querySelector('#descriptionText')
      this.type = 'bar'
      this.label = ''
      this.chart = ''
      this.chartDataSet = []

      this.#chartChoice.addEventListener('click', (event) => {
        this.switchChartType(event)
      })
    }

    /**
     * Displays a chart with the users selected data.
     */
    displaySelectedData () {
      this.userSelectedData()
      this.setCorrectDescription()
    }

    /**
     * Switches chart type based on user interaction.
     *
     * @param {object} event The event in the browser.
     */
    switchChartType (event) {
      switch (event.target.id) {
        case 'bar':
          this.type = 'bar'
          break
        case 'pie':
          this.type = 'pie'
          break
        case 'doughnut':
          this.type = 'doughnut'
          break
        default:
          this.type = 'bar'
          break
      }
      if (event.target.id !== 'chartChoice') {
        this.destroyChart()
        this.displayChart()
      }
    }

    /**
     * Sets the chart data to be usable across the element.
     *
     * @param {string} label The label for the dataset.
     * @param {object} datasets Object with data.
     */
    setChartData (label, datasets) {
      this.label = label
      this.chartDataSet = datasets
    }

    /**
     * Displays a chart.
     */
    displayChart () {
      this.#chartContainer.classList.remove('hidden')
      this.#median.classList.add('hidden')
      if (this.chart !== '') {
        this.destroyChart()
      }
      this.chart = new Chart(
        this.#chart,
        {
          type: this.type,
          data: {
            labels: this.label,
            datasets: [
              {
                label: this.chartDataSet.firstlabel,
                data: this.chartDataSet.firstdata
              },
              {
                label: this.chartDataSet.secondlabel,
                data: this.chartDataSet.seconddata
              }
            ],
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: Math.max(...this.chartDataSet.firstdata, ...this.chartDataSet.seconddata)
                  }
                }]
              },
              responsive: true,
              maintainAspectRatio: false,
              width: 800,
              height: 400
            }
          }
        }
      )
    }

    /**
     * Destroys the chart so a new one can be created for the same element.
     */
    destroyChart () {
      this.chart.destroy()
    }

    /**
     * Displays a median number.
     *
     * @param {string} median Median number.
     */
    displayMedian (median) {
      this.#median.classList.remove('hidden')
      this.#chartContainer.classList.add('hidden')
      this.#median.textContent = `Median Number : ${median}`
    }

    /**
     * Sets a description explaining what the chart is.
     *
     * @param {string} selectValue Value from the select form.
     */
    setCorrectDescription (selectValue) {
      switch (selectValue) {
        case 'lang':
          this.#descriptionText.textContent = 'Displays how many tweets were made in each language. English, Japanese, Spanish, French, Chinese and Others.'
          break
        case 'userTweetCount':
          this.#descriptionText.textContent = 'Displays a median number for the amount of tweets made by each user.'
          break
        case 'lang&userTweetCount':
          this.#descriptionText.textContent = 'Displays how many tweets were made in each language. English, Japanese, Spanish, French, Chinese and Others, and comparatively how many tweets altogether each user has made that has posted in that language.'
          break
        case 'lang&likeCount':
          this.#descriptionText.textContent = 'Displays how many tweets were made in each language. English, Japanese, Spanish, French, Chinese and Others, and comparatively how many likes the tweets in each language got.'
          break
        case 'likeCount':
          this.#descriptionText.textContent = 'Displays a median number for the amount of likes for each tweet.'
          break
        case 'lang&userFollowersCount':
          this.#descriptionText.textContent = 'Displays how many tweets were made in each language. English, Japanese, Spanish, French, Chinese and Others, and comparatively how many followers each user that posts in that language has.'
          break
        case 'userFollowersCount':
          this.#descriptionText.textContent = 'Displays a median number for the amount of followers.'
          break
        default:
          break
      }
    }
  }
)
