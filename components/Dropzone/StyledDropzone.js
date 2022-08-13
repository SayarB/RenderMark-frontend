import Image from 'next/image'
import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../../styles/Dropzone.module.css'
import fileFace from '../../assets/file-face.png'
const baseStyle = {
  width: '100%',
  fontSize: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#ffffff',
  borderStyle: 'solid',
  backgroundColor: 'transparent',
  color: '#ffffff',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

function StyledDropzone (props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      noClick: props.file,
      noDrag: props.file,
      accept: {
        'text/markdown': ['.md']
      },
      maxFiles: 1,
      onDrop: (files) => props.onDrop(files[0])
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className={styles['dropzone-container']}>
      <div {...getRootProps({ style })}>
        <input
          disabled={typeof props.file === 'undefined'}
          {...getInputProps()}
        />
        <Image src={fileFace} width={100} height={100} alt='' />
        {props.file
          ? (
            <p>{props.file.path}</p>
            )
          : (
            <>
              <p className={styles['md-upload-large-text']}>
                Drag &lsquo;n&rsquo; drop some files here, or click to select
                files
              </p>
              <p className={styles['md-upload-subtext']}>
                or drag and drop a file here
              </p>
            </>
            )}
      </div>
    </div>
  )
}

export default StyledDropzone
