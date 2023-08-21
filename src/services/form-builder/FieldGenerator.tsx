import {
  FormControl,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Box,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormGroup,
  Typography
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Control, Controller } from 'react-hook-form'
import { IOption } from './FormBuilderService'
import { useTranslation } from 'react-i18next'
import LocalizationService from '../LocalizationService'

const TextFieldGenerator = function ({
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
            error={Boolean(errors[name])}
            // type={subType}
          />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

const NumberFieldGenerator = function ({
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
          <TextField {...field} inputRef={ref} label={label} error={Boolean(errors[name])} type='number' />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

const CheckboxFieldGenerator = function ({
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
          <FormControlLabel {...field} inputRef={ref} control={<Checkbox defaultChecked={value} />} label={label} />
        )}
      />
      {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}

const SelectFieldGenerator = function ({
  name,
  label,
  required = false,
  value,
  options,
  readOnly = false,
  control,
  errors,
  allowMultiple = false,
  onValueChanged
}: {
  name: string
  label: string
  required?: boolean
  value: any
  options: any
  readOnly?: boolean
  control: Control
  errors: any
  allowMultiple?: boolean
  onValueChanged?: (value: any) => void
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
              multiple={allowMultiple}
              label={label}
              onChange={e => {
                field.onChange(e.target.value)
                if (onValueChanged) {
                  onValueChanged(e.target.value)
                }
              }}
            >
              <MenuItem value=''>None</MenuItem>
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

// const DateTimeFieldGenerator = ({
//   name,
//   label,
//   value,
//   required = false,
//   minDate,
//   maxDate,
//   onValueChange,
//   control,
//   errors
// }: {
//   name: string
//   label: string
//   value?: any
//   minDate?: any
//   maxDate?: any
//   required?: boolean
//   onValueChange?: (val: any) => void
//   control: Control
//   errors: any
// }) => {
//   return (
//     <FormControl fullWidth>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={value}
//         rules={{
//           required: { value: required, message: `${label} không được để trống` }
//         }}
//         render={({ field: { ref, onChange, ...field } }) => (
//           <DatePicker
//             {...field}
//             inputRef={ref}
//             format='DD/MM/YYYY'
//             label={label}
//             minDate={minDate}
//             maxDate={maxDate}
//             onChange={val => {
//               onChange(val)
//               if (onValueChange) onValueChange(val)
//             }}
//           />
//         )}
//       />
//       {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
//     </FormControl>
//   )
// }

const RadioGroupFieldGenerator = ({
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
              ref={ref}
            >
              {options.map((option: any) => (
                <FormControlLabel key={option.name} value={option.name} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          )}
        />
        {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
      </FormGroup>
    </FormControl>
  )
}

const CheckboxGroupFieldGenerator = function ({
  name,
  label,
  required = false,
  options,
  value = [],
  setValue,
  control,
  errors
}: {
  name: string
  label: string
  required?: boolean
  options: IOption[]
  value: string[]
  setValue: any
  control: Control
  errors: any
}) {
  const onOptionChangeValue = (optionName: string, optionValue: boolean) => {
    const tmpValue = [...value]
    const indexOfValue = tmpValue.indexOf(optionName)
    if (indexOfValue == -1 && optionValue) {
      tmpValue.push(optionName)
    } else {
      tmpValue.splice(indexOfValue, 1)
    }

    setValue(name, tmpValue)
  }

  return (
    <FormControl fullWidth>
      <Typography sx={{ mb: 2 }}>{label}:</Typography>
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
          render={({ field }) => (
            <>
              {options?.map((option: IOption) => (
                <FormControlLabel
                  key={option.name}
                  control={
                    <Checkbox
                      key={`${option.name}=${value.includes(option.name)}`}
                      defaultChecked={value.includes(option.name)}
                      onChange={e => {
                        onOptionChangeValue(e.target.name, e.target.checked)
                      }}
                      name={option.name}
                    />
                  }
                  label={option.label}
                />
              ))}
            </>
          )}
        />
        {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
      </FormGroup>
    </FormControl>
  )
}

const DatePickerGenerator = function ({
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
  if (value) {
    value = dayjs(value)
  } else if (useCurrentDate) {
    value = dayjs()
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

export {
  NumberFieldGenerator,
  TextFieldGenerator,
  CheckboxFieldGenerator,
  SelectFieldGenerator,
  // DateTimeFieldGenerator,
  RadioGroupFieldGenerator,
  CheckboxGroupFieldGenerator,
  DatePickerGenerator
}
