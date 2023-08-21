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

export default function RadioGroupFieldOption({
  options,
  value,
  setValue,
  control,
  errors
}: {
  options: IOption[]
  value: string
  setValue: Function
  control: Control
  errors: any
}) {
  const [updatedOptions, setUpdatedOptions] = useState<IOption[]>(options)
  const [updatedValue, setUpdatedValue] = useState<string>(value)
  const [openDialogEditOption, setOpenDialogEditOption] = useState<boolean>(false)
  const [modifyOption, setModifyOption] = useState<IOption>({ label: '', name: '' })
  const [modifyIndex, setModifyIndex] = useState<number>(-1)

  const onDeleteOption = (index: number) => {
    const tmpOptions = [...updatedOptions]
    tmpOptions.splice(index, 1)
    updateOptions(tmpOptions)
  }
  const onOpenDialogEdit = (index: number) => {
    setModifyIndex(index)
    if (index == -1) {
      const newOption: IOption = { label: '', name: `option-${currentMillisecond()}` }
      setModifyOption(newOption)
    } else {
      setModifyOption(updatedOptions[index])
    }
    setOpenDialogEditOption(true)
  }
  const saveModifyOption = (val: IOption) => {
    const tmpOptions = [...updatedOptions]
    if (modifyIndex != -1) {
      tmpOptions[modifyIndex] = val
    } else {
      tmpOptions.push(val)
    }

    updateOptions(tmpOptions)
  }

  const updateOptions = (val: IOption[]) => {
    setUpdatedOptions(val)
    setValue('options', val)
  }

  const updateValue = (val: string) => {
    setUpdatedValue(val)
    setValue('value', val)
  }

  return (
    <>
      <ModifyOptionDialog
        key={modifyOption.name}
        openDialog={openDialogEditOption}
        onClose={() => {
          setOpenDialogEditOption(false)
        }}
        isCreate={modifyIndex == -1}
        option={modifyOption}
        onSaveOption={saveModifyOption}
      />
      <FormControl fullWidth>
        <FormLabel sx={{ display: 'flex', justifyContent: 'space-between' }} id='demo-radio-buttons-group-label'>
          <Typography>{LocalizationService.translate('form_options')}</Typography>
          <Typography
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              padding: '0 15px'
            }}
            onClick={() => {
              onOpenDialogEdit(-1)
            }}
          >
            {LocalizationService.translate('cm_add')}
          </Typography>
        </FormLabel>
        <Controller
          name='value'
          control={control}
          defaultValue={updatedValue}
          render={({ field: { ref, ...field } }) => (
            <RadioGroup
              {...field}
              aria-labelledby='demo-radio-buttons-group-label'
              onChange={e => field.onChange(e.target.value)}
              name='radio-buttons-group'
              ref={ref}
            >
              {updatedOptions.map((option: IOption, index: number) => (
                <FormControlLabel
                  key={option.name}
                  value={option.name}
                  control={<Radio />}
                  label={
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      {option.label}
                      <Box sx={{ position: 'absolute', right: 10 }}>
                        <IconButton color='warning' size='small' onClick={() => onOpenDialogEdit(index)}>
                          <Icon icon='bxs:edit' />
                        </IconButton>
                        {updatedOptions.length > 2 ? (
                          <IconButton color='error' size='small' onClick={() => onDeleteOption(index)}>
                            <Icon icon='material-symbols:delete' />
                          </IconButton>
                        ) : null}
                      </Box>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControl>
        <Controller
          name='options'
          control={control}
          defaultValue={updatedOptions}
          render={({ field: { ref, ...field } }) => (
            <TextField {...field} inputRef={ref} type='hidden' sx={{ display: 'none' }} />
          )}
        />
      </FormControl>
    </>
  )
}
