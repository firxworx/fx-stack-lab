import { Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import { mantineTheme } from './styles/theme'

import { AppLayout } from './layout/AppLayout'
import { IndexPage } from './pages/IndexPage'
import { FormPage } from './pages/FormPage'
import { NotFoundPage } from './pages/404'
import { ModalPage } from './pages/ModalPage'

export function App(): JSX.Element {
  return (
    <MantineProvider withGlobalStyles={true} withNormalizeCSS={true} theme={mantineTheme}>
      <ModalsProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="forms" element={<FormPage />} />
            <Route path="modals" element={<ModalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
