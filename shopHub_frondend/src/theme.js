import { extendTheme } from '@chakra-ui/react'
import {
  theme as base,
} from '@chakra-ui/react';
import '@fontsource-variable/inter'
import '@fontsource-variable/noto-sans-tc'

const theme = extendTheme({
  fonts: {
    heading: `'Inter',Noto Sans TC, sans-serif,${base.fonts?.body}`,
    body: `'Inter','Noto Sans TC', sans-serif,${base.fonts?.body}`,
  },
})
export default theme