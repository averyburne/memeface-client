import React from 'react'

const FileSelect = () => {
  const FileContainerStyles = {
    margin: '10px'
  }

  return (
    <input type='file' name='file' style={FileContainerStyles}>
    </input>
  )
}

export default FileSelect
