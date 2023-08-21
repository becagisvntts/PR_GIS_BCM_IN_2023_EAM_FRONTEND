import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { IOption } from '../FormBuilderService'
import { currentMillisecond } from 'src/services/common/convertDate'
import ModifyOptionDialog from '../checkboxgroup-field/ModifyOptionDialog'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'
import { SelectFieldGenerator } from '../FieldGenerator'
import SelectFieldOptionManual from './SelectFieldOptionsManual'
import SelectFieldOptionsSurvey from './SelectFieldOptionsSurvey'
import { SurveySourceConfig } from './SelectFieldSetting'

export default function SelectFieldOption({
  optionsSource,
  optionsSourceConfig,
  options,
  value,
  setValue,
  control,
  errors
}: {
  optionsSource: string
  optionsSourceConfig: SurveySourceConfig
  options: IOption[]
  value: string
  setValue: Function
  control: Control
  errors: any
}) {
  const [updatedOptionsSource, setUpdatedOptionsSource] = useState(optionsSource)

  const optionsSourcePool: IOption[] = [
    { label: LocalizationService.translate('form_options_source_manual'), name: 'manual' },
    { label: LocalizationService.translate('form_options_source_survey'), name: 'survey' }
  ]

  return (
    <>
      <FormControl fullWidth>
        <SelectFieldGenerator
          name='optionsSource'
          label={LocalizationService.translate('form_options_source_selection')}
          value={updatedOptionsSource}
          options={optionsSourcePool}
          control={control}
          errors={errors}
          onValueChanged={value => {
            setUpdatedOptionsSource(value)
          }}
        />
      </FormControl>

      {updatedOptionsSource == 'manual' && (
        <SelectFieldOptionManual
          options={options}
          value={value}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      )}

      {updatedOptionsSource == 'survey' && (
        <SelectFieldOptionsSurvey
          optionsSourceConfig={optionsSourceConfig}
          value={value}
          setValue={setValue}
          control={control}
          errors={errors}
        />
      )}
    </>
  )
}
