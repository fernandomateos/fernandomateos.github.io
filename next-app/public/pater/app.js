'use strict';

// ---------- Plan (Nivel 1, 18-oct-2026) ----------

const DIAS_FUERZA = 3;       // días de fuerza por semana

// series: objetivo de cada ejercicio. La hoja del Nivel 1 pedía 2 en todos; Pater hace
// 3 cómodas de sentadilla, flexión y remo, y Nando las fija como punto de partida para
// subir de nivel (21-oct-2026). Abdominales, 2 como la hoja: Pater hace 1.
const EJ = {
  bici:       { nombre: 'Bici o paseo', icono: '🚲', modo: 'minutos' },
  sentadilla: { nombre: 'Sentadillas', icono: '🦵', fuerza: true, series: 3, min: 8, max: 10, pista: 'Con la silla detrás, sin bajar mucho' },
  flexion:    { nombre: 'Flexiones en la mesa', icono: '💪', fuerza: true, series: 3, min: 8, max: 12, pista: 'En la mesa, o en la pared si cuesta' },
  remo:       { nombre: 'Remo con mancuerna', icono: '🏋️', fuerza: true, series: 3, min: 8, max: 12, pista: 'Apoyado en la silla. Cada serie, con los dos brazos', kilos: true },
  abdominal:  { nombre: 'Abdominales en la silla', icono: '🪑', fuerza: true, series: 2, min: 8, max: 12, pista: '' },
  barra:      { nombre: 'Colgarse de la barra', icono: '🙌', modo: 'segundos', pista: 'Agarre cómodo, pies cerca del suelo' }
};
const ORDEN = ['bici', 'sentadilla', 'flexion', 'remo', 'abdominal', 'barra'];

// Lo que Pater hizo antes de tener la app (carta del 20-oct-2026, hora aproximada).
// Apuntado en total, sin series: dice que hubo fuerza ese día, no si se completaron las series.
const PREVIOS = [
  { id: 'carta-2026-10-20-sentadilla', t: Date.parse('2026-10-20T09:00:00+02:00'), tipo: 'sentadilla', reps: 30, completo: true, origen: 'carta' },
  { id: 'carta-2026-10-20-flexion', t: Date.parse('2026-10-20T09:00:01+02:00'), tipo: 'flexion', reps: 30, completo: true, origen: 'carta' },
  { id: 'carta-2026-10-20-remo', t: Date.parse('2026-10-20T09:00:02+02:00'), tipo: 'remo', reps: 24, completo: true, origen: 'carta' }
];
const FUERZA = ORDEN.filter(t => EJ[t].fuerza);

// ---------- Datos en el móvil ----------

const CLAVE = 'pater.v1';

function vacio() {
  return { registros: [], reps: {}, kilos: 0, crono: {}, avisoVeces: 0, instalada: false };
}

function cargar() {
  try {
    const d = JSON.parse(localStorage.getItem(CLAVE));
    if (d && Array.isArray(d.registros)) return Object.assign(vacio(), d);
  } catch (e) {}
  return vacio();
}

let D = cargar();

// Copia intacta del historial tal como estaba antes de esta versión, por si hiciera falta revisarlo.
try {
  const COPIA = CLAVE + '.copia-2026-10-21';
  const antes = localStorage.getItem(CLAVE);
  if (antes && !localStorage.getItem(COPIA)) localStorage.setItem(COPIA, antes);
} catch (e) {}

if (!D.previos) {
  const hay = new Set(D.registros.map(r => r.id));
  D.registros = D.registros.concat(PREVIOS.filter(r => !hay.has(r.id))).sort((a, b) => a.t - b.t);
  D.previos = true;
  guardar();
}

function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(D)); } catch (e) {}
}

function apuntar(r) {
  r.id = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  r.t = Date.now();
  D.registros.push(r);
  guardar();
  pedirPersistencia();
  return r;
}

let persistenciaPedida = false;
function pedirPersistencia() {
  if (persistenciaPedida) return;
  persistenciaPedida = true;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
}

// ---------- Fechas ----------

const DIA = 864e5;

function inicioDia(t) { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
function masDias(t, n) { const d = new Date(t); d.setDate(d.getDate() + n); return d.getTime(); }
function inicioSemana(t) { const d = new Date(inicioDia(t)); return masDias(d.getTime(), -((d.getDay() + 6) % 7)); }
function mismoDia(a, b) { return inicioDia(a) === inicioDia(b); }
function ddmm(t) { const d = new Date(t); return d.getDate() + '/' + (d.getMonth() + 1); }
function hora(t) { return new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); }
function cuando(t) {
  const hoy = inicioDia(Date.now());
  if (mismoDia(t, hoy)) return 'hoy a las ' + hora(t);
  if (mismoDia(t, masDias(hoy, -1))) return 'ayer a las ' + hora(t);
  return 'el ' + new Date(t).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) + ' a las ' + hora(t);
}
function diaLargo(t) { return new Date(t).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }); }

// ---------- Consultas ----------

function delDia(t) { return D.registros.filter(r => mismoDia(r.t, t)); }
function entre(desde, hasta) { return D.registros.filter(r => r.t >= desde && r.t < hasta); }
function deHoy(tipo) { return delDia(Date.now()).filter(r => r.tipo === tipo); }

// Procedencia: lo copiado de la carta no tiene series; lo demás se guardó con los botones.
// Los registros antiguos de la carta no llevan "origen", pero sí "completo" y su id.
function deCarta(r) { return r.origen === 'carta' || r.completo === true || String(r.id).startsWith('carta-'); }
function deApp(rs) { return rs.filter(r => !deCarta(r)); }
// Un apunte de la carta se solapa si ese mismo día y ejercicio hay series guardadas en la app:
// puede ser la misma actividad contada dos veces. No se suma y se señala para revisar.
function solapada(r) {
  return deCarta(r) && D.registros.some(o => o.tipo === r.tipo && !deCarta(o) && mismoDia(o.t, r.t));
}
function contables(rs) { return rs.filter(r => !solapada(r)); }

function series(rs) { return deApp(rs).length; }
// Completo solo con las series del objetivo de ese ejercicio guardadas una a una.
function completa(tipo, rs) { return series(rs) >= EJ[tipo].series; }
function hecho(tipo) {
  const rs = deHoy(tipo);
  if (!EJ[tipo].fuerza) return rs.length > 0;
  return completa(tipo, rs) || (rs.length > 0 && rs.every(deCarta));
}
function listaReps(rs) { return deApp(rs).map(r => r.reps).join(' + '); }
function hizoFuerza(t) { return delDia(t).some(r => EJ[r.tipo] && EJ[r.tipo].fuerza); }

// Fuerza toca si esta semana lleva menos de 3 días y ayer no hubo fuerza.
// Si hoy ya empezó la fuerza, sigue tocando hasta terminarla.
function tocaFuerza() {
  const hoy = inicioDia(Date.now());
  if (hizoFuerza(hoy)) return true;
  let dias = 0;
  for (let d = inicioSemana(hoy); d < hoy; d = masDias(d, 1)) if (hizoFuerza(d)) dias++;
  return dias < DIAS_FUERZA && !hizoFuerza(masDias(hoy, -1));
}

function planHoy() { return tocaFuerza() ? ORDEN : ['bici', 'barra']; }
function siguiente(salvo) { return planHoy().find(t => t !== salvo && !hecho(t)); }

function estadoHoy(tipo) {
  const rs = deHoy(tipo);
  if (!rs.length) return '';
  if (tipo === 'bici') return '✓ ' + rs.reduce((s, r) => s + r.min, 0) + ' min';
  if (tipo === 'barra') return '✓ ' + Math.max(...rs.map(r => r.seg)) + ' s';
  const n = series(rs);
  if (!n) return '✓ ' + rs.reduce((s, r) => s + r.reps, 0) + ' rep. (carta)';
  return (completa(tipo, rs) ? '✓ ' : '') + n + ' de ' + EJ[tipo].series;
}

function describir(r) {
  const e = EJ[r.tipo];
  if (r.tipo === 'bici') return e.icono + ' ' + e.nombre + ': ' + r.min + ' minutos';
  if (r.tipo === 'barra') return e.icono + ' ' + e.nombre + ': ' + r.seg + ' segundos';
  if (deCarta(r)) return e.icono + ' ' + e.nombre + ': ' + r.reps + ' repeticiones en total, apuntadas de la carta';
  return e.icono + ' ' + e.nombre + ': una serie de ' + r.reps + ' repeticiones' + (r.kg ? ' con ' + kg(r.kg) : '');
}

function faltan(tipo) {
  const n = EJ[tipo].series - series(deHoy(tipo));
  if (n <= 0) return 'Ya están las ' + EJ[tipo].series + ' series de hoy';
  return n === 1 ? 'Te falta 1 serie' : 'Te faltan ' + n + ' series';
}

function kg(n) { return String(n).replace('.', ',') + ' kg'; }

// ---------- Pantallas ----------

const app = document.getElementById('app');
let estado = {};   // estado de la pantalla abierta

// Desde el inicio se abre encima; entre pantallas se sustituye.
// Así el botón atrás de Android siempre vuelve al inicio.
function ir(destino) {
  if (!destino) {
    if (history.state && history.state.desdeInicio) history.back();
    else { history.replaceState(null, '', '#/'); pintar(); }
    return;
  }
  const url = '#/' + destino;
  if (ruta() === 'inicio') history.pushState({ desdeInicio: true }, '', url);
  else history.replaceState({ desdeInicio: true }, '', url);
  pintar();
}
function ruta() { return location.hash.replace(/^#\/?/, '') || 'inicio'; }

function pintar() {
  const r = ruta();
  if (r !== estado.ruta) estado = { ruta: r };
  if (EJ[r] && EJ[r].fuerza) app.innerHTML = vistaFuerza(r);
  else if (EJ[r]) app.innerHTML = vistaReloj(r);
  else if (r === 'progreso') app.innerHTML = vistaProgreso();
  else if (r === 'enviar') app.innerHTML = vistaEnviar();
  else app.innerHTML = vistaInicio();
  tic();
  window.scrollTo(0, 0);
  recargarSiToca();
}

function volver() { return '<button class="volver" data-accion="inicio">← Volver</button>'; }

function boton(texto, accion, clase, extra) {
  return '<button class="boton ' + (clase || '') + '" data-accion="' + accion + '"' + (extra || '') + '>' + texto + '</button>';
}

function vistaInicio() {
  const fuerza = tocaFuerza();
  const sig = siguiente();
  let h = '<h1 class="saludo">¡Hola, Pater!</h1>';
  h += '<p class="toca">' + (fuerza ? 'Hoy toca fuerza 💪' : 'Hoy toca bici o paseo y colgarte de la barra') + '</p>';

  for (const t of ['bici', 'barra']) {
    if (D.crono[t]) {
      h += '<div class="marcha">⏱ ' + EJ[t].nombre + ': en marcha, <span data-reloj="' + t + '"></span>' +
        boton('Ver el reloj', 'abrir', 'centro', ' data-tipo="' + t + '"') + '</div>';
    }
  }

  if (sig) {
    const e = EJ[sig];
    h += '<div class="ahora"><p class="etiqueta">AHORA</p>' +
      '<p class="que">' + e.icono + ' ' + e.nombre + '</p>' +
      (e.fuerza ? '<p class="cuanto">' + e.series + ' series de ' + e.min + ' a ' + e.max + '</p>' : '') +
      boton('▶ Vamos', 'abrir', 'verde centro grande', ' data-tipo="' + sig + '"') + '</div>';
  } else {
    h += '<div class="ahora fin"><p class="que">¡Hoy está todo hecho, Pater! 🎉</p></div>';
  }

  h += '<p class="seccion">Lo de hoy:</p>';
  for (const t of ORDEN) {
    const e = EJ[t];
    h += '<button class="boton' + (hecho(t) ? ' hecho' : '') + '" data-accion="abrir" data-tipo="' + t + '">' +
      '<span class="icono">' + e.icono + '</span><span class="nombre">' + e.nombre + '</span>' +
      '<span class="estado">' + estadoHoy(t) + '</span></button>';
  }
  h += '<div style="height:12px"></div>';
  h += boton('<span class="icono">⭐</span><span class="nombre">Mi progreso</span>', 'progreso');
  h += boton('<span class="icono">📤</span><span class="nombre">Enviar a Nando</span>', 'enviar');
  h += boton('↩ Deshacer último registro', 'deshacer', 'claro centro');
  return h;
}

// --- Fuerza ---

// Lo que acaba de guardarse: se queda a la vista hasta salir de la pantalla.
function confirmacion(tipo) {
  const r = D.registros.find(x => x.id === estado.guardada);
  if (!r) return '';
  const hoy = deApp(deHoy(tipo));
  const n = hoy.indexOf(r) + 1;
  return '<div class="guardada" role="status"><p class="g1">✓ Guardada la serie ' + n + ' de ' + EJ[tipo].series + '</p>' +
    '<p class="g2">' + r.reps + ' repeticiones' + (r.kg ? ' con ' + kg(r.kg) : '') + '</p>' +
    '<p class="g3">' + faltan(tipo) + '</p></div>';
}

// Las series de hoy, una por línea, cada una con su arreglo.
function seriesDeHoy(tipo) {
  const hoy = deApp(deHoy(tipo));
  if (!hoy.length) return '';
  let h = '<div class="series-hoy"><p class="suma">Hoy: ' + listaReps(hoy) + '</p>';
  hoy.forEach((r, i) => {
    h += '<div class="fila-serie"><span>Serie ' + (i + 1) + ': <b>' + r.reps + '</b>' + (r.kg ? ' · ' + kg(r.kg) : '') + '</span>' +
      '<button data-accion="corregir" data-id="' + r.id + '">Cambiar</button>' +
      '<button data-accion="quitar" data-id="' + r.id + '">Borrar</button></div>';
  });
  return h + '<p class="nota">¿Te has equivocado? Cambia el número de esa serie; no la guardes otra vez.</p></div>';
}

function vistaFuerza(tipo) {
  const e = EJ[tipo];
  if (estado.listo) {
    const r = D.registros.find(x => x.id === estado.guardada);
    return vistaListo(tipo, 'Guardada la serie ' + e.series + ' de ' + e.series + (r ? ': ' + r.reps + ' repeticiones' : ''),
      e.nombre + ' de hoy: ' + listaReps(deHoy(tipo)), boton('Ver o corregir las series', 'ver-series', 'claro centro'));
  }
  if (estado.reps == null) estado.reps = D.reps[tipo] || 10;
  const hoy = deHoy(tipo);
  const n = series(hoy) + 1;
  let h = volver();
  h += '<h1>' + e.icono + ' ' + e.nombre + '</h1>';
  if (e.pista) h += '<p class="pista">' + e.pista + '</p>';
  h += confirmacion(tipo);
  h += '<p class="serie">' + (completa(tipo, hoy) ? 'Hoy ya están las ' + e.series + ' series ✓<br>Si haces otra, es de propina' : 'Ahora: serie ' + n + ' de ' + e.series) + '</p>';
  h += '<p class="objetivo">' + e.series + ' series de ' + e.min + ' a ' + e.max + ' repeticiones</p>';
  h += '<p class="rotulo">Repeticiones de esta serie<small>Solo las de esta serie, no las de todo el ejercicio</small></p>';
  h += '<div class="contador"><button data-accion="reps" data-paso="-1" aria-label="Menos">−</button>' +
    '<span class="valor">' + estado.reps + '</span>' +
    '<button data-accion="reps" data-paso="1" aria-label="Más">+</button></div>';
  if (e.kilos) {
    h += '<p class="rotulo">Kilos de la mancuerna<small>Si no lo sabes, déjalo en 0</small></p>';
    h += '<div class="contador"><button data-accion="kilos" data-paso="-0.5" aria-label="Menos kilos">−</button>' +
      '<span class="valor">' + String(D.kilos).replace('.', ',') + '</span>' +
      '<button data-accion="kilos" data-paso="0.5" aria-label="Más kilos">+</button></div>';
  }
  h += boton('✓ Guardar esta serie', 'serie', 'verde centro grande', ' data-tipo="' + tipo + '"');
  h += '<p class="ayuda">Pulsa una vez cada vez que acabes una serie. Ejemplo: 3 series de 10 son poner 10 y pulsar al acabar cada serie, 3 veces en total.</p>';
  h += seriesDeHoy(tipo);
  return h;
}

function vistaListo(tipo, detalle, extra, mas) {
  const sig = siguiente(tipo);
  let h = '<div class="listo"><div class="marca">✓</div><h1>¡Muy bien, Pater!</h1>' +
    '<p class="detalle">' + detalle + '</p>' + (extra ? '<p class="extra">' + extra + '</p>' : '') + '</div>';
  if (sig) h += boton('▶ Ahora: ' + EJ[sig].icono + ' ' + EJ[sig].nombre, 'abrir', 'verde grande', ' data-tipo="' + sig + '"');
  else h += '<p class="detalle" style="text-align:center">¡Hoy está todo hecho! 🎉</p>';
  h += mas || '';
  h += boton('Al inicio', 'inicio', 'claro centro');
  return h;
}

// --- Reloj (bici y barra) ---

function vistaReloj(tipo) {
  const e = EJ[tipo];
  if (estado.listo) return vistaListo(tipo, estado.detalle, estado.extra);
  let h = volver();
  h += '<h1>' + e.icono + ' ' + e.nombre + '</h1>';
  if (e.pista) h += '<p class="pista">' + e.pista + '</p>';
  if (estado.manual) {
    h += '<p class="rotulo">¿Cuántos minutos?</p>';
    h += '<input class="minutos" id="minutos" type="number" inputmode="numeric" min="1" max="600" placeholder="0">';
    h += boton('✓ Guardar', 'guardar-minutos', 'verde centro grande');
    h += boton('Cancelar', 'cancelar-manual', 'claro centro');
    return h;
  }
  h += '<div class="reloj" data-reloj="' + tipo + '">' + (tipo === 'barra' ? '0' : '0:00') + '</div>';
  h += '<p class="reloj-unidad">' + (tipo === 'barra' ? 'segundos' : 'minutos : segundos') + '</p>';
  if (D.crono[tipo]) h += boton('■ Parar', 'parar', 'rojo centro grande', ' data-tipo="' + tipo + '"');
  else h += boton('▶ Empezar', 'empezar', 'verde centro grande', ' data-tipo="' + tipo + '"');
  if (tipo === 'bici' && !D.crono[tipo]) h += boton('✎ Escribir los minutos', 'manual', 'claro centro');
  return h;
}

function textoReloj(tipo) {
  const ms = Math.max(0, Date.now() - D.crono[tipo]);
  const s = Math.floor(ms / 1000);
  if (tipo === 'barra') return String(s);
  const hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = String(s % 60).padStart(2, '0');
  return hh ? hh + ':' + String(mm).padStart(2, '0') + ':' + ss : mm + ':' + ss;
}

function tic() {
  document.querySelectorAll('[data-reloj]').forEach(el => {
    const t = el.dataset.reloj;
    if (D.crono[t]) el.textContent = textoReloj(t);
  });
}
setInterval(tic, 250);

// --- Progreso ---

function semanas() {
  const ahora = inicioSemana(Date.now());
  const primera = D.registros.length ? inicioSemana(Math.min(...D.registros.map(r => r.t))) : ahora;
  const lista = [];
  for (let s = ahora; s >= primera && lista.length < 8; s = masDias(s, -7)) lista.unshift(s);
  return lista;
}

function vistaProgreso() {
  const rs = D.registros;
  const dias = new Set(rs.map(r => inicioDia(r.t))).size;
  const minutos = rs.filter(r => r.tipo === 'bici').reduce((s, r) => s + r.min, 0);
  const colgadas = rs.filter(r => r.tipo === 'barra').map(r => r.seg);
  const mejor = colgadas.length ? Math.max(...colgadas) : 0;
  const reps = contables(rs).filter(r => EJ[r.tipo].fuerza).reduce((s, r) => s + r.reps, 0);

  let h = volver() + '<h1>⭐ Mi progreso</h1>';
  h += '<div class="mensaje">' + animo(dias, minutos, mejor, reps) + '</div>';
  h += '<div class="cifras">' +
    cifra(dias, dias === 1 ? 'día con ejercicio' : 'días con ejercicio') +
    cifra(minutos, 'minutos de bici o paseo') +
    cifra(mejor + ' s', 'mejor colgada') +
    cifra(reps, 'repeticiones') + '</div>';

  const ss = semanas();
  const porSemana = f => ss.map(s => f(entre(s, masDias(s, 7))));
  h += '<h2>Minutos de bici o paseo por semana</h2>' +
    grafica(ss, porSemana(x => x.filter(r => r.tipo === 'bici').reduce((s, r) => s + r.min, 0)), 'minutos');
  h += '<h2>Repeticiones por semana</h2>' +
    grafica(ss, porSemana(x => contables(x).filter(r => EJ[r.tipo].fuerza).reduce((s, r) => s + r.reps, 0)), 'repeticiones');
  h += '<h2>Mejor colgada de cada semana</h2>' +
    grafica(ss, porSemana(x => x.filter(r => r.tipo === 'barra').reduce((m, r) => Math.max(m, r.seg), 0)), 'segundos');
  h += boton('Al inicio', 'inicio', 'claro centro');
  return h;
}

function cifra(num, txt) {
  return '<div class="cifra"><div class="num">' + num + '</div><div class="txt">' + txt + '</div></div>';
}

function animo(dias, minutos, mejor, reps) {
  if (!dias) return '¡Hoy es un buen día para empezar, Pater!';
  const frases = ['¡Muy bien! Ya llevas ' + dias + (dias === 1 ? ' día' : ' días') + ' de ejercicio'];
  if (minutos) frases.push('¡Qué constancia! Ya llevas ' + minutos + ' minutos de bici o paseo');
  if (reps) frases.push('¡Qué fuerza! Ya llevas ' + reps + ' repeticiones');
  if (mejor) frases.push('¡Bravo! Tu mejor colgada es de ' + mejor + ' segundos');
  const fuerzaSemana = new Set(entre(inicioSemana(Date.now()), Date.now() + DIA).filter(r => EJ[r.tipo].fuerza).map(r => inicioDia(r.t))).size;
  if (fuerzaSemana) frases.push('¡Vas muy bien! Esta semana llevas ' + fuerzaSemana + (fuerzaSemana === 1 ? ' día' : ' días') + ' de fuerza');
  return frases[Math.floor(Math.random() * frases.length)];
}

// Gráfica de barras: eje horizontal = semana (empieza el lunes), eje vertical = unidad.
function grafica(ss, valores, unidad) {
  const W = 340, H = 230, izq = 44, der = 8, arriba = 30, abajo = 50;
  const ancho = W - izq - der, alto = H - arriba - abajo;
  const tope = Math.max(1, ...valores);
  const hueco = ancho / ss.length;
  const barra = Math.min(48, hueco * 0.6);
  const y = v => arriba + alto - (v / tope) * alto;
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + unidad + ' por semana">';
  s += '<text x="' + izq + '" y="16" font-size="14" font-weight="700" fill="#3d3d3d">' + unidad + ' ↑</text>';
  s += '<line x1="' + izq + '" y1="' + y(tope) + '" x2="' + (W - der) + '" y2="' + y(tope) + '" stroke="#dde2e8" stroke-width="1"/>';
  s += '<text x="' + (izq - 6) + '" y="' + (y(tope) + 5) + '" font-size="14" text-anchor="end" fill="#3d3d3d">' + tope + '</text>';
  s += '<text x="' + (izq - 6) + '" y="' + (y(0) + 5) + '" font-size="14" text-anchor="end" fill="#3d3d3d">0</text>';
  ss.forEach((sem, i) => {
    const v = valores[i];
    const cx = izq + hueco * i + hueco / 2;
    if (v > 0) {
      const top = y(v), hb = arriba + alto - top, r = Math.min(4, hb);
      s += '<path d="M' + (cx - barra / 2) + ',' + (arriba + alto) + ' V' + (top + r) + ' q0,-' + r + ' ' + r + ',-' + r +
        ' H' + (cx + barra / 2 - r) + ' q' + r + ',0 ' + r + ',' + r + ' V' + (arriba + alto) + ' Z" fill="#0b3d91"/>';
      s += '<text x="' + cx + '" y="' + (top - 6) + '" font-size="15" font-weight="700" text-anchor="middle" fill="#111">' + v + '</text>';
    }
    s += '<text x="' + cx + '" y="' + (arriba + alto + 20) + '" font-size="14" text-anchor="middle" fill="#3d3d3d">' + ddmm(sem) + '</text>';
  });
  s += '<line x1="' + izq + '" y1="' + (arriba + alto) + '" x2="' + (W - der) + '" y2="' + (arriba + alto) + '" stroke="#3d3d3d" stroke-width="1.5"/>';
  s += '<text x="' + (izq + ancho / 2) + '" y="' + (H - 8) + '" font-size="14" text-anchor="middle" fill="#3d3d3d">semana que empieza el lunes →</text>';
  return '<div class="grafica">' + s + '</svg></div>';
}

// --- Resumen para Nando ---

function resumen(desde) {
  const hasta = masDias(desde, 7);
  const rs = entre(desde, hasta);
  const de = t => rs.filter(r => r.tipo === t);
  const diasDe = list => new Set(list.map(r => inicioDia(r.t))).size;
  const plural = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const fin = masDias(desde, 6);
  const mismoMes = new Date(desde).getMonth() === new Date(fin).getMonth();
  const l = ['Hola, Nando. Mi ejercicio de la semana del ' + (mismoMes ? new Date(desde).getDate() : diaLargo(desde)) +
    ' al ' + diaLargo(fin) + ':', ''];

  const bici = de('bici');
  l.push('🚲 Bici o paseo: ' + plural(diasDe(bici), 'día', 'días') + ', ' + bici.reduce((s, r) => s + r.min, 0) + ' minutos');
  const barra = de('barra');
  l.push('🙌 Colgarse: ' + plural(barra.length, 'vez', 'veces') + (barra.length ? ', la mejor de ' + Math.max(...barra.map(r => r.seg)) + ' segundos' : ''));
  const corto = d => new Date(d).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }).replace('.', '');
  const revisar = [];
  let hayCarta = false;
  for (const t of FUERZA) {
    const e = EJ[t];
    const x = de(t);
    l.push('');
    if (!x.length) { l.push(e.icono + ' ' + e.nombre + ': nada esta semana'); continue; }
    const app = deApp(x);
    const kilos = app.filter(r => r.kg).map(r => r.kg);
    l.push(e.icono + ' ' + e.nombre + ' (objetivo ' + e.series + ' series de ' + e.min + '-' + e.max + ')' +
      (kilos.length ? ', ' + kg(Math.max(...kilos)) : '') + ':');
    for (const d of [...new Set(x.map(r => inicioDia(r.t)))].sort((a, b) => a - b)) {
      const delD = x.filter(r => mismoDia(r.t, d));
      const enApp = deApp(delD);
      if (enApp.length) {
        l.push('· ' + corto(d) + ': ' + listaReps(enApp) + (enApp.length >= e.series ? ' ✓' : ' (' + enApp.length + ' de ' + e.series + ')'));
      }
      for (const c of delD.filter(deCarta)) {
        hayCarta = true;
        if (solapada(c)) {
          revisar.push(corto(d) + ', ' + e.nombre.toLowerCase() + ': la carta dice ' + c.reps + ' en total y en la app hay ' +
            listaReps(enApp) + '. No los sumo.');
        } else {
          l.push('· ' + corto(d) + ': ' + c.reps + ' en total, de la carta (sin series)');
        }
      }
    }
  }

  let completos = 0, soloCarta = 0;
  for (let d = desde; d < hasta; d = masDias(d, 1)) {
    const delD = t => rs.filter(r => r.tipo === t && mismoDia(r.t, d));
    if (FUERZA.every(t => completa(t, delD(t)))) completos++;
    else if (FUERZA.some(t => delD(t).length) && FUERZA.every(t => delD(t).every(deCarta))) soloCarta++;
  }
  l.push('');
  l.push('Fuerza con todas las series: ' + plural(completos, 'día', 'días') + ' de ' + DIAS_FUERZA + (completos >= DIAS_FUERZA ? ' ✓' : ''));
  if (soloCarta) l.push('Fuerza apuntada solo desde la carta, sin series: ' + plural(soloCarta, 'día', 'días'));
  l.push('Días con ejercicio: ' + diasDe(rs));
  if (revisar.length) {
    l.push('');
    l.push('⚠ Para revisar (puede estar repetido):');
    revisar.forEach(t => l.push('· ' + t));
  }
  if (hayCarta) {
    l.push('');
    l.push('"De la carta": lo que conté por carta y se apuntó a mano, en total. Lo demás lo guardé con los botones, serie a serie.');
  }
  return l.join('\n');
}

function vistaEnviar() {
  const esta = inicioSemana(Date.now());
  const desde = estado.pasada ? masDias(esta, -7) : esta;
  estado.texto = resumen(desde);
  let h = volver() + '<h1>📤 Enviar a Nando</h1>';
  h += '<div class="resumen">' + estado.texto + '</div>';
  h += boton('📤 Enviar por WhatsApp', 'compartir', 'verde centro grande');
  h += boton('Copiar el texto', 'copiar', 'claro centro');
  h += '<button class="enlace" data-accion="semana">' + (estado.pasada ? 'Ver esta semana' : 'Ver la semana pasada') + '</button>';
  return h;
}

// ---------- Ventanas ----------

const capa = document.getElementById('capa');

function abrirVentana(html) { capa.innerHTML = '<div class="ventana">' + html + '</div>'; capa.hidden = false; }
function cerrarVentana() { capa.hidden = true; capa.innerHTML = ''; }

// Deshacer solo toca lo guardado con los botones; lo de la carta lo revisa Nando.
function ultimoDeApp() {
  return deApp(D.registros).reduce((u, r) => (!u || r.t > u.t ? r : u), null);
}

function preguntarDeshacer() {
  const r = ultimoDeApp();
  if (!r) { avisar('No hay nada que deshacer'); return; }
  pedirBorrar(r);
}

function pedirBorrar(r) {
  estado.borrar = r.id;
  abrirVentana('<h1>¿Borrar esto?</h1><p class="borrar">' + describir(r) + '<br><small>' + cuando(r.t) + '</small></p>' +
    boton('Sí, borrar', 'borrar', 'rojo centro') + boton('No', 'cerrar', 'centro'));
}

function ventanaCorregir() {
  const c = estado.corrigiendo;
  const r = D.registros.find(x => x.id === c.id);
  const n = deApp(deHoy(r.tipo)).indexOf(r) + 1;
  abrirVentana('<h1>Cambiar la serie ' + n + '</h1><p>' + EJ[r.tipo].nombre + '. Pon las repeticiones que hiciste en esa serie.</p>' +
    '<div class="contador"><button data-accion="reps-corregir" data-paso="-1" aria-label="Menos">−</button>' +
    '<span class="valor">' + c.reps + '</span>' +
    '<button data-accion="reps-corregir" data-paso="1" aria-label="Más">+</button></div>' +
    boton('✓ Guardar el cambio', 'guardar-cambio', 'verde centro') + boton('Cancelar', 'cerrar', 'claro centro'));
}

function guardarSerie(tipo) {
  const r = { tipo, reps: estado.reps, origen: 'app' };
  if (EJ[tipo].kilos && D.kilos > 0) r.kg = D.kilos;
  D.reps[tipo] = estado.reps;
  const antes = hecho(tipo);
  apuntar(r);
  estado.guardada = r.id;
  callar();
  if (!antes && hecho(tipo)) estado.listo = true;
  pintar();
}

let avisoTimer;
function callar() { clearTimeout(avisoTimer); document.getElementById('aviso').hidden = true; }
function avisar(texto) {
  const el = document.getElementById('aviso');
  el.textContent = texto;
  el.hidden = false;
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

// ---------- Acciones ----------

function abrirEjercicio(tipo) {
  estado = { ruta: tipo };
  if (ruta() === tipo) pintar(); else ir(tipo);
}

const acciones = {
  inicio() { cerrarVentana(); if (ruta() === 'inicio') pintar(); else ir(''); },
  abrir(el) { abrirEjercicio(el.dataset.tipo); },
  progreso() { ir('progreso'); },
  enviar() { ir('enviar'); },
  deshacer: preguntarDeshacer,
  cerrar: cerrarVentana,
  borrar() {
    const i = D.registros.findIndex(r => r.id === estado.borrar);
    if (i >= 0 && !deCarta(D.registros[i])) {
      if (estado.guardada === estado.borrar) estado.guardada = null;
      D.registros.splice(i, 1);
      guardar();
      avisar('Borrado');
    }
    estado.borrar = null;
    cerrarVentana();
    pintar();
  },
  quitar(el) {
    const r = D.registros.find(x => x.id === el.dataset.id);
    if (r) pedirBorrar(r);
  },
  corregir(el) {
    const r = D.registros.find(x => x.id === el.dataset.id);
    if (!r) return;
    estado.corrigiendo = { id: r.id, reps: r.reps };
    ventanaCorregir();
  },
  'reps-corregir'(el) {
    const c = estado.corrigiendo;
    c.reps = Math.min(50, Math.max(1, c.reps + Number(el.dataset.paso)));
    ventanaCorregir();
  },
  'guardar-cambio'() {
    const c = estado.corrigiendo;
    const r = c && D.registros.find(x => x.id === c.id);
    if (r) {
      r.reps = c.reps;
      r.corregido = Date.now();
      D.reps[r.tipo] = estado.reps = c.reps;   // la siguiente serie parte del número bueno
      guardar();
      estado.guardada = r.id;
    }
    estado.corrigiendo = null;
    cerrarVentana();
    pintar();
  },
  'ver-series'() { estado.listo = false; pintar(); },
  'serie-grande'(el) { cerrarVentana(); guardarSerie(el.dataset.tipo); },
  reps(el) {
    estado.reps = Math.min(50, Math.max(1, estado.reps + Number(el.dataset.paso)));
    pintar();
  },
  kilos(el) {
    D.kilos = Math.min(40, Math.max(0, D.kilos + Number(el.dataset.paso)));
    guardar();
    pintar();
  },
  serie(el) {
    const tipo = el.dataset.tipo, e = EJ[tipo];
    // Dos toques seguidos no son dos series: nadie acaba una serie en 3 segundos.
    const ultimo = deApp(deHoy(tipo)).pop();
    if (ultimo && Date.now() - ultimo.t < 3000) { avisar('Ya estaba guardada. Pulsa al acabar la siguiente serie'); return; }
    // Muchas más de las que pide una serie suele ser el total de todo el ejercicio: se pregunta, no se impide.
    if (estado.reps > e.max + Math.ceil(e.max / 2)) {
      abrirVentana('<h1>¿' + estado.reps + ' repeticiones en una sola serie?</h1>' +
        '<p>Este número es para <b>una serie</b>. Si hiciste, por ejemplo, 2 series de ' + Math.round(estado.reps / 2) +
        ', guarda ' + Math.round(estado.reps / 2) + ' ahora y otra vez ' + Math.round(estado.reps / 2) + ' después.</p>' +
        boton('No, cambiar el número', 'cerrar', 'verde centro') +
        boton('Sí, fueron ' + estado.reps + ' seguidas', 'serie-grande', 'claro centro', ' data-tipo="' + tipo + '"'));
      return;
    }
    guardarSerie(tipo);
  },
  empezar(el) {
    D.crono[el.dataset.tipo] = Date.now();
    guardar();
    pintar();
  },
  parar(el) {
    const tipo = el.dataset.tipo;
    const ms = Date.now() - D.crono[tipo];
    delete D.crono[tipo];
    guardar();
    if (tipo === 'bici') {
      const min = Math.round(ms / 60000);
      if (min < 1) { avisar('Menos de un minuto: no lo he apuntado'); pintar(); return; }
      apuntar({ tipo, min });
      Object.assign(estado, { listo: true, detalle: min + ' minutos de bici o paseo', extra: '' });
    } else {
      const seg = Math.floor(ms / 1000);  // lo mismo que marca el reloj
      if (seg < 1) { avisar('Menos de un segundo: no lo he apuntado'); pintar(); return; }
      const antes = D.registros.filter(r => r.tipo === 'barra').map(r => r.seg);
      apuntar({ tipo, seg });
      const extra = !antes.length ? '¡Tu primera colgada apuntada!' : seg > Math.max(...antes) ? '¡Tu mejor marca!' : '';
      Object.assign(estado, { listo: true, detalle: seg + ' segundos colgado', extra });
    }
    pintar();
  },
  manual() { estado.manual = true; pintar(); const i = document.getElementById('minutos'); if (i) i.focus(); },
  'cancelar-manual'() { estado.manual = false; pintar(); },
  'guardar-minutos'() {
    const min = Math.round(Number(document.getElementById('minutos').value));
    if (!(min >= 1 && min <= 600)) { avisar('Escribe los minutos, por ejemplo 30'); return; }
    apuntar({ tipo: 'bici', min });
    Object.assign(estado, { manual: false, listo: true, detalle: min + ' minutos de bici o paseo', extra: '' });
    pintar();
  },
  async compartir() {
    const texto = estado.texto;
    if (navigator.share) {
      try { await navigator.share({ text: texto }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    location.href = 'https://wa.me/?text=' + encodeURIComponent(texto);
  },
  async copiar() {
    try { await navigator.clipboard.writeText(estado.texto); avisar('✓ Copiado. Pégalo en WhatsApp'); }
    catch (e) { avisar('No se ha podido copiar'); }
  },
  semana() { estado.pasada = !estado.pasada; pintar(); },
  instalar: instalar,
  'instalar-no'() { cerrarVentana(); }
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-accion]');
  if (!el) return;
  const f = acciones[el.dataset.accion];
  if (f) f(el);
});

capa.addEventListener('click', e => { if (e.target === capa) cerrarVentana(); });

window.addEventListener('popstate', () => { cerrarVentana(); pintar(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && !estado.listo && !estado.manual) pintar(); });

// ---------- Poner en la pantalla de inicio ----------

let promesaInstalar = null;

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); promesaInstalar = e; });
window.addEventListener('appinstalled', () => { D.instalada = true; guardar(); cerrarVentana(); });

function enPantallaDeInicio() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function ofrecerInstalar() {
  if (enPantallaDeInicio()) { if (!D.instalada) { D.instalada = true; guardar(); } return; }
  if (D.instalada || D.avisoVeces >= 3) return;
  D.avisoVeces++;
  guardar();
  abrirVentana('<p class="grande-icono">📲</p><h1>Pon el ejercicio en tu pantalla de inicio</h1>' +
    '<p>Así lo abres con un toque, como WhatsApp.</p>' +
    boton('Poner en mi pantalla de inicio', 'instalar', 'verde centro') +
    boton('Ahora no', 'instalar-no', 'claro centro'));
}

async function instalar() {
  if (promesaInstalar) {
    const p = promesaInstalar;
    promesaInstalar = null;
    p.prompt();
    try {
      const r = await p.userChoice;
      if (r.outcome === 'accepted') { D.instalada = true; guardar(); cerrarVentana(); avisar('✓ Listo'); return; }
    } catch (e) {}
    cerrarVentana();
    return;
  }
  abrirVentana('<h1>Así se hace</h1><ol>' +
    '<li>Toca los <b>tres puntos ⋮</b> de arriba a la derecha.</li>' +
    '<li>Si sale <b>"Abrir en Chrome"</b>, tócalo y vuelve a tocar los tres puntos ⋮.</li>' +
    '<li>Toca <b>"Añadir a pantalla de inicio"</b> o <b>"Instalar aplicación"</b>.</li>' +
    '<li>Toca <b>"Añadir"</b> o <b>"Instalar"</b>.</li></ol>' +
    boton('Entendido', 'cerrar', 'centro'));
}

// ---------- Arranque ----------

// Si llega una versión nueva, se recarga al volver al inicio, nunca a mitad de una serie.
// Recargar no borra nada: los registros están en localStorage.
var versionNueva = false;
function recargarSiToca() {
  if (versionNueva && ruta() === 'inicio' && capa.hidden) { versionNueva = false; location.reload(); }
}

if ('serviceWorker' in navigator) {
  const habiaVersion = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!habiaVersion) return;
    versionNueva = true;
    recargarSiToca();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {});
  });
}

pintar();
setTimeout(ofrecerInstalar, 600);
