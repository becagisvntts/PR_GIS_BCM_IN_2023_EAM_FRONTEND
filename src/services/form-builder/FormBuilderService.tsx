import { Control } from 'react-hook-form'
import CheckBoxFieldBuilder from './checkbox-field/CheckBoxFieldBuilder'
import MapFieldBuilder from './map-field/MapFieldBuilder'
import NumberFieldBuilder from './number-field/NumberFieldBuilder'
import RadioGroupFieldBuilder from './radiogroup-field/RadioGroupFieldBuilder'
import TextFieldBuilder from './text-field/TextFieldBuilder'
import CheckboxGroupFieldBuilder from './checkboxgroup-field/CheckboxGroupFieldBuilder'
import SelectFieldBuilder from './select-field/SelectFieldBuilder'
import DatePickerFieldBuilder from './datepicker-field/DatePickerFieldBuilder'
import MapFieldConfig from './map-field/MapFieldConfig'
import MapFieldSetting from './map-field/MapFieldSetting'
import ImageFieldBuilder from './image-field/ImageFieldBuilder'
import AudioFieldBuilder from './audio-field/AudioFieldBuilder'
import VideoFieldBuilder from './video-field/VideoFieldBuilder'
import LocalizationService from '../LocalizationService'

export interface IOption {
  label: any
  name: string
}

export const defaultIOptions: IOption[] = [
  {
    label: 'Option 1',
    name: 'option_1'
  },
  {
    label: 'Option 2',
    name: 'option_2'
  }
]
export default class FormBuilderService {
  static typeTextName = 'text'
  static typeNumberName = 'number'
  static typeDatePickerName = 'date-picker'
  static typeListName = 'list'
  static typeCheckboxName = 'checkbox'
  static typeCheckboxGroupName = 'checkboxGroup'
  static typeRadioGroupName = 'radioGroup'
  static typeSelectName = 'select'
  static typeImageName = 'file-image'
  static typeAudioName = 'file-audio'
  static typeVideoName = 'file-video'
  static typeMapName = 'map'

  static listFieldBuilder = [
    new TextFieldBuilder(),
    new NumberFieldBuilder(),
    new CheckBoxFieldBuilder(),
    new CheckboxGroupFieldBuilder(),
    new RadioGroupFieldBuilder(),
    new SelectFieldBuilder(),
    new DatePickerFieldBuilder(),
    new ImageFieldBuilder(),
    new VideoFieldBuilder(),
    new AudioFieldBuilder()
  ]
  static fullListFieldBuilder = [new MapFieldBuilder(), ...this.listFieldBuilder]

  static getCopyOfFieldBuilderByFieldSetting = (fieldSetting: any) => {
    for (let i = 0; i < FormBuilderService.fullListFieldBuilder.length; i++) {
      const fieldBuilder = FormBuilderService.fullListFieldBuilder[i]
      if (fieldBuilder.fieldSetting.type === fieldSetting.type) {
        return fieldBuilder.copyWith(fieldSetting)
      }
    }

    return new TextFieldBuilder().copyWith(fieldSetting)
  }

  static getFormattedValueOfField = (fieldSetting: any, recordData: any) => {
    const fieldBuilder = FormBuilderService.getCopyOfFieldBuilderByFieldSetting(fieldSetting)
    fieldBuilder.syncRecordData(recordData)

    return fieldBuilder.getFormattedData()
  }

  static getUIOnListOfField = (fieldSetting: any, recordData: any) => {
    const fieldBuilder = FormBuilderService.getCopyOfFieldBuilderByFieldSetting(fieldSetting)
    fieldBuilder.syncRecordData(recordData)

    return fieldBuilder.UIOnList()
  }

  static getUIOnFormOfField = (fieldSetting: any, recordData: any, control: Control, setValue: any, errors: any) => {
    const fieldBuilder = FormBuilderService.getCopyOfFieldBuilderByFieldSetting(fieldSetting)
    fieldBuilder.syncRecordData(recordData)

    return fieldBuilder.UIOnForm({ control, setValue, errors })
  }

  static mapBuilderType = 'map'

  static isMapBuilderType = (name: string) => {
    return name.startsWith(FormBuilderService.mapBuilderType)
  }

  static getMapType = (fieldsSetting: any) => {
    for (let i = 0; i < fieldsSetting.length; i++) {
      if (FormBuilderService.isMapBuilderType(fieldsSetting[i].name)) {
        return fieldsSetting[i].mapType
      }
    }
    return MapFieldConfig.MapTypePoint
  }
}
