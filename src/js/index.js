import { StartPage } from "./htmlcomponents/startPage.js";
import { container } from "./bootstrap/bootstrap.js";

const resolvedDataHandlerService = container.resolve('DataHandlerService')
const resolvedFetchDataService = container.resolve('FetchDataService')

const startPage = new StartPage(resolvedDataHandlerService, resolvedFetchDataService)

const main = document.querySelector('main')
main.appendChild(startPage)