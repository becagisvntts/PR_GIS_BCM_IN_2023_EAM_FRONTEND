import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

export const CheckboxGeneratorSettings = function ({
  name,
  label,
  value,
  control,
  errors
}: {
  name: string
  label: string
  value?: boolean
  control: Control
  errors: any
}) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field: { ref, ...field } }) => (
          <FormControlLabel
            {...field}
            inputRef={ref}
            control={<Checkbox defaultChecked={value} checked={value} />}
            label={label}
          />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
