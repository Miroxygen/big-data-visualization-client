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
form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
label {
  margin-bottom: 15px;
}

 select, input {
  display: block;
  margin: 10px 0;
  margin-bottom: 10px;
  margin-left: 5px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #333;
  color: #fff;
}
</style>
<form>
  <label for="dataSelectOne">Select data to display</label>
  <select id="dataSelect" name="dataSelect">
    <option value="lang">Language of tweet</option>
    <option value="userTweetCount">Median tweet number</option>
    <option value="lang&userTweetCount">Total number of tweet per language</option>
    <option value="lang&likeCount">Like count per language</option>
    <option value="likeCount">Median like count</option>
    <option value="lang&userFollowersCount">User followers count per language</option>
    <option value="userFollowersCount">Median follower count</option>
  </select>
  <input type="submit" value="Submit" id="submit">
</form>
`

customElements.define('data-selecter', 
  class extends HTMLElement {
    #dataSelect
    #submit
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#dataSelect = this.shadowRoot.querySelector('#dataSelect')
        this.#submit = this.shadowRoot.querySelector('#submit')

        this.#submit.addEventListener('click', (event) => {
          event.preventDefault()
          this.dispatchEvent(new window.CustomEvent('userselecteddata', {
            bubbles: true
          }))
        })
    }

    /**
     * Gets the data from the form.
     */
    getData() {
      return this.#dataSelect.value
    }
  }
)

