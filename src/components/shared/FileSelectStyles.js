import React from 'react'

const FileSelect = () => {
  const FileContainerStyles = {
    margin: '10px'
  }

  // const FileContainerStylesHover = {
  //   color: 'rgba(25, 185, 80, 0.7)'
  // }

  return (
    <input type='file' name='file' style={FileContainerStyles}>
    </input>
  )
}

export default FileSelect
