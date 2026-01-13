# Guía para Descargar Fuentes Auto-Hospedadas

## Paso 1: Descargar Space Grotesk

1. Ve a: https://gwfh.mranftl.com/fonts/space-grotesk
2. Selecciona los pesos: **300, 400, 500, 600, 700**
3. Formato: **woff2** (el más moderno y comprimido)
4. Charset: **latin** (suficiente para español)
5. Haz clic en **Download**
6. Extrae el ZIP y copia los archivos `.woff2` a: `public/fonts/`

Archivos esperados:
- `space-grotesk-v15-latin-300.woff2`
- `space-grotesk-v15-latin-regular.woff2`
- `space-grotesk-v15-latin-500.woff2`
- `space-grotesk-v15-latin-600.woff2`
- `space-grotesk-v15-latin-700.woff2`

## Paso 2: Descargar Inter

1. Ve a: https://gwfh.mranftl.com/fonts/inter
2. Selecciona los pesos: **300, 400, 500, 600**
3. Formato: **woff2**
4. Charset: **latin**
5. Haz clic en **Download**
6. Extrae el ZIP y copia los archivos `.woff2` a: `public/fonts/`

Archivos esperados:
- `inter-v13-latin-300.woff2`
- `inter-v13-latin-regular.woff2`
- `inter-v13-latin-500.woff2`
- `inter-v13-latin-600.woff2`

## Paso 3: Verificar

Deberías tener **9 archivos** en total en `public/fonts/`:
```
public/fonts/
├── space-grotesk-v15-latin-300.woff2
├── space-grotesk-v15-latin-regular.woff2
├── space-grotesk-v15-latin-500.woff2
├── space-grotesk-v15-latin-600.woff2
├── space-grotesk-v15-latin-700.woff2
├── inter-v13-latin-300.woff2
├── inter-v13-latin-regular.woff2
├── inter-v13-latin-500.woff2
└── inter-v13-latin-600.woff2
```

## Alternativa Rápida (Línea de Comandos)

Si tienes `curl` instalado, puedes usar este script para descargar automáticamente:

```bash
# Crear directorio
mkdir -p public/fonts

# Descargar Space Grotesk
cd public/fonts
curl -O https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2
# Renombrar según sea necesario

# Descargar Inter
curl -O https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2
# Renombrar según sea necesario
```

**NOTA:** Es más fácil usar la interfaz web de google-webfonts-helper.
