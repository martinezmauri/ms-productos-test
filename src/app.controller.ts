import { Controller, Get, Res, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      message: 'API is running successfully',
    };
  }

  @Get('api-redirect')
  @Redirect('/docs', 302)
  redirectToDocs() {
    return;
  }

  @Get('docs')
  getDocs(@Res() res: Response) {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POWIP Products API - Documentación</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            border-left: 4px solid #007bff;
        }
        .method {
            font-weight: bold;
            color: #007bff;
        }
        .url {
            font-family: monospace;
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 3px;
        }
        .description {
            color: #666;
            margin-top: 5px;
        }
        .swagger-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .swagger-link:hover {
            background: #0056b3;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 POWIP Products API</h1>
        <p>Bienvenido a la documentación de la API de microservicios de POWIP-Products.</p>
        
        <div class="warning">
            <strong>⚠️ Nota:</strong> La interfaz de Swagger UI (/api) puede no funcionar correctamente en Vercel debido a limitaciones de archivos estáticos. Usa esta página como alternativa.
        </div>
        
        <h2>📋 Endpoints Disponibles</h2>
        
        <div class="endpoint">
            <div class="method">GET</div>
            <div class="url">/health</div>
            <div class="description">Verificar el estado de la API</div>
        </div>
        
        <div class="endpoint">
            <div class="method">GET</div>
            <div class="url">/api-json</div>
            <div class="description">Documentación de la API en formato JSON</div>
        </div>
        
        <div class="endpoint">
            <div class="method">GET</div>
            <div class="url">/api</div>
            <div class="description">Interfaz de Swagger UI (limitada en Vercel)</div>
        </div>
        
        <h2>🔗 Enlaces Útiles</h2>
        <a href="/api" class="swagger-link">📖 Swagger UI</a>
        <a href="/api-json" class="swagger-link">📄 Documentación JSON</a>
        <a href="/health" class="swagger-link">💚 Health Check</a>
        
        <h2>📝 Alternativas para Swagger UI</h2>
        <p>Si necesitas una interfaz interactiva como Swagger UI, puedes:</p>
        <ul>
            <li>Copiar el contenido de <code>/api-json</code> y pegarlo en <a href="https://editor.swagger.io/" target="_blank">Swagger Editor</a></li>
            <li>Usar herramientas como <a href="https://insomnia.rest/" target="_blank">Insomnia</a> o <a href="https://www.postman.com/" target="_blank">Postman</a> para probar los endpoints</li>
            <li>Usar la documentación JSON directamente en tu aplicación</li>
        </ul>
    </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}
