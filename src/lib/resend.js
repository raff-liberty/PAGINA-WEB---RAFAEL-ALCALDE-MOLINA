const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

/**
 * Envía un email usando Resend API
 * @param {Object} params - Parámetros del email
 * @param {string|string[]} params.to - Destinatario(s)
 * @param {string} params.subject - Asunto del email
 * @param {string} params.html - Contenido HTML del email
 * @param {Array} params.attachments - Archivos adjuntos (opcional)
 * @returns {Promise<Object>} Respuesta de Resend
 */
export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY no está configurada en las variables de entorno');
        throw new Error('Resend API Key no configurada');
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'Engorilate <hola@engorilate.com>', // Cambia esto a tu dominio verificado
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
            attachments
        })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Error de Resend:', error);
        throw new Error(error.message || 'Error al enviar email');
    }

    return await response.json();
};

/**
 * Genera el HTML del email de presupuesto
 * @param {Object} quote - Datos del presupuesto
 * @returns {string} HTML del email
 */
const generateQuoteEmailHTML = (quote) => {
    const clientName = quote.project?.contact?.full_name || 'Cliente';
    const projectName = quote.project?.name || 'Proyecto';
    const total = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(quote.total || 0);

    // Generar lista de servicios
    const servicesHTML = (quote.items || []).map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong>${item.description || item.name}</strong>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price || 0)}
      </td>
    </tr>
  `).join('');

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tu Presupuesto - Engorilate</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f6f9fc;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #6EE7B7 0%, #34D399 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: bold;">
                    Tu Presupuesto - Engorilate
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #1a1a1a; font-size: 14px;">
                    Automatización de Negocios
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151;">
                    Hola <strong>${clientName}</strong>,
                  </p>
                  
                  <p style="margin: 0 0 30px 0; font-size: 16px; color: #374151; line-height: 1.6;">
                    Adjunto encontrarás tu presupuesto personalizado para el proyecto <strong>${projectName}</strong>.
                  </p>

                  <!-- Services Table -->
                  <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #1f2937;">
                    Servicios Incluidos:
                  </h2>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background-color: #f9fafb;">
                        <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">
                          Servicio
                        </th>
                        <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase; border-bottom: 2px solid #e5e7eb;">
                          Precio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${servicesHTML}
                    </tbody>
                  </table>

                  <!-- Total -->
                  <div style="background-color: #f9fafb; border: 2px solid #6EE7B7; border-radius: 8px; padding: 20px; text-align: right; margin-bottom: 30px;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                      Total
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 32px; color: #1f2937; font-weight: bold;">
                      ${total}
                    </p>
                  </div>

                  <p style="margin: 0 0 20px 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                    Este presupuesto es válido por <strong>30 días</strong> desde la fecha de emisión.
                  </p>

                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <a href="https://wa.me/34XXXXXXXXX?text=Hola,%20quiero%20hablar%20sobre%20mi%20presupuesto" 
                           style="display: inline-block; background-color: #6EE7B7; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                          Contactar por WhatsApp
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 30px 0 0 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                    Si tienes alguna duda o quieres proceder con el proyecto, no dudes en contactarme.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px 0; font-size: 16px; color: #1f2937; font-weight: bold;">
                    Rafael Alcalde
                  </p>
                  <p style="margin: 0 0 5px 0; font-size: 14px; color: #6b7280;">
                    Engorilate - Automatización de Negocios
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">
                    📧 hola@engorilate.com | 📱 +34 XXX XXX XXX
                  </p>
                  <p style="margin: 15px 0 0 0; font-size: 12px; color: #9ca3af;">
                    <a href="https://engorilate.com" style="color: #6EE7B7; text-decoration: none;">engorilate.com</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Envía un presupuesto por email con PDF adjunto
 * @param {Object} quote - Datos del presupuesto
 * @param {string} pdfBase64 - PDF en base64
 * @returns {Promise<Object>} Respuesta de Resend
 */
export const sendQuoteEmail = async (quote, pdfBase64) => {
    const clientEmail = quote.project?.contact?.email;

    if (!clientEmail) {
        throw new Error('El contacto no tiene email configurado');
    }

    const clientName = quote.project?.contact?.full_name || 'Cliente';
    const projectName = quote.project?.name || 'Proyecto';

    const html = generateQuoteEmailHTML(quote);

    const attachments = pdfBase64 ? [{
        filename: `presupuesto-${projectName.toLowerCase().replace(/\s+/g, '-')}-v${quote.version}.pdf`,
        content: pdfBase64
    }] : [];

    return await sendEmail({
        to: clientEmail,
        subject: `Tu presupuesto para ${projectName} - Engorilate`,
        html,
        attachments
    });
};
