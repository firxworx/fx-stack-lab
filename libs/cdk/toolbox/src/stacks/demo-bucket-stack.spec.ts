import { Stack, App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { DemoBucketStack } from './demo-bucket-stack'

test('Empty Stack', () => {
  const app = new App()

  const stack = new DemoBucketStack(app, 'infraTestStack', {
    bucketName: 'test-bucket-name',
  })

  Template.fromStack(stack as Stack).templateMatches({
    Resources: {},
  })
})
