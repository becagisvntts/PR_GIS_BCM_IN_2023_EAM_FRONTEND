import { Control } from 'react-hook-form'
import { SelectFieldGenerator } from '../FieldGenerator'
import { SurveySourceConfig } from './SelectFieldSetting'
import { useEffect, useState } from 'react'
import RecordService from 'src/services/RecordService'
import { IOption } from '../FormBuilderService'
import Loading from 'src/views/components/common/Loading'

export default function SelectFieldComponent({
  optionsSource,
  optionsSourceConfig,
  name,
  label,
  required = false,
  value,
  options,
  control,
  errors
}: {
  optionsSource: string
  optionsSourceConfig: SurveySourceConfig
  name: string
  label: string
  required?: boolean
  value: any
  options: any
  readOnly?: boolean
  control: Control
  errors: any
}) {
  const [isFetchOptions, setIsFetchOptions] = useState(true)
  const [fetchedOptions, setFetchedOptions] = useState(options)

  const initOptions = async () => {
    if (optionsSource == 'survey' && fetchedOptions.length == 0) {
      const response = await RecordService.getRecordListAsSelectOptions(optionsSourceConfig)
      let tmpOptions: IOption[] = []
      response.map((el: any) => {
        let labelArr: string[] = []
        optionsSourceConfig.label.map(key => {
          labelArr.push(el[key])
        })
        tmpOptions.push({
          name: el[optionsSourceConfig.name],
          label: labelArr.join('_')
        })
      })
      setFetchedOptions(tmpOptions)
      setIsFetchOptions(false)
    }
  }

  useEffect(() => {
    if (optionsSource == 'manual') {
      setIsFetchOptions(false)
    } else {
      initOptions()
    }
  }, [])

  return isFetchOptions ? (
    <Loading height={45}></Loading>
  ) : (
    <SelectFieldGenerator
      name={name}
      label={label}
      value={value}
      options={fetchedOptions}
      required={required}
      control={control}
      errors={errors}
    />
  )
}
