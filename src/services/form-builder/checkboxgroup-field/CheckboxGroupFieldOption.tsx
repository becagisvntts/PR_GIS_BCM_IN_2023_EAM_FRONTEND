import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Typography,
  TextField,
  FormGroup,
  Checkbox
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { IOption } from '../FormBuilderService'
import { currentMillisecond } from 'src/services/common/convertDate'
import ModifyOptionDialog from './ModifyOptionDialog'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

export default function CheckboxGroupFieldOption({
  options,
  value,
  setValue,
  control,
  errors
}: {
  options: IOption[]
  value: string[]
  setValue: Function
  control: Control
  errors: any
}) {
  const [updatedOptions, setUpdatedOptions] = useState<IOption[]>(options)
  const [updatedValue, setUpdatedValue] = useState<string[]>(value)
  const [openDialogEditOption, setOpenDialogEditOption] = useState<boolean>(false)
  const [modifyOption, setModifyOption] = useState<IOption>({ label: '', name: '' })
  const [modifyIndex, setModifyIndex] = useState<number>(-1)

  const onDeleteOption = (index: number) => {
    const tmpOptions = [...updatedOptions]
    onOptionChangeValue(tmpOptions[index].name, false)

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
  const onOptionChangeValue = (optionName: string, optionValue: boolean) => {
    const tmpValue = [...updatedValue]
    const indexOfValue = tmpValue.indexOf(optionName)
    if (indexOfValue == -1 && optionValue) {
      tmpValue.push(optionName)
    } else {
      tmpValue.splice(indexOfValue, 1)
    }

    updateValue(tmpValue)
  }

  const updateOptions = (val: IOption[]) => {
    setUpdatedOptions(val)
    setValue('options', val)
  }

  const updateValue = (val: string[]) => {
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
        <FormLabel sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <FormGroup>
          {updatedOptions.map((option, index) => (
            <FormControlLabel
              key={option.name}
              control={
                <Checkbox
                  key={`${option.name}=${updatedValue.includes(option.name)}`}
                  defaultChecked={updatedValue.includes(option.name)}
                  onChange={e => {
                    onOptionChangeValue(e.target.name, e.target.checked)
                  }}
                  name={option.name}
                />
              }
              label={
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  {option.label}
                  <Box sx={{ position: 'absolute', right: 10 }}>
                    <IconButton size='small' onClick={() => onOpenDialogEdit(index)}>
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
          <Controller
            name='options'
            control={control}
            defaultValue={updatedOptions}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} inputRef={ref} type='hidden' sx={{ display: 'none' }} />
            )}
          />

          <Controller
            name='value'
            control={control}
            defaultValue={updatedValue}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} inputRef={ref} type='hidden' sx={{ display: 'none' }} />
            )}
          />
        </FormGroup>
      </FormControl>
    </>
  )
}
