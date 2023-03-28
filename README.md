# fx-stack-lab

Experiments, PoC's, and educational tangents in the land of TypeScript and beyond.

## Development

You probably don't want to use anything in this repo.

If you insist, `pnpm` is recommended and dependencies can be installed with `pnpm install`.

Refer to `package.json` for scripts. This workspace is managed using the [Nx build system](https://nx.dev/).

## Content Notes

apps:

- `site` - react + vitejs - misc experimentation - ports 4205 (dev server) + 4305 (preview)
- `mantine` - react + vitejs - exploration of mantine react library - ports 5205 (dev server) + 5305 (preview)
- `aws-cdk` - aws-cdk w/ @ago-dev/nx-aws-cdk-v2 - aws-cdk playground
  - `pnpm cdk:command ...` runs `package.json` version of `cdk`
  - able to import from monorepo libraries per your solution posted to <https://github.com/adrian-goe/nx-aws-cdk-v2/issues/679>

## Infrastructure (aws-cdk)

The `cdk:command` script defined in `package.json` is wired up to manage AWS resources defined in `apps/infra` using aws-cdk.

The following pattern can be used to execute a cdk command for a given stack:

```sh
pnpm cdk:command <cdk_command> <StackToTarget> --profile <aws_profile>
```

For example:

```sh
pnpm cdk:command synth ExampleStack --profile default
```

This approach works around an issue in `@ago-dev/nx-aws-cdk-v2` with using imported libraries/packages as reported by yours truly along with the above workaround solution added as a comment: https://github.com/adrian-goe/nx-aws-cdk-v2/issues/679
