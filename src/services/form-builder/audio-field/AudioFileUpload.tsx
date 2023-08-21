import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import IconifyIcon from 'src/@core/components/icon'
import { apiUrl, serverUrl } from 'src/services/common/CommonService'
import HttpService from 'src/services/common/HttpService'
import AudioFieldConfig from './AudioFieldConfig'
import LocalizationService from 'src/services/common/LocalizationService'

export default function AudioFileUpload({
  projectSlug,
  name,
  label,
  required,
  value,
  allowMultiple,
  control,
  setValue,
  errors
}: {
  projectSlug: String
  name: string
  label: string
  required: boolean
  value: any[]
  allowMultiple: boolean
  setValue: any
  control: Control
  errors: any
}) {
  const [selectedFiles, setSelectedFiles] = useState<any[]>(value ?? [])
  const [failedFiles, setFailedFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploading(true)
      let successed = [...selectedFiles]
      const failed: any[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const validated = AudioFieldConfig.validateAudio(file)
        if (validated === true) {
          const formData = new FormData()
          formData.append('file', file)
          const response = await HttpService.postFilesWithAuth({
            endpoint: `${apiUrl}assets/${projectSlug}/upload/`,
            body: formData
          })
          if (response.status == 200) {
            const res = await response.json()
            if (res.success) {
              if (!allowMultiple) {
                successed = []
              }
              successed.push({
                name: file.name,
                path: res.file_path
              })
            } else {
              failed.push(`${file.name}: ${LocalizationService.translate('form_file_upload_failed')}`)
            }
          } else {
            failed.push(`${file.name}: ${LocalizationService.translate('form_file_upload_failed')}`)
          }
        } else {
          failed.push(validated)
        }
      }

      setSelectedFiles(successed)
      setFailedFiles(failed)
      setValue(name, successed)

      setUploading(false)
    }
  }

  const deleteFile = async (path: string) => {
    HttpService.postWithAuth({
      endpoint: `${apiUrl}assets/delete/`,
      body: { paths: [path] }
    })

    const selected = [...selectedFiles]
    selected.splice(selected.indexOf(path), 1)
    setSelectedFiles(selected)
    setValue(name, selected)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Typography sx={{ mb: 2 }}>{label}:</Typography>
        {uploading ? (
          <CircularProgress />
        ) : (
          <Button
            variant='outlined'
            component='label'
            size={'small'}
            endIcon={<IconifyIcon icon='system-uicons:audio-wave' />}
          >
            {LocalizationService.translate('form_pick_audio')}
            <input
              type='file'
              hidden
              multiple={allowMultiple}
              accept={AudioFieldConfig.audioAllowExtensions.join(', ')}
              onChange={handleFileChange}
            />
          </Button>
        )}
      </Box>
      {failedFiles.length > 0 && (
        <Box sx={{ mb: 5 }}>
          {failedFiles.map(el => (
            <FormHelperText sx={{ color: 'error.main' }}>- {el}</FormHelperText>
          ))}
        </Box>
      )}
      {selectedFiles && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {selectedFiles.map((el: any) => (
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Box
                sx={{
                  background: '#f56943',
                  borderRadius: '50px',
                  mr: 3
                }}
              >
                <IconButton
                  sx={{ color: 'white', boxShadow: '0 0 3px #999', padding: '.3125rem' }}
                  onClick={() => deleteFile(el.path)}
                >
                  <IconifyIcon icon='material-symbols:close' fontWeight={'bold'} />
                </IconButton>
              </Box>

              <audio controls>
                <source src={`${serverUrl}${el.path}`} />
                <Link href={`${serverUrl}${el.path}`} target='_blank'>
                  - {el.name}
                </Link>
              </audio>
            </Box>
          ))}
        </Box>
      )}
      <FormControl>
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
            <TextField {...field} inputRef={ref} error={Boolean(errors[name])} type='hidden' sx={{ display: 'none' }} />
          )}
        />
        {errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
      </FormControl>
    </Box>
  )
}
