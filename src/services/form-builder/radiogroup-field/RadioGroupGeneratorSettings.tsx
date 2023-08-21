import { Control, Controller } from 'react-hook-form'
import { IOption } from '../FormBuilderService'
import { FormControl, FormControlLabel, FormGroup, FormHelperText, Radio, RadioGroup, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

export const RadioGroupGeneratorSettings = ({
  name,
  label,
  required = false,
  options,
  value,
  setValue,
  control,
  errors
}: {
  name: string
  label: string
  required?: boolean
  options: IOption[]
  value: string
  setValue: Function
  control: Control
  errors: any
}) => {
  const { t } = useTranslation()
  return (
    <FormControl fullWidth>
      <Typography sx={{ mb: 2 }}>{label}</Typography>
      <FormGroup>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          rules={{
            required: {
              value: required,
              message: LocalizationService.translate('msg_field_required', { field: label })
            }
          }}
          render={({ field: { ref, ...field } }) => (
            <RadioGroup
              {...field}
              aria-labelledby='demo-radio-buttons-group-label'
              onChange={e => field.onChange(e.target.value)}
              name='radio-buttons-group'
              key={`${name}-${value}`}
              value={value}
              ref={ref}
            >
              {options.map((option: any) => (
                <FormControlLabel key={option.name} value={option.name} control={<Radio />} label={t(option.label)} />
              ))}
            </RadioGroup>
          )}
        />
        {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
      </FormGroup>
    </FormControl>
  )
}
