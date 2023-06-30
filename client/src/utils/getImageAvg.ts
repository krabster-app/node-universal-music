export const getImageAvg = async (imageUrl: string) => {
  const canvas = document.createElement('canvas').getContext('2d')!
  const img = new Image()
  img.setAttribute('crossOrigin', '')
  await new Promise(resolve => {
    img.onload = resolve
    img.src = imageUrl
  })
  canvas.imageSmoothingEnabled = true
  canvas.drawImage(img, 0, 0, 1, 1)
  const data = canvas.getImageData(0, 0, 1, 1).data.slice(0, 3)
  return { r: data[0], g: data[1], b: data[2] }
}
