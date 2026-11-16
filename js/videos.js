/* Catalogo de procesos y pilares de negocio del ERP COMERCIAL.
   Fuente unica para los pilares operativos, filtros, catalogo de demos y modal. */

const ETAPAS = {
  // general: 'General',
  recepcion: 'Recepción',
  valorizacion: 'Valorización',
  despacho: 'Despacho',
  contabilidad: 'Contabilidad',
};

/* Los 4 pilares operativos del negocio (resumen real de context.md). */
const PILARES = [
  {
    n: '01',
    cat: 'recepcion',
    titulo: 'Recepción, Balanza y Guías',
    desc: 'Vigilancia confirma llegadas programadas y registra evidencias. Balanza lee el peso directo de máquina —incluso lotes en varios carros— y ordena particiones de carga útil y guías.',
    cta: 'Ver 6 demos de recepción',
  },
  {
    n: '02',
    cat: 'valorizacion',
    titulo: 'Cierre de Leyes y Compra',
    desc: 'Enlaza muestras previas con ensayos de laboratorio, acuerda la ley de cierre (Au, Ag, humedad, recuperación) y valoriza la compra con maquila, penalidades y anticipos.',
    cta: 'Ver 3 demos de valorización',
  },
  {
    n: '03',
    cat: 'valorizacion',
    titulo: 'Blending y Despachos',
    desc: 'Calcula la mezcla más rentable según peso máximo y leyes requeridas, distribuye el envío en unidades de salida y registra la valorización que devuelve el cliente.',
    cta: 'Ver demos de despacho',
    filterCat: 'despacho',
  },
  {
    n: '04',
    cat: 'contabilidad',
    titulo: 'Anticipos y Contabilidad',
    desc: 'Controla cada adelanto entregado a proveedores o recibido de clientes y los deduce automáticamente al emitir el comprobante de compra o venta.',
    cta: 'Ver 2 demos de contabilidad',
  },
];

/* Los 14 videos de la serie. */
const VIDEOS = [
  // {
  //   n: '00',
  //   file: '00-general',
  //   cat: 'general',
  //   titulo: 'El ciclo completo del mineral',
  //   desc: 'De la programación de la unidad al comprobante de venta, con cada etapa registrada en el mismo sistema.',
  // },
  {
    n: '01',
    file: '01-programacion-unidades',
    cat: 'recepcion',
    titulo: 'Programación de Unidades',
    desc: 'El jefe comercial programa la llegada con transportista, vehículo, proveedor, hora y guías. Vigilancia solo confirma.',
  },
  {
    n: '02',
    file: '02-recepcion-unidades',
    cat: 'recepcion',
    titulo: 'Recepción de Unidades',
    desc: 'Vigilancia registra el ingreso de los vehículos pesados, con placa, conductor, tipo de vehículo, guías y evidencia.',
  },
  {
    n: '03',
    file: '03-recepcion-visitas',
    cat: 'recepcion',
    titulo: 'Recepción de Visitas',
    desc: 'Personas y vehículos que entran por otros motivos quedan con motivo, documento y responsable.',
  },
  {
    n: '04',
    file: '04-balanza',
    cat: 'recepcion',
    titulo: 'Balanza',
    desc: 'Tara, bruto y neto por unidad, lotes repartidos en varias partes y el resumen de lo pesado.',
  },
  {
    n: '05',
    file: '05-validacion-distribucion',
    cat: 'recepcion',
    titulo: 'Validación y Distribución',
    desc: 'Un lote repartido en varios carros se organiza en partes, cada una con su vehículo y su guía.',
  },
  {
    n: '06',
    file: '06-guias',
    cat: 'recepcion',
    titulo: 'Guías',
    desc: 'Las guías de transporte y remisión se registran agrupando los lotes o partes que trajo.',
  },
  {
    n: '07',
    file: '07-cierre-leyes',
    cat: 'valorizacion',
    titulo: 'Cierre de Leyes',
    desc: 'Por cada análisis: laboratorio, responsable, ensayo, oro, plata, humedad y recuperación. Y la ley de cierre.',
  },
  {
    n: '08',
    file: '08-valorizacion-compra',
    cat: 'valorizacion',
    titulo: 'Valorización de Compra',
    desc: 'Propuesta de compra por proveedor y lote, valorizada en oro y plata, con maquila, precio internacional y penalidades.',
  },
  {
    n: '09',
    file: '09-blending',
    cat: 'valorizacion',
    titulo: 'Blending',
    desc: 'Mezcla por peso máximo, leyes requeridas y precio, o eligiendo los lotes a mano y calculando las leyes.',
  },
  {
    n: '10',
    file: '10-programacion-despachos',
    cat: 'despacho',
    titulo: 'Programación de Despachos',
    desc: 'Se eligen lotes o blendings, se reparten las toneladas entre los vehículos y se confirma la llegada con código, peso y leyes.',
  },
  {
    n: '11',
    file: '11-valorizacion-venta',
    cat: 'despacho',
    titulo: 'Valorización de Venta',
    desc: 'La valorización que manda el cliente se registra sobre los lotes enviados, con sus leyes y sus precios.',
  },
  {
    n: '12',
    file: '12-anticipos',
    cat: 'contabilidad',
    titulo: 'Anticipos de Proveedores y Clientes',
    desc: 'Contabilidad registra los anticipos dados y recibidos, y en qué comprobante se aplicaron.',
  },
  {
    n: '13',
    file: '13-contabilidad',
    cat: 'contabilidad',
    titulo: 'Contabilidad: Compra y Venta',
    desc: 'El comprobante de compra toma la valorización acordada y deduce sus anticipos; el de venta elige los lotes valorizados.',
  },
];

const VIDEO_PRINCIPAL = {
  src: 'videos/00-general.mp4',
  titulo: 'ERP COMERCIAL · El ciclo completo del mineral',
  desc: 'De la programación de la unidad al comprobante de venta, con cada etapa registrada en el mismo sistema.',
};
