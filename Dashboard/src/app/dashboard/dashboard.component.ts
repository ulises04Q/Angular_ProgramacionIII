import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Registro {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  sucursal: string;
  estado: 'Activo' | 'Pendiente' | 'Completado';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // Datos mock (hardcodeados) solo para mostrar
  registros: Registro[] = [
    { id: 1, nombre: 'Juan',    apellido: 'Pérez',     email: 'juan.perez@mail.com',     sucursal: 'Córdoba',      estado: 'Activo' },
    { id: 2, nombre: 'María',   apellido: 'González',  email: 'maria.gonzalez@mail.com', sucursal: 'Buenos Aires', estado: 'Pendiente' },
    { id: 3, nombre: 'Carlos',  apellido: 'López',     email: 'carlos.lopez@mail.com',   sucursal: 'Rosario',      estado: 'Completado' },
    { id: 4, nombre: 'Lucía',   apellido: 'Fernández', email: 'lucia.fdz@mail.com',      sucursal: 'Córdoba',      estado: 'Activo' },
    { id: 5, nombre: 'Martín',  apellido: 'Díaz',      email: 'martin.diaz@mail.com',    sucursal: 'Mendoza',      estado: 'Pendiente' },
    { id: 6, nombre: 'Sofía',   apellido: 'Romero',    email: 'sofia.romero@mail.com',   sucursal: 'Buenos Aires', estado: 'Completado' },
    { id: 7, nombre: 'Diego',   apellido: 'Sosa',      email: 'diego.sosa@mail.com',     sucursal: 'Córdoba',      estado: 'Activo' },
    { id: 8, nombre: 'Valeria', apellido: 'Torres',    email: 'valeria.torres@mail.com', sucursal: 'Salta',        estado: 'Completado' }
  ];

  // Tarjetas de resumen
  resumen = [
    { titulo: 'Total',       icono: '👥', valor: this.registros.length },
    { titulo: 'Activos',     icono: '✅', valor: this.contar('Activo') },
    { titulo: 'Pendientes',  icono: '⏳', valor: this.contar('Pendiente') },
    { titulo: 'Completados', icono: '🏁', valor: this.contar('Completado') }
  ];

  // Filtro visual de la tabla (sin servicios, solo en memoria)
  busqueda = signal('');

  registrosFiltrados = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();
    if (!texto) return this.registros;
    return this.registros.filter(r =>
      `${r.nombre} ${r.apellido} ${r.email} ${r.sucursal} ${r.estado}`
        .toLowerCase()
        .includes(texto)
    );
  });

  private contar(estado: Registro['estado']): number {
    return this.registros.filter(r => r.estado === estado).length;
  }

  onBuscar(event: Event) {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  limpiar(input: HTMLInputElement) {
    input.value = '';
    this.busqueda.set('');
  }

  ver(registro: Registro) {
    console.log('Registro seleccionado:', registro);
  }
}
