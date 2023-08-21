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
import FormBuilderService, { IOption } from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'
import { SelectFieldGenerator } from '../FieldGenerator'
import { useDispatch } from 'react-redux'
import { fetchProjects } from 'src/store/projectSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import ProjectService from 'src/services/ProjectService'
import SchemaService from 'src/services/SchemaService'
import { SurveySourceConfig } from './SelectFieldSetting'
export default function SelectFieldOptionsSurvey({
  optionsSourceConfig,
  value,
  setValue,
  control,
  errors
}: {
  optionsSourceConfig: SurveySourceConfig
  value: string
  setValue: Function
  control: Control
  errors: any
}) {
  const [updatedOptionsSourceConfig, setUpdatedOptionsSourceConfig] = useState<SurveySourceConfig>(optionsSourceConfig)
  const [projectSlug, setProjectSlug] = useState(optionsSourceConfig.projectSlug)
  const [projectList, setProjectList] = useState<IOption[]>([])
  const [projectFieldList, setProjectFieldList] = useState<IOption[]>([])
  const [selectedLabels, setSelectedLabels] = useState<any[]>([])

  const currentProjectSlug = useSelector((state: RootState) => state.project.activeSlug)

  useEffect(() => {
    initProjectList()
  }, [])

  useEffect(() => {
    initProjectFieldList()
  }, [projectSlug])

  useEffect(() => {
    updateSelectedLabels()
  }, [projectFieldList, updatedOptionsSourceConfig])

  useEffect(() => {
    setValue('optionsSourceConfig', updatedOptionsSourceConfig)
  }, [updatedOptionsSourceConfig])

  const initProjectList = async () => {
    const projects = await ProjectService.fetchProjects()
    let formatted: IOption[] = []
    projects.map((el: any) => {
      formatted.push({
        name: el.slug,
        label: el.title
      })
    })

    setProjectList(formatted)
  }

  const initProjectFieldList = async () => {
    if (projectSlug) {
      const schema = await SchemaService.fetchSchema(projectSlug)
      if (schema) {
        let formatted: IOption[] = [
          {
            name: 'id',
            label: 'ID'
          }
        ]
        schema.schema_data.map((el: any) => {
          if ([FormBuilderService.typeNumberName, FormBuilderService.typeTextName].includes(el.type)) {
            formatted.push({
              name: el.name,
              label: el.label
            })
          }
        })

        setProjectFieldList(formatted)
      }
    }
  }

  const updateSelectedLabels = () => {
    const formatted: any[] = []
    updatedOptionsSourceConfig.label.map(field => {
      projectFieldList.forEach(el => {
        if (el.name == field) {
          formatted.push(el.label)
        }
      })
    })
    setSelectedLabels(formatted)
  }

  return (
    <>
      <FormControl fullWidth sx={{ mt: 4, mb: 2 }}>
        <FormLabel sx={{ mb: 4 }}>
          <Typography>{LocalizationService.translate('form_options_survey')}</Typography>
        </FormLabel>
        <FormGroup>
          <SelectFieldGenerator
            name='projectSlug'
            label={LocalizationService.translate('form_options_survey_list')}
            value={projectSlug}
            options={projectList}
            control={control}
            errors={errors}
            onValueChanged={value => {
              setProjectSlug(value)
              setUpdatedOptionsSourceConfig({ ...updatedOptionsSourceConfig, projectSlug: value })
            }}
          />
        </FormGroup>
      </FormControl>
      {projectSlug && (
        <>
          <FormControl fullWidth sx={{ my: 2 }}>
            <FormLabel sx={{ my: 2 }}>
              <Typography>
                {LocalizationService.translate('form_options_config_label')}:{' '}
                <b>{selectedLabels ? `{${selectedLabels.join('}_{')}}` : ''}</b>
              </Typography>
            </FormLabel>
            <FormGroup>
              <SelectFieldGenerator
                required={true}
                name='optionsSourceConfigLabel'
                label={LocalizationService.translate('form_options_survey_value_list')}
                value={updatedOptionsSourceConfig.label}
                options={projectFieldList}
                control={control}
                errors={errors}
                allowMultiple={true}
                onValueChanged={value => {
                  setUpdatedOptionsSourceConfig({ ...updatedOptionsSourceConfig, label: value })
                }}
              />
            </FormGroup>
          </FormControl>
        </>
      )}

      <Controller
        name='options'
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field } }) => (
          <TextField {...field} inputRef={ref} type='hidden' sx={{ display: 'none' }} />
        )}
      />

      <Controller
        name='optionsSourceConfig'
        control={control}
        defaultValue={updatedOptionsSourceConfig}
        render={({ field: { ref, ...field } }) => (
          <TextField {...field} inputRef={ref} type='hidden' sx={{ display: 'none' }} />
        )}
      />
    </>
  )
}
