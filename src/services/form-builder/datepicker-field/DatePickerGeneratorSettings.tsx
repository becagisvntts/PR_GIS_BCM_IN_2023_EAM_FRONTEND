import { FormControl, FormHelperText } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Control, Controller } from 'react-hook-form'
import LocalizationService from 'src/services/common/LocalizationService'

export const DatePickerGeneratorSettings = function ({
  name,
  label,
  required = false,
  value,
  useCurrentDate = false,
  minDate,
  maxDate,
  onValueChange,
  setValue,
  control,
  errors
}: {
  name: string
  label: string
  required?: boolean
  value?: any
  useCurrentDate?: boolean
  minDate?: any
  maxDate?: any
  onValueChange?: (val: any) => void
  setValue?: any
  control: Control
  errors: any
}) {
  if (useCurrentDate) {
    value = dayjs()
  } else if (value) {
    value = dayjs(value)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        rules={{
          required: { value: required, message: LocalizationService.translate('msg_field_required', { field: label }) }
        }}
        render={({ field: { ref, onChange, ...field } }) => (
          <DatePicker
            {...field}
            inputRef={ref}
            format='DD/MM/YYYY'
            minDate={minDate}
            maxDate={maxDate}
            value={value}
            onChange={val => {
              onChange(val)
              if (onValueChange) onValueChange(val)
            }}
            label={label}
          />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
