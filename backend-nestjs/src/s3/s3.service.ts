import { Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Upload } from "@aws-sdk/lib-storage";
import { config } from 'dotenv';
import * as process from 'node:process';

config();

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: "ru-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.AWS_ENDPOINT,
  })

  async upload(fileName: string, file: Buffer) {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: 'film-flood-bucket',
        Key: fileName,
        Body: file,
      },
    });

    await upload.done();
  }

  async getFileUrl(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: 'film-flood-bucket',
      Key: `${fileName}.avi`,
    });

    return await getSignedUrl(this.s3Client, command);
  }
}