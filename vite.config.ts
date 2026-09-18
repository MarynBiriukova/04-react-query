import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  build: {
    sourcemap: true,
  },

  define: {
      'import.meta.env.VITE_TMDB_TOKEN': JSON.stringify(env.VITE_TMDB_TOKEN)
    }
})
