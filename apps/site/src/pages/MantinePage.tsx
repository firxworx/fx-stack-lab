import { MantineProvider, Text } from '@mantine/core'

export function MantinePage(): JSX.Element {
  return (
    <MantineProvider
    //withGlobalStyles
    //withNormalizeCSS
    >
      <Text>Hello world</Text>
    </MantineProvider>
  )
}
