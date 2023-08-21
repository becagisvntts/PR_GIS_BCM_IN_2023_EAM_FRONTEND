import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import LocalizationService from 'src/services/common/LocalizationService'

export const NumberGeneratorSettings = function ({
  name,
  label,
  required = false,
  minValue = undefined,
  maxValue = undefined,
  value,
  control,
  errors
}: {
  name: string
  label: string
  required?: boolean
  minValue?: number
  maxValue?: number
  value?: number | string
  control: Control
  errors: any
}) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        rules={{
          required: { value: required, message: LocalizationService.translate('msg_field_required', { field: label }) },
          min: minValue
            ? {
                value: minValue,
                message: LocalizationService.translate('msg_field_min_value', { field: label, value: minValue })
              }
            : undefined,
          max: maxValue
            ? {
                value: maxValue,
                message: LocalizationService.translate('msg_field_max_value', { field: label, value: maxValue })
              }
            : undefined
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            inputRef={ref}
            label={label}
            value={value}
            error={Boolean(errors[name])}
            type='number'
          />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
