/**
 * Module for bootstrapping.
 */

import { IoCContainer } from '../js/utils/IocContainer.js'
import { DataHandlerService } from '../js/services/dataHandlerService.js'
import { FetchDataService } from '../js/services/fetchDataService.js'

const iocContainer = new IoCContainer()

iocContainer.register('DataHandlerService', DataHandlerService, {
  singleton: true
})

iocContainer.register('FetchDataService', FetchDataService, {
  singleton: true
})

export const container = Object.freeze(iocContainer)
