import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import IconifyIcon from 'src/@core/components/icon'
import { apiUrl, serverUrl } from 'src/services/common/CommonService'
import HttpService from 'src/services/common/HttpService'
import ImageFieldConfig from './ImageFieldConfig'
import Loading from 'src/views/components/common/Loading'
import FullscreenImageDialog from 'src/views/components/common/FullscreenImageDialog'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

export default function ImageFileUpload({
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
  const [openDialogViewImage, setOpenDialogViewImage] = useState(false)
  const [openingImage, setOpeningImage] = useState<string>('')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploading(true)
      let successed = [...selectedFiles]
      const failed: any[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const validated = ImageFieldConfig.validateImage(file)
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
      {openingImage && (
        <FullscreenImageDialog
          imagePath={openingImage}
          onClose={() => setOpenDialogViewImage(false)}
          openDialog={openDialogViewImage}
        />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
        <Typography sx={{ mb: 2 }}>{label}:</Typography>
        {uploading ? (
          <CircularProgress />
        ) : (
          <Button
            variant='outlined'
            component='label'
            size={'small'}
            endIcon={<IconifyIcon icon='material-symbols:imagesmode-outline-rounded' />}
          >
            {LocalizationService.translate('form_pick_image')}
            <input
              type='file'
              hidden
              multiple={allowMultiple}
              accept={ImageFieldConfig.imageAllowExtensions.join(', ')}
              onChange={handleFileChange}
            />
          </Button>
        )}
      </Box>
      {failedFiles.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {failedFiles.map(el => (
            <FormHelperText sx={{ color: 'error.main' }}>- {el}</FormHelperText>
          ))}
        </Box>
      )}
      {selectedFiles && (
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexFlow: 'wrap', flex: 'auto' }}>
          {selectedFiles.map(el => (
            <Box
              sx={{
                mr: 4,
                mb: 4,
                position: 'relative',
                borderRadius: '12px',
                boxShadow: '0 0 5px #999',
                overflow: 'hidden',
                width: '150px',
                height: '150px'
              }}
            >
              <Button
                onClick={() => {
                  setOpeningImage(`${serverUrl}${el.path}`)
                  setOpenDialogViewImage(true)
                }}
                sx={{ p: 0 }}
              >
                <img
                  src={`${serverUrl}${el.path}`}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                ></img>
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  background: '#f56943',
                  borderRadius: '50px'
                }}
              >
                <IconButton
                  sx={{ color: 'white', boxShadow: '0 0 5px #555', padding: '.3125rem' }}
                  onClick={() => deleteFile(el.path)}
                >
                  <IconifyIcon icon='material-symbols:close' fontWeight={'bold'} />
                </IconButton>
              </Box>
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
