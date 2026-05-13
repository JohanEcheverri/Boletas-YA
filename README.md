# BoletaYa

Aplicacion web para publicar eventos y vender boletos. El proyecto esta hecho con React y Vite, y mantiene los datos en memoria mientras la pagina esta abierta.

## Requisitos

- Node.js instalado.
- npm instalado.

## Instalacion

Desde la carpeta del proyecto:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre la URL que muestra Vite en la terminal, normalmente:

```text
http://127.0.0.1:5173/
```

Si ese puerto esta ocupado, Vite usara otro automaticamente.

## Uso de la aplicacion

La app tiene dos secciones principales:

- Comprar boletos: permite ver eventos, filtrar por categoria, abrir el detalle de un evento, seleccionar cantidades y confirmar una compra.
- Gestionar eventos: permite crear eventos con nombre, lugar, fecha, hora, categoria, icono, descripcion y uno o varios tipos de boleto. Tambien permite eliminar eventos publicados.

## Datos de prueba

La aplicacion inicia con 10 eventos de prueba distribuidos entre estas categorias:

- Musica
- Arte
- Deportes
- Teatro
- Tecnologia
- Gastronomia

Los registros estan definidos en:

```text
src/data/events.js
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera la version de produccion en la carpeta `dist`.

```bash
npm run lint
```

Revisa el codigo con ESLint.

```bash
npm run preview
```

Sirve localmente la version generada por `npm run build`.

## Estructura principal

```text
src/
  components/        Componentes compartidos
  data/              Datos iniciales de prueba
  features/admin/    Pantallas y componentes de gestion
  features/client/   Catalogo, tarjetas y modal de compra
  styles/            Estilos globales de la app
  utils/             Funciones auxiliares
```
