-- Script para actualizar los pesos de las subcategorías
-- Basado en la proporción de preguntas dentro de cada categoría principal
-- ===== COMUNICACIONES =====
UPDATE categories
SET weight = 48
WHERE id = 'coms-procedimientos-generales';
UPDATE categories
SET weight = 20
WHERE id = 'coms-definiciones';
UPDATE categories
SET weight = 17
WHERE id = 'coms-socorro-peligro';
UPDATE categories
SET weight = 12
WHERE id = 'coms-fallo-comunicaciones';
UPDATE categories
SET weight = 2
WHERE id = 'coms-terminos-meteorologicos-vfr';
UPDATE categories
SET weight = 1
WHERE id = 'coms-meteorologia-actual-prevision';
-- ===== CONOCIMIENTO GENERAL DE LA AERONAVE =====
UPDATE categories
SET weight = 45
WHERE id = 'cga-motor-sistemas';
UPDATE categories
SET weight = 38
WHERE id = 'cga-instrumentos-equipos';
UPDATE categories
SET weight = 9
WHERE id = 'cga-helices';
UPDATE categories
SET weight = 9
WHERE id = 'cga-avion';
-- ===== DERECHO AÉREO =====
UPDATE categories
SET weight = 43
WHERE id = 'derecho-aereo-servicio-informacion';
UPDATE categories
SET weight = 28
WHERE id = 'derecho-aereo-aerodromos';
UPDATE categories
SET weight = 14
WHERE id = 'derecho-aereo-aeronavegabilidad';
UPDATE categories
SET weight = 13
WHERE id = 'derecho-aereo-nacionalidad-registro';
UPDATE categories
SET weight = 2
WHERE id = 'derecho-aereo-busqueda-salvamento';
UPDATE categories
SET weight = 0
WHERE id = 'derecho-aereo-investigacion-accidentes';
-- ===== FACTORES HUMANOS =====
UPDATE categories
SET weight = 38
WHERE id = 'factores-h-fisiologia-salud';
UPDATE categories
SET weight = 27
WHERE id = 'factores-h-vuelo-salud';
UPDATE categories
SET weight = 14
WHERE id = 'factores-h-evaluacion-toma-decisiones';
UPDATE categories
SET weight = 12
WHERE id = 'factores-h-personas-medio';
UPDATE categories
SET weight = 10
WHERE id = 'factores-h-comportamiento';
UPDATE categories
SET weight = 0
WHERE id = 'factores-h-memoria';
UPDATE categories
SET weight = 0
WHERE id = 'factores-h-conceptos';
-- ===== METEOROLOGÍA =====
UPDATE categories
SET weight = 37
WHERE id = 'meteorologia-altimetria';
UPDATE categories
SET weight = 14
WHERE id = 'meteorologia-viento';
UPDATE categories
SET weight = 11
WHERE id = 'meteorologia-nubes';
UPDATE categories
SET weight = 9
WHERE id = 'meteorologia-visibilidad';
UPDATE categories
SET weight = 5
WHERE id = 'meteorologia-atmosfera';
UPDATE categories
SET weight = 4
WHERE id = 'meteorologia-densidad';
UPDATE categories
SET weight = 4
WHERE id = 'meteorologia-frentes';
UPDATE categories
SET weight = 4
WHERE id = 'meteorologia-presion-atmosferica';
UPDATE categories
SET weight = 3
WHERE id = 'meteorologia-humedad';
UPDATE categories
SET weight = 3
WHERE id = 'meteorologia-temperatura-aire';
UPDATE categories
SET weight = 2
WHERE id = 'meteorologia-tormentas';
UPDATE categories
SET weight = 2
WHERE id = 'meteorologia-engelamiento';
UPDATE categories
SET weight = 2
WHERE id = 'meteorologia-masas-aire';
UPDATE categories
SET weight = 1
WHERE id = 'meteorologia-estabilidad-atmosferica';
UPDATE categories
SET weight = 0
WHERE id = 'meteorologia-precipitacion';
-- ===== NAVEGACIÓN =====
UPDATE categories
SET weight = 42
WHERE id = 'nav-cartografia';
UPDATE categories
SET weight = 21
WHERE id = 'nav-estima';
UPDATE categories
SET weight = 17
WHERE id = 'nav-direcciones-distancias';
UPDATE categories
SET weight = 9
WHERE id = 'nav-tierra';
UPDATE categories
SET weight = 8
WHERE id = 'nav-planificacion-viajes';
UPDATE categories
SET weight = 3
WHERE id = 'nav-magnetismo-terrestre';
UPDATE categories
SET weight = 2
WHERE id = 'nav-hora';
UPDATE categories
SET weight = 0
WHERE id = 'nav-desorientacion';
-- ===== PERFORMANCE Y PLANIFICACIÓN DE VUELO =====
UPDATE categories
SET weight = 39
WHERE id = 'performance-despegue';
UPDATE categories
SET weight = 19
WHERE id = 'performance-masa-centrado';
UPDATE categories
SET weight = 19
WHERE id = 'performance-definiciones';
UPDATE categories
SET weight = 9
WHERE id = 'performance-en-vuelo';
UPDATE categories
SET weight = 7
WHERE id = 'performance-planificacion-vuelo';
UPDATE categories
SET weight = 6
WHERE id = 'performance-aterrizaje';
UPDATE categories
SET weight = 0
WHERE id = 'performance-maniobras';
-- ===== PRINCIPIOS DE VUELO =====
UPDATE categories
SET weight = 21
WHERE id = 'principios-v-fuerzas-perfil';
UPDATE categories
SET weight = 15
WHERE id = 'principios-v-la-perdida-stall';
UPDATE categories
SET weight = 13
WHERE id = 'principios-v-estabilidad';
UPDATE categories
SET weight = 8
WHERE id = 'principios-v-aproximacion-aterrizaje';
UPDATE categories
SET weight = 7
WHERE id = 'principios-v-limites-operativos';
UPDATE categories
SET weight = 6
WHERE id = 'principios-v-factor-carga';
UPDATE categories
SET weight = 5
WHERE id = 'principios-v-geometria-perfil';
UPDATE categories
SET weight = 5
WHERE id = 'principios-v-velocidades-tas-ias';
UPDATE categories
SET weight = 3
WHERE id = 'principios-v-virajes';
UPDATE categories
SET weight = 3
WHERE id = 'principios-v-deriva-inherente';
UPDATE categories
SET weight = 3
WHERE id = 'principios-v-vuelo';
UPDATE categories
SET weight = 3
WHERE id = 'principios-v-helices';
UPDATE categories
SET weight = 3
WHERE id = 'principios-v-aerodinamica-operacional';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-despegue';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-presion-estatica-dinamica-total';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-atmosfera-estandar';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-empuje-traccion';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-flujo-aire-viscosidad-capa-limite';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-termicas-turbulencias';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-efecto-venturi';
UPDATE categories
SET weight = 1
WHERE id = 'principios-v-el-ala';
UPDATE categories
SET weight = 0
WHERE id = 'principios-v-el-peso';
UPDATE categories
SET weight = 0
WHERE id = 'principios-v-aerodinamica';
-- ===== PROCEDIMIENTOS OPERACIONALES =====
UPDATE categories
SET weight = 57
WHERE id = 'proc-oper-aspectos-generales';
UPDATE categories
SET weight = 20
WHERE id = 'proc-oper-emergencia';
UPDATE categories
SET weight = 14
WHERE id = 'proc-oper-normales';
UPDATE categories
SET weight = 6
WHERE id = 'proc-oper-anormales';
UPDATE categories
SET weight = 2
WHERE id = 'proc-oper-lista-aeronave';
UPDATE categories
SET weight = 1
WHERE id = 'proc-oper-definicion';
-- Verificar las actualizaciones
SELECT c.name as categoria_principal,
    sc.name as subcategoria,
    sc.weight as peso
FROM categories c
    JOIN categories sc ON c.id = sc.parent_category_id
WHERE c.parent_category_id IS NULL
ORDER BY c.name,
    sc.weight DESC;