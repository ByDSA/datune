import { DefaultSettings } from './DefaultSettings'
import { Settings } from './Settings'

export default () => {
    Object.assign(Settings, DefaultSettings)
}