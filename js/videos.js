/* Catálogo de la serie de videos del ERP COMERCIAL.
   Fuente única para el catálogo, los filtros y el modal. */

const ETAPAS = {
  general: 'General',
  recepcion: 'Recepción',
  valorizacion: 'Valorización',
  despacho: 'Despacho',
  contabilidad: 'Contabilidad',
};

const VIDEOS = [
  {
    n: '00',
    file: '00-general',
    cat: 'general',
    titulo: 'El ciclo completo del mineral',
    desc: 'Doce etapas seguidas en un solo sistema: de la programación de la llegada hasta el comprobante de venta.',
  },
  {
    n: '01',
    file: '01-programacion-unidades',
    cat: 'recepcion',
    titulo: 'Programación de Unidades',
    desc: 'El jefe comercial programa la llegada con empresa de transporte, vehículo, proveedor, hora y guías opcionales. Vigilancia solo confirma.',
  },
  {
    n: '02',
    file: '02-recepcion-unidades',
    cat: 'recepcion',
    titulo: 'Recepción de Unidades',
    desc: 'Vigilancia registra el ingreso de los vehículos pesados, con placa, conductor, tipo de vehículo, guías, acompañantes y evidencia.',
  },
  {
    n: '03',
    file: '03-recepcion-visitas',
    cat: 'recepcion',
    titulo: 'Recepción de Visitas',
    desc: 'Personas y vehículos que entran por otros motivos quedan registrados con su motivo, su documento y el responsable que autoriza.',
  },
  {
    n: '04',
    file: '04-balanza',
    cat: 'recepcion',
    titulo: 'Balanza',
    desc: 'Tara, bruto y neto por unidad. Lotes particionados que se pesan por partes, y resumen con todo lo pesado.',
  },
  {
    n: '05',
    file: '05-validacion-distribucion',
    cat: 'recepcion',
    titulo: 'Validación y Distribución',
    desc: 'El lote pesado se organiza en partes, cada una con su vehículo y su guía, manteniendo la trazabilidad de la recepción.',
  },
  {
    n: '06',
    file: '06-guias',
    cat: 'recepcion',
    titulo: 'Guías',
    desc: 'Las guías de transporte y remisión se registran agrupando lotes o partes de un lote, con su peso documental.',
  },
  {
    n: '07',
    file: '07-cierre-leyes',
    cat: 'valorizacion',
    titulo: 'Cierre de Leyes',
    desc: 'Por cada análisis: laboratorio, responsable, número de ensayo, oro, plata, humedad y recuperación. Y la ley de cierre acordada.',
  },
  {
    n: '08',
    file: '08-valorizacion-compra',
    cat: 'valorizacion',
    titulo: 'Valorización de Compra',
    desc: 'Propuesta de compra por proveedor y lote, valorizada en oro y plata con maquila, precio internacional y penalidades.',
  },
  {
    n: '09',
    file: '09-blending',
    cat: 'valorizacion',
    titulo: 'Blending',
    desc: 'Mezcla inteligente por peso máximo, leyes requeridas y precio, o mezcla manual eligiendo los lotes y calculando las leyes.',
  },
  {
    n: '10',
    file: '10-programacion-despachos',
    cat: 'despacho',
    titulo: 'Programación de Despachos',
    desc: 'Se eligen lotes o blendings, se reparten las toneladas entre vehículos y se confirma la llegada con código, peso y leyes.',
  },
  {
    n: '11',
    file: '11-valorizacion-venta',
    cat: 'despacho',
    titulo: 'Valorización de Venta',
    desc: 'La valorización que envía el cliente se registra sobre los lotes enviados, con sus leyes y sus precios de oro y plata.',
  },
  {
    n: '12',
    file: '12-anticipos',
    cat: 'contabilidad',
    titulo: 'Anticipos de Proveedores y Clientes',
    desc: 'Contabilidad registra los anticipos dados y recibidos, y ve en qué valorización de compra o factura de venta se usaron.',
  },
  {
    n: '13',
    file: '13-contabilidad',
    cat: 'contabilidad',
    titulo: 'Contabilidad: Compra y Venta',
    desc: 'El comprobante de compra toma la valorización acordada y deduce sus anticipos; el de venta elige los lotes valorizados.',
  },
];

/* El ciclo, paso a paso. */
const CICLO = [
  { n: '01', fase: 'Recepción', titulo: 'Programación de unidades', desc: 'El área comercial programa la llegada con todos sus datos.', img: 'g02-programacion.jpg' },
  { n: '02', fase: 'Recepción', titulo: 'Recepción de unidades', desc: 'Vigilancia registra el ingreso del vehículo pesado y su salida.', img: 'g03-recepcion.jpg' },
  { n: '03', fase: 'Recepción', titulo: 'Recepción de visitas', desc: 'El personal y los vehículos que entran por otros motivos quedan anotados.', img: 'p03-1-porton.jpg' },
  { n: '04', fase: 'Recepción', titulo: 'Balanza', desc: 'Tara, bruto y neto por unidad, con lotes particionados.', img: 'g04-balanza.jpg' },
  { n: '05', fase: 'Recepción', titulo: 'Validación y distribución', desc: 'El lote se reparte en partes, cada una con su vehículo y su guía.', img: 'g05-validacion.jpg' },
  { n: '06', fase: 'Recepción', titulo: 'Guías', desc: 'La guía agrupa los lotes o las partes del mineral recibido.', img: 'g06-guias.jpg' },
  { n: '07', fase: 'Valorización', titulo: 'Cierre de leyes', desc: 'Análisis, laboratorio, ensayo y la ley de cierre acordada.', img: 'g07-leyes.jpg' },
  { n: '08', fase: 'Valorización', titulo: 'Valorización de compra', desc: 'Oro, plata, maquila, precio internacional y penalidades.', img: 'g08-compra.jpg' },
  { n: '09', fase: 'Valorización', titulo: 'Blending', desc: 'La mezcla que llega a las leyes que pide el cliente.', img: 'g09-blending.jpg' },
  { n: '10', fase: 'Despacho', titulo: 'Programación de despachos', desc: 'Toneladas por vehículo, guías y confirmación de llegada.', img: 'g10-despacho.jpg' },
  { n: '11', fase: 'Despacho', titulo: 'Valorización de venta', desc: 'La valorización que manda el cliente, con leyes y precios.', img: 'g11-venta.jpg' },
  { n: '12', fase: 'Contabilidad', titulo: 'Anticipos y contabilidad', desc: 'Cada anticipo con su uso; comprobantes de compra y venta.', img: 'g13-contabilidad.jpg' },
];

const VIDEO_PRINCIPAL = {
  src: 'videos/00-general.mp4',
  titulo: 'ERP COMERCIAL · Menos papel, más control',
  desc: 'El ciclo completo del mineral, de la programación de la unidad al comprobante de venta, en un solo sistema.',
};
