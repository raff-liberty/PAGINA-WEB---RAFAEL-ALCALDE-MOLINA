# Guía de Integración Manual - LandingFileManager en AdminPanel

## Cambios Necesarios en AdminPanel.jsx

Debido al tamaño del archivo `AdminPanel.jsx`, aquí están las instrucciones para integrar manualmente el componente `LandingFileManager`:

### 1. El import ya está añadido ✓
```javascript
import LandingFileManager from '../components/LandingFileManager';
```

### 2. Añadir estado para la navegación de tabs (ya añadido ✓)
```javascript
const [landingTab, setLandingTab] = useState('seo'); // 'seo' or 'files'
```

### 3. Modificar la sección `{activeTab === 'landings' && (`

Reemplazar la línea 2238-2239:
```javascript
{activeTab === 'landings' && (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
```

Con:
```javascript
{activeTab === 'landings' && (
    <div className="space-y-6">
        {/* Sub-navigation for Landings */}
        <div className="flex bg-[#222222]/80 backdrop-blur-md rounded-xl p-1 border border-white/10 w-fit">
            <button
                onClick={() => setLandingTab('seo')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                    landingTab === 'seo'
                        ? 'bg-primary text-gray-900 font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <Globe className="w-4 h-4" />
                SEO Landings
            </button>
            <button
                onClick={() => setLandingTab('files')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                    landingTab === 'files'
                        ? 'bg-primary text-gray-900 font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <FileText className="w-4 h-4" />
                Archivos Descargables
            </button>
        </div>

        {/* SEO Landings Section */}
        {landingTab === 'seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
```

### 4. Antes del cierre de la sección de landings (línea ~2565)

Justo antes de:
```javascript
                    </div>
                )}
```

Añadir:
```javascript
                        )}

                        {/* Files Management Section */}
                        {landingTab === 'files' && (
                            <LandingFileManager />
                        )}
                    </div>
                )}
```

## Resumen de Cambios

1. ✓ Import añadido
2. ✓ Estado `landingTab` añadido
3. ⚠️ Añadir navegación de tabs (manual)
4. ⚠️ Envolver contenido SEO en condicional `{landingTab === 'seo' && (` (manual)
5. ⚠️ Añadir sección de archivos con `<LandingFileManager />` (manual)

## Alternativa Rápida

Si prefieres, puedes copiar todo el contenido del archivo `AdminPanel.jsx` y buscar la línea 2238 donde dice:
```javascript
{activeTab === 'landings' && (
```

Y reemplazar toda esa sección hasta la línea 2566 con el código proporcionado en el archivo `landing_section_replacement.jsx` que crearé a continuación.
