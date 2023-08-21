import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import LocalizationService from 'src/services/common/LocalizationService'

export const TextGeneratorSettings = function ({
  name,
  label,
  value,
  required = false,
  maxLength = undefined,
  subType = 'text',
  control,
  errors
}: {
  name: string
  label: string
  value?: string
  required?: boolean
  maxLength?: number
  subType?: string
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
          maxLength: maxLength
            ? {
                value: maxLength,
                message: LocalizationService.translate('msg_field_max_length', { field: label, value: maxLength })
              }
            : undefined,
          pattern:
            subType == 'email'
              ? {
                  value: /^[^s@]+@[^s@]+.[^s@]+$/,
                  message: LocalizationService.translate('msg_field_wrong_format', { field: label })
                }
              : subType == 'phone'
              ? {
                  value: /^[0-9]{9,}$/,
                  message: LocalizationService.translate('msg_field_wrong_format', { field: label })
                }
              : undefined
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            inputRef={ref}
            label={label}
            defaultValue={value}
            value={value}
            error={Boolean(errors[name])}
            type={subType}
          />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
