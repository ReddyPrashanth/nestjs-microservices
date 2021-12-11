import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3();
  }

  async uploadUserProfile(
    dataBuffer: Buffer,
  ): Promise<S3.ManagedUpload.SendData> {
    try {
      const response = await this.s3
        .upload({
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Body: dataBuffer,
          Key: `profiles/${uuid()}`,
        })
        .promise();
      return response;
    } catch (error) {
      throw new HttpException(error?.message, error?.statusCode);
    }
  }

  getProfilePicture(key: string) {
    const downloadParams = {
      Key: key,
      Bucket: this.configService.get('S3_BUCKET_NAME'),
    };
    return this.s3.getObject(downloadParams).createReadStream();
  }
}
