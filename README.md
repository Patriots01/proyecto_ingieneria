# CFE Portal (Next.js)

Proyecto de ejemplo para consulta y gestión de facturas estilo CFE.

Requisitos:
- Node.js (v18+ recomendado)

Instalación (PowerShell):

```powershell
cd "C:\Users\smtra\OneDrive\Escritorio\pri"
npm install
npm run dev
```

Rutas principales:
- `/` Inicio.
- `/user` Acceso para usuarios (introducir medidor).
- `/meter?meter=XXXX` Ver información del medidor.
- `/admin` Acceso administrador.
- `/admin/dashboard?worker=123` Panel administrador.

APIs:
- `GET /api/users` Listar usuarios.
- `GET /api/user/[meter]` Obtener usuario.
- `PUT /api/users` Actualizar usuario (envía JSON con `meter`).
- `GET/POST /api/reports` Listar/crear reportes.
