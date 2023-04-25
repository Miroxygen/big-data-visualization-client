/**
 * Module for bootstrapping.
 */

import { IoCContainer } from "../utils/IocContainer.js"
import { DataHandlerService } from "../services/dataHandlerService.js"
import { FetchDataService } from "../services/fetchDataService.js"


const iocContainer = new IoCContainer()

iocContainer.register('DataHandlerService', DataHandlerService, {
  singleton : true,
})

iocContainer.register('FetchDataService', FetchDataService, {
  singleton : true
})


export const container = Object.freeze(iocContainer)
