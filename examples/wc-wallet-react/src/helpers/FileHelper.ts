export abstract class FileHelper {
  static fileOrBlobToArrBuffer(file: File | Blob): Promise<ArrayBuffer | null> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer)
      }

      reader.readAsArrayBuffer(file)
    })
  }

  static async fileToArrBuffer(file: File): Promise<ArrayBuffer | null> {
    return await this.fileOrBlobToArrBuffer(file)
  }

  static async blobToArrBuffer(blob: Blob): Promise<ArrayBuffer | null> {
    return await this.fileOrBlobToArrBuffer(blob)
  }

  static fileToUrl(file: File | Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  static urlToImg(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image()

      img.onload = () => {
        resolve(img)
      }

      img.src = url
    })
  }

  static canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob: Blob | null) => {
        resolve(blob)
      })
    })
  }

  static urlToBlob(dataURI: string): Blob {
    let byteString: string
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = unescape(dataURI.split(',')[1])
    }

    // separate out the mime component
    const mimeString: string = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  static urlToArrayBuffer(dataURI: string): Promise<ArrayBuffer | null> {
    const blob = this.urlToBlob(dataURI)
    return this.fileOrBlobToArrBuffer(blob)
  }

  static async fileToImg(file: File | Blob): Promise<HTMLImageElement> {
    const url = await this.fileToUrl(file)
    return await this.urlToImg(url)
  }

  static fileOrBlobToExtension(file: Blob | File): string {
    return file.type.includes('jpeg') ? 'jpg' : file.type.split('/')[1]
  }

  static arrayBufferToBlob(arrayBuffer: ArrayBuffer): Blob {
    return new Blob([arrayBuffer], { type: 'image/jpeg' })
  }

  static blobToUrl(blob: Blob): string {
    return (window.URL || window.webkitURL).createObjectURL(blob)
  }

  static arrayBufferToUrl(arrayBuffer: ArrayBuffer): string {
    const blob = this.arrayBufferToBlob(arrayBuffer)
    return this.blobToUrl(blob)
  }

  static promptForMultipleFiles(accept: string | null = null, multiple = true): Promise<File[] | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      if (accept) {
        input.accept = accept
      }

      if (multiple) {
        input.setAttribute('multiple', 'multiple')
      }

      document.body.appendChild(input)

      input.onchange = (e: any) => {
        document.body.removeChild(input)
        resolve(e.target.files)
      }

      input.click()
    })
  }

  static async promptForSingleFile(accept: string | null = null): Promise<File | null> {
    const files: File[] | null = await this.promptForMultipleFiles(accept, false)
    if (!files || !files.length) {
      return null
    }
    return files[0]
  }

  static downloadJsonFile(name: string, obj: unknown): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', name + '.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
}
