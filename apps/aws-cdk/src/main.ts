import { App } from 'aws-cdk-lib'
import { DemoBucketStack } from '@firx/cdk-toolbox'

const account = process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION

const env = { account, region }

const app = new App()

new DemoBucketStack(app, 'DemoBucketStack', {
  env,
  bucketName: 'asdfxyz-test-bucket-name-asdfxyz',
})
