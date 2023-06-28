import AWS from 'aws-sdk'
import {
  AWS_ACCESS_KEY,
  AWS_BUCKET,
  AWS_SECRET_KEY,
  AWS_SERVER,
  AWS_SSL_ENABLED,
} from '@sovok/server/config'
import fs from 'fs/promises'
import path from 'path'
import { S3Metadata } from '@sovok/shared/models/download/download-task'

const s3 = new AWS.S3({
  endpoint: AWS_SERVER,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  sslEnabled: AWS_SSL_ENABLED,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
})

export const uploadTrack = async (
  pathToRead: string,
  s3Key: string,
  meta: S3Metadata,
) => {
  console.log(`[S3] Uploading ${pathToRead}`)
  const file = await fs.readFile(path.resolve(pathToRead))
  const uploaded = await s3
    .upload({
      Bucket: AWS_BUCKET,
      Key: s3Key,
      Body: file,
      Metadata: meta,
    })
    .promise()

  return {
    location: `${uploaded.Bucket}/${uploaded.Key}`,
    key: uploaded.Key,
  }
}
// const uploaded = await s3
//   .upload({
//     Bucket: AWS_BUCKET,
//     Key: fileUploadRequest.filenames[0],
//     Body: buffer,
//   })
//   .promise()
