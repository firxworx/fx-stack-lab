import { Stack, App, StackProps, RemovalPolicy } from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'

// import * as iam from 'aws-cdk-lib/aws-iam'
// import * as kms from 'aws-cdk-lib/aws-kms'

export interface DemoBucketStackProps extends StackProps {
  bucketName: string
}

export class DemoBucketStack extends Stack {
  constructor(scope: App, id: string, props: DemoBucketStackProps) {
    super(scope, id, props)

    const { bucketName } = props

    const _s3Bucket = new s3.Bucket(this, 'exampleBucket', {
      bucketName,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      //
      // encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
    })

    // s3Bucket.grantRead(new iam.AccountRootPrincipal())
  }
}
