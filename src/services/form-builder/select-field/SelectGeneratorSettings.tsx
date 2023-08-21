import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { IOption } from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export const SelectGeneratorSettings = function ({
  name,
  label,
  required = false,
  value,
  options,
  readOnly = false,
  control,
  errors
}: {
  name: string
  label: string
  required?: boolean
  value: string
  options: any
  readOnly?: boolean
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
          required: { value: required, message: LocalizationService.translate('msg_field_required', { field: label }) }
        }}
        render={({ field: { ref, ...field } }) => (
          <Box>
            <InputLabel id='demo-simple-select-autowidth-label'>{label}</InputLabel>
            <Select
              {...field}
              readOnly={readOnly}
              inputRef={ref}
              labelId='demo-simple-select-autowidth-label'
              id='demo-simple-select-autowidth'
              fullWidth
              label={label}
              value={value}
              onChange={e => field.onChange(e.target.value)}
            >
              <MenuItem value='' disabled>
                <em>{LocalizationService.translate('cm_select_one')}</em>
              </MenuItem>
              {options.map((option: IOption) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
