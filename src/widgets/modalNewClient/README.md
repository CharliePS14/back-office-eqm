# Modal Nueva Empresa

Este widget permite registrar una nueva empresa en el sistema. Incluye validación de formulario, manejo de archivos de imagen para el logo, y notificaciones de éxito/error.

## Estructura del widget

```
modalNewClient/
├── index.tsx                 # Exportaciones principales
├── ui/
│   └── modalNewClient.tsx   # Componente principal del modal
├── lib/
│   └── useModalNewClient.ts # Hook para manejar la lógica del modal
└── types/
    └── index.ts             # Tipos TypeScript
```

## Uso

### Importación

```tsx
import { ModalNewClient, useModalNewClient } from "@/widgets/modalNewClient";
```

### Ejemplo básico

```tsx
function MiComponente() {
  const { isOpen, openModal, closeModal, handleSubmit } = useModalNewClient({
    onSuccess: (message) => console.log('Éxito:', message),
    onError: (message) => console.error('Error:', message),
  });

  return (
    <>
      <button onClick={openModal}>
        Nuevo Cliente
      </button>
      
      <ModalNewClient 
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

## Características

- **Formulario validado**: Campos obligatorios para nombre y email
- **Subida de imagen**: Permite subir logo de la empresa con preview
- **Feedback visual**: Loading states y notificaciones de éxito/error  
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Incluye aria-labels y manejo de teclado

## Campos del formulario

- **Nombre de la Empresa** (obligatorio): Texto
- **Email de Contacto** (obligatorio): Email válido
- **Logo de la Empresa** (opcional): Imagen (preview incluido)
- **Descripción** (opcional): Textarea

## Integración actual

El modal está integrado en:

1. **AdminLayout**: Botón "+" en la sidebar
2. **AdminHeader**: Botón "Nuevo Cliente" en el header

Ambos comparten el mismo sistema de notificaciones para mostrar mensajes de éxito/error.

## TODO

- [ ] Implementar llamada real a la API
- [ ] Agregar actualización automática de la lista de clientes
- [ ] Validación adicional de archivos de imagen
- [ ] Soporte para múltiples formatos de imagen
- [ ] Persistencia del formulario en caso de error