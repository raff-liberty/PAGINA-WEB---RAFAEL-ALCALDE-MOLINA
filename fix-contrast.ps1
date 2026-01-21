# Script para mejorar contraste de texto
$files = @(
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Services.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\WhatsAppBooking.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Contact.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\About.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\WhyThisWorks.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\LocationPage.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Diagnosis.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\WebDevelopment.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\CustomManagement.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\LocalSeo.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\SectorLocationPage.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\SectorLocationPage_v2.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\SectorsDirectory.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Locations.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Legal.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Privacy.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Cookies.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\Blog.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\BlogPost.jsx",
    "d:\ANTES DE HACER - RAFAEL web\stitch_homepage\src\pages\ChaosLanding.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Reemplazar text-gray-600 con text-gray-300
        $content = $content -replace 'text-gray-600', 'text-gray-300'
        
        # Reemplazar text-gray-500 con text-gray-200
        $content = $content -replace 'text-gray-500', 'text-gray-200'
        
        # Reemplazar text-gray-400 con text-gray-300
        $content = $content -replace 'text-gray-400', 'text-gray-300'
        
        # Guardar el archivo
        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "Actualizado: $file"
    } else {
        Write-Host "No encontrado: $file"
    }
}

Write-Host "`nProceso completado!"
