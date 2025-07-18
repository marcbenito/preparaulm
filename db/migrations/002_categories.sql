INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'derecho-aereo-aeronavegabilidad',
        'Aeronavegabilidad',
        '- Definiciones
- Certificado de aeronavegabilidad',
        'derecho-aereo'
    ),
    (
        'derecho-aereo-nacionalidad-registro',
        'Nacionalidad y registro de la aeronave',
        '- Definiciones
- Marcas de matrícula
- Certificado de registro',
        'derecho-aereo'
    ),
    (
        'derecho-aereo-servicio-informacion',
        'Servicio de información aeronáutica',
        '- Definiciones
- AIP
- NOTAM',
        'derecho-aereo'
    ),
    (
        'derecho-aereo-aerodromos',
        'Aeródromos',
        '- Datos del aeródromo
- Ayudas visuales
  - Indicadores
  - Marcas
  - Luces
  - Áreas de uso restringido
  - Emergencias',
        'derecho-aereo'
    ),
    (
        'derecho-aereo-busqueda-salvamento',
        'Búsqueda y salvamento',
        '- Definiciones
- Procedimientos para el PIC
- Señales de búsqueda y salvamento
  - Código de señales en tierra o aire',
        'derecho-aereo'
    ),
    (
        'derecho-aereo-investigacion-accidentes',
        'Investigación de accidentes',
        '- Definiciones
- Aplicabilidad
- Legislación nacional',
        'derecho-aereo'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'principios-v-aerodinamica',
        'Aerodinámica',
        '- Conceptos básicos
- Leyes y definiciones (Bernoulli, Newton)
- Conceptos matemáticos y aerodinámicos elementales
- Conversión de unidades',
        'principios-vuelo'
    ),
    (
        'principios-v-atmosfera-estandar',
        'La atmósfera y la atmósfera estándar',
        '- Densidad
- Influencia de la presión y temperatura en la densidad
- Altitud de presión y altitud de densidad',
        'principios-vuelo'
    ),
    (
        'principios-v-presion-estatica-dinamica-total',
        'Presión estática, dinámica y total',
        '- Presión estática, dinámica y total',
        'principios-vuelo'
    ),
    (
        'principios-v-efecto-venturi',
        'Efecto Venturi',
        '- Efecto Venturi',
        'principios-vuelo'
    ),
    (
        'principios-v-velocidades-tas-ias',
        'Velocidades TAS e IAS',
        '- Velocidades TAS e IAS',
        'principios-vuelo'
    ),
    (
        'principios-v-flujo-aire-viscosidad-capa-limite',
        'Flujo de aire, viscosidad y capa límite',
        '- Flujo de aire, viscosidad y capa límite',
        'principios-vuelo'
    ),
    (
        'principios-v-geometria-perfil',
        'Geometría del perfil aerodinámico',
        '- Sección
- Cuerda
- Espesor
- Línea de curvatura
- Curvatura media
- Borde de ataque
- Borde de salida
- Extradós
- Intradós
- Superficie alar
- Envergadura
- Alargamiento
- Torsión',
        'principios-vuelo'
    ),
    (
        'principios-v-fuerzas-perfil',
        'Fuerzas aerodinámicas sobre un perfil',
        '- Ángulo de ataque
- Sustentación
  - Fórmula
  - Centro de presiones y centro aerodinámico
  - Coeficiente de sustentación
  - Dispositivos hipersustentadores
- Resistencia
  - Resistencia parásita (del perfil, de la forma, de la fricción de las superficies del ala)
  - Resistencia inducida
  - Deflexión del aire hacia abajo
  - Torbellinos marginales
  - Efecto de la velocidad
  - Efecto del alargamiento del ala
  - Centro de gravedad',
        'principios-vuelo'
    ),
    (
        'principios-v-el-ala',
        'El ala',
        '- Formas de ala',
        'principios-vuelo'
    ),
    (
        'principios-v-el-peso',
        'El peso',
        '- El peso',
        'principios-vuelo'
    ),
    (
        'principios-v-la-perdida-stall',
        'La pérdida (stall)',
        '- Capa límite
- Variación de la sustentación y resistencia en función del ángulo de ataque
- Centro de presiones
- Velocidad de pérdida
- Influencia de la forma alar
- Síntomas de la pérdida
- Recuperación de la pérdida
- Barrena',
        'principios-vuelo'
    ),
    (
        'principios-v-empuje-traccion',
        'Empuje y tracción',
        '- Empuje y tracción',
        'principios-vuelo'
    ),
    (
        'principios-v-estabilidad',
        'Estabilidad',
        '- Ejes de giro
  - Eje longitudinal
  - Eje lateral
  - Eje vertical
- Controles de cabeceo, guiñada y alabeo
  - Guiñada adversa
- Estabilidad estática y dinámica
  - Longitudinal
  - Lateral
  - Direccional
  - Positiva
  - Negativa
  - Neutra
- Estabilizador vertical
- Estabilizador horizontal
- Dispositivos de compensación',
        'principios-vuelo'
    ),
    (
        'principios-v-factor-carga',
        'Factor de carga',
        '- Cargas y resistencia estructural
- Factor de carga en vuelo recto
- Factor de carga en virajes
- Factor de carga en turbulencia',
        'principios-vuelo'
    ),
    (
        'principios-v-aerodinamica-operacional',
        'Aerodinámica operacional',
        '- Ascensos y descensos
- Curva polar de velocidades
  - Velocidad de máximo alcance en planeo
  - Velocidad de mínima potencia requerida
  - Velocidad de máximo ascenso
  - Velocidad de máxima pendiente de ascenso',
        'principios-vuelo'
    ),
    (
        'principios-v-despegue',
        'Despegue',
        '- Normal
- Con viento cruzado
- Velocidad de ascenso',
        'principios-vuelo'
    ),
    (
        'principios-v-vuelo',
        'Vuelo',
        '- Efecto suelo
- Vuelo con viento y con viento racheado
- Localización de la dirección del viento
- Vuelo sobre colinas o montañas
- Barloventos y sotaventos',
        'principios-vuelo'
    ),
    (
        'principios-v-deriva-inherente',
        'Deriva inherente',
        '- Deriva inherente',
        'principios-vuelo'
    ),
    (
        'principios-v-limites-operativos',
        'Límites operativos del avión',
        '- Envolvente de la maniobra
- Limitaciones operativas
  - Vibraciones
  - V_fe, V_no, V_ne',
        'principios-vuelo'
    ),
    (
        'principios-v-virajes',
        'Virajes',
        '- Virajes en aviones',
        'principios-vuelo'
    ),
    (
        'principios-v-aproximacion-aterrizaje',
        'Aproximación y aterrizaje',
        '- Aproximaciones normales
- Aproximaciones con viento
- Aterrizaje normal
- Aterrizaje con viento',
        'principios-vuelo'
    ),
    (
        'principios-v-helices',
        'Hélices',
        '- Significado del paso de hélice
- Resistencias generadas por la hélice
- Momentos debidos al funcionamiento de la hélice',
        'principios-vuelo'
    ),
    (
        'principios-v-termicas-turbulencias',
        'Térmicas y turbulencias',
        '- Actuaciones y precauciones',
        'principios-vuelo'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'nav-tierra',
        'La Tierra',
        '- Meridianos y paralelos
- Latitud y longitud
- Coordenadas para localizar cualquier posición',
        'navegacion'
    ),
    (
        'nav-hora',
        'Hora',
        '- Hora solar
  - Orto y ocaso
- Hora UTC, GMT y local
- Husos horarios',
        'navegacion'
    ),
    (
        'nav-direcciones-distancias',
        'Direcciones y distancias',
        '- Norte verdadero, magnético y de brújula
- Desviación de la brújula
- Unidades (milla náutica, kilómetros, metros, pies)
- Conversión de unidades',
        'navegacion'
    ),
    (
        'nav-magnetismo-terrestre',
        'Magnetismo terrestre',
        '- Variación anual
- Campos magnéticos
- Magnetismo y brújula',
        'navegacion'
    ),
    (
        'nav-cartografia',
        'Cartografía',
        '- Proyecciones
  - Cilíndricas
  - Cónicas
- Propiedades de las cartas
  - Escala
  - Características
  - Símbolos, elevaciones, relieve
- Círculos máximos y menores
- Ruta
- Variación o declinación
- Medición de dirección y distancia',
        'navegacion'
    ),
    (
        'nav-estima',
        'Navegación a estima',
        '- Preparación del viaje y planificación
- Elección de la ruta
- Trazado de la ruta
- Triángulo de velocidades
- Velocidad del viento
- Velocidades (IAS, CAS, TAS)
- Velocidad sobre el suelo (GS)
- Ruta y ángulo de deriva
- Rumbo (magnético, verdadero, brújula)
- Distancia
- Altitud verdadera
- Velocidad apropiada
- Hora
- Tiempo estimado
- Cálculo de consumibles',
        'navegacion'
    ),
    (
        'nav-planificacion-viajes',
        'Planificación y realización de viajes',
        '- Plan de vuelo operacional
- Procedimientos de extravío
- Revisión de parámetros de navegación (rumbo, distancia, tiempo y situación)
- Deriva y corrección de deriva
- Navegación observada, técnica y empleo
- Aeródromos alternativos',
        'navegacion'
    ),
    (
        'nav-desorientacion',
        'Desorientación',
        '- Actuación y posibles soluciones',
        'navegacion'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'cga-motor-sistemas',
        'El motor y sus sistemas',
        '- Alimentación
- Refrigeración
- Lubricación
- Encendido
- Sistema eléctrico',
        'conocimiento-aeronave'
    ),
    (
        'cga-helices',
        'Hélices',
        '- Tipos
- Hélices de velocidad constante
- Manejo de la hélice',
        'conocimiento-aeronave'
    ),
    (
        'cga-avion',
        'El avión',
        '- Estructura y cargas
- Célula
- Ala y superficies de cola
  - Diseño
  - Materiales
  - Límites estructurales
- Fuselaje
  - Diseño
  - Materiales
  - Límites estructurales
- Superficies de vuelo y control
  - Diseño
  - Materiales
  - Límites estructurales
- Tren de aterrizaje (ruedas, flotadores, patines)
- Controles de vuelo
  - Mecánicos o automáticos
  - Controles secundarios',
        'conocimiento-aeronave'
    ),
    (
        'cga-instrumentos-equipos',
        'Instrumentos y equipos',
        '- Anemómetro
  - Velocidades IAS y TAS
- Altímetro
  - Procedimiento de reglaje de altímetro
- Variómetro
- Tacómetro de motor
- Indicador de virajes
- Indicador de actitud
- Indicador de resbales y derrapes
- Brújula (correcciones y rumbos)
- Sistema de comunicaciones (VHF)
- GPS (principios, operación y errores)
- Instrumentos y sistemas de indicación
- Sistema de paracaídas
- Equipos de rescate',
        'conocimiento-aeronave'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'meteorologia-atmosfera',
        'La atmósfera',
        '- Definición y composición de la atmósfera
- Distribución térmica
- Distribución físico-química
- Atmósfera estándar OACI
- Circulación atmosférica',
        'meteorologia'
    ),
    (
        'meteorologia-temperatura-aire',
        'Temperatura del aire',
        '- Definición y unidades
- Transmisión del calor
  - Radiación
  - Conducción
  - Convección
- Influencia del suelo y el mar sobre la temperatura
- Oscilación diurna de la temperatura
- Gradiente térmico vertical
- Inversión térmica',
        'meteorologia'
    ),
    (
        'meteorologia-presion-atmosferica',
        'Presión atmosférica',
        '- Unidades de medida
- Gradiente horizontal de presión
- Variación de la presión con la altura
  - Líneas isobaras
- Altas presiones
- Bajas presiones',
        'meteorologia'
    ),
    (
        'meteorologia-densidad',
        'Densidad',
        '- Definición
- Relación presión-temperatura-densidad
- ISA',
        'meteorologia'
    ),
    (
        'meteorologia-humedad',
        'Humedad',
        '- Presión del vapor
- Punto de rocío
- Humedad absoluta y relativa
- Núcleos de condensación
- Condensación y precipitación',
        'meteorologia'
    ),
    (
        'meteorologia-estabilidad-atmosferica',
        'Estabilidad atmosférica y el vuelo',
        '- Condiciones de vuelo en aire estable
- Condiciones de vuelo en aire inestable',
        'meteorologia'
    ),
    (
        'meteorologia-viento',
        'El viento',
        '- Gradiente horizontal de presión y viento
- Viento y rotación de la Tierra
- Efecto del rozamiento del suelo
- Variación diurna
- Viento local
  - Brisa de tierra y mar
  - Viento orográfico
  - Brisa de valle y montaña
  - Viento Föhn
  - Viento laminar
  - Viento turbulento
    - Turbulencia mecánica
    - Turbulencia orográfica
  - Onda de montaña (nubes asociadas)
  - Turbulencia térmica
  - Cizalladura del viento
    - Racha
  - Situaciones meteorológicas típicas (frentes, tormentas, obstáculos)
  - Inversión térmica
    - Vertical
    - Horizontal',
        'meteorologia'
    ),
    (
        'meteorologia-nubes',
        'Nubes',
        '- Clasificación general de las nubes
  - Nubes altas (Ci, Cs, Cc)
  - Nubes medias (As, Ac)
  - Nubes bajas (Sc, St, Ns)
  - Nubes de desarrollo vertical (Cu, Cb)
- Formación de las nubes
  - Nubes orográficas
  - Nubes de turbulencia
  - Nubes convectivas
  - Nubes de advección
  - Nubes frontales
- Condiciones de vuelo según el tipo de nubes',
        'meteorologia'
    ),
    (
        'meteorologia-precipitacion',
        'Precipitación',
        '- Definición
- Precipitación frontal
- Precipitación orográfica
- Efectos de la precipitación en vuelo',
        'meteorologia'
    ),
    (
        'meteorologia-engelamiento',
        'Engelamiento (hielo)',
        '- Definición
- Clases de engelamiento
- Nieve húmeda y escarcha
- Engelamiento y tipo de nubes
- Engelamiento de sistemas
  - Motor (carburador)
  - Bordes de ataque
  - Hélices
  - Tubo de Pitot
  - Operación aérea con hielo',
        'meteorologia'
    ),
    (
        'meteorologia-tormentas',
        'Tormentas',
        '- Condiciones de formación
- Causas para la formación
- Estructura de una tormenta
  - Etapas: formación, desarrollo, madurez y disipación
- Clasificación de las tormentas
- Vuelo a través de tormentas',
        'meteorologia'
    ),
    (
        'meteorologia-visibilidad',
        'Visibilidad',
        '- Definición
- Visibilidad horizontal
- Visibilidad oblicua
- Ilusiones ópticas
- Niebla, neblina, calima y humo
  - Definiciones
  - Clases de niebla',
        'meteorologia'
    ),
    (
        'meteorologia-masas-aire',
        'Masas de aire',
        '- Sistemas de presión
- Clasificación
- Masas de aire de origen marítimo
- Masas de aire de origen continental
- Masas de aire en España',
        'meteorologia'
    ),
    (
        'meteorologia-frentes',
        'Frentes',
        '- Concepto de frente
  - Superficie frontal
  - Línea frontal
  - Frentes activos y estacionarios
- Clasificación de los frentes
  - Frente frío
  - Frente cálido
  - Frente ocluido (oclusión fría y cálida)
  - Frente estacionario
- Condiciones meteorológicas antes, durante y después del paso de un frente cálido
- Condiciones meteorológicas antes, durante y después del paso de un frente frío
- Borrascas y anticiclones',
        'meteorologia'
    ),
    (
        'meteorologia-altimetria',
        'Altimetría',
        '- Definición
- Relación altura-temperatura-presión
- Atmósfera estándar OACI
- Altitud de presión y altitud de densidad
- QFE, QNE y QNH',
        'meteorologia'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'proc-oper-definicion',
        'Definición de procedimiento operacional',
        '- Necesidad
- Actitud de vuelo',
        'procedimientos'
    ),
    (
        'proc-oper-aspectos-generales',
        'Aspectos generales',
        '- Preparación del vuelo
- Obligaciones del piloto al mando
- Equipo mínimo para el vuelo
  - Manual de vuelo',
        'procedimientos'
    ),
    (
        'proc-oper-normales',
        'Procedimientos normales',
        '- Inspección previa al vuelo
- Procedimiento de arranque
- Maniobras durante el rodaje
- Procedimientos en despegue, subida, crucero, descenso, aproximación y aterrizaje
- Parada de motor y abandono de aeronave',
        'procedimientos'
    ),
    (
        'proc-oper-anormales',
        'Procedimientos anormales',
        '- Mal funcionamiento de los mandos de vuelo
- Mal funcionamiento del anemómetro
- Pista contaminada
- Turbulencia (precauciones con otros tráficos durante despegue y aterrizaje)
- Volar inadvertidamente en condiciones meteorológicas instrumentales (IMC)',
        'procedimientos'
    ),
    (
        'proc-oper-emergencia',
        'Procedimientos de emergencia',
        '- Actitud ante una emergencia
- Fallo de motor
- Fuego en el motor
- Fuego en cabina
- Humo en cabina
- Cizalladura (reconocimiento durante salida y aproximación)
- Aterrizaje de emergencia
- Uso del paracaídas
- Uso de sistemas de rescate',
        'procedimientos'
    ),
    (
        'proc-oper-lista-aeronave',
        'Lista de procedimientos de la aeronave',
        '- Lista de procedimientos de la aeronave',
        'procedimientos'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'factores-h-conceptos',
        'Conceptos',
        '- Factores humanos en aviación',
        'factores-humanos'
    ),
    (
        'factores-h-fisiologia-salud',
        'Fisiología básica y salud',
        '- La atmósfera
  - Composición
  - Leyes de los gases
- Sistema respiratorio y circulatorio
  - Necesidad de oxígeno de los tejidos
  - Hipoxia
    - Síntomas de hipoxia
    - Contramedidas
    - Monóxido de carbono
  - Hiperventilación
  - Hipertensión y enfermedad coronaria',
        'factores-humanos'
    ),
    (
        'factores-h-personas-medio',
        'Personas y medio ambiente',
        '- Sistema nervioso anatómico (central y periférico)
- Sistema nervioso funcional (voluntario y autónomo)
- Visión
  - Campo visual
  - Visión monocular y binocular
  - Visión nocturna
  - Defectos de la visión
  - Técnicas visuales de escaneo (look-out)
- Audición
  - Anatomía
  - Pérdida de audición
  - Peligros en vuelo
- Equilibrio
  - Anatomía
  - Mareo
  - Movimiento y aceleración
- Desorientación espacial
  - Tipos
  - Causas
  - Reconocimiento y formas de evitarla
  - Ilusiones (visuales y vestibulares)',
        'factores-humanos'
    ),
    (
        'factores-h-memoria',
        'Memoria',
        '- Descripción y tipos',
        'factores-humanos'
    ),
    (
        'factores-h-comportamiento',
        'El comportamiento humano',
        '- Conducta
- Personalidad
- Actitudes
- Aptitudes
- Aprendizaje (clasificación y niveles)
- Motivación
- Error (modelos, tipos y prevención)',
        'factores-humanos'
    ),
    (
        'factores-h-evaluacion-toma-decisiones',
        'Evaluación y toma de decisiones',
        '- Evaluación del piloto (elementos y tipos)
- Toma de decisiones
- Factores influyentes
- Tipos de decisiones
- Responsabilidad del piloto
- Conciencia de la situación
  - Valoración de riesgos
  - Gestión del estrés',
        'factores-humanos'
    ),
    (
        'factores-h-vuelo-salud',
        'Vuelo y salud',
        '- Estado físico y mental
  - Incapacitación
  - Causas y síntomas:
    - Gastrointestinal
    - Coronaria (factores de riesgo)
    - Migraña
    - Síncope y desfallecimiento
    - Otorrinolaringológica
    - Psiquiátrica
- Tóxicos:
  - Tabaco
  - Alcohol
  - Cafeína
  - Medicamentos
  - Drogas
- Sueño
  - Función
  - Modelos
  - Trastornos del sueño (prevención y tratamiento)
- Fatiga
  - Definición
  - Tipos
  - Causas
  - Prevención
- Estrés y ansiedad
  - Tipos de estrés, identificación y manejo
- Higiene y vuelo
  - Nutrición
  - Alimentos y distribución
  - Alimentos a evitar antes del vuelo
  - Ejercicio físico (beneficios y recomendaciones)',
        'factores-humanos'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'coms-definiciones',
        'Definiciones',
        '- Abreviaturas ATS
- Categoría de los mensajes',
        'comunicaciones'
    ),
    (
        'coms-procedimientos-generales',
        'Procedimientos generales',
        '- Transmisión de letras, números y hora
- Técnicas de transmisión
- Señales de llamada a estaciones y aeronaves
- Colación',
        'comunicaciones'
    ),
    (
        'coms-terminos-meteorologicos-vfr',
        'Términos para la información meteorológica (VFR)',
        '- Términos para la información meteorológica (VFR)',
        'comunicaciones'
    ),
    (
        'coms-meteorologia-actual-prevision',
        'Meteorología actual y previsión',
        '- Meteorología actual y previsión',
        'comunicaciones'
    ),
    (
        'coms-fallo-comunicaciones',
        'Fallo de comunicaciones',
        '- Fallo de comunicaciones',
        'comunicaciones'
    ),
    (
        'coms-socorro-peligro',
        'Comunicaciones de socorro y actuación en caso de peligro',
        '- Emergencia
- Urgencia
- Procedimientos de actuación',
        'comunicaciones'
    );
INSERT INTO categories (id, name, description, parent_category_id)
VALUES (
        'performance-definiciones',
        'Definiciones',
        '- Masas
- Efectos de la altitud de densidad
- Velocidad de máximo alcance y mayor autonomía
- Velocidades Vx y Vy',
        'performance'
    ),
    (
        'performance-despegue',
        'Despegue',
        '- Despegue y distancia disponible
- Efecto suelo
- Ascenso inicial
- Masa, viento y altitud de densidad
- Efectos del gradiente en la superficie del suelo
- Condiciones de la pista',
        'performance'
    ),
    (
        'performance-aterrizaje',
        'Aterrizaje',
        '- Efecto suelo
- Aproximaciones
- Masa, viento y altitud de densidad y velocidad de aproximación
- Efectos del gradiente en la superficie del suelo
- Condiciones de la pista',
        'performance'
    ),
    (
        'performance-en-vuelo',
        'En vuelo',
        '- Diagrama de rendimiento
- Configuración, masa, temperatura y altitud
- Efectos adversos (lluvia, hielo)',
        'performance'
    ),
    (
        'performance-maniobras',
        'Maniobras',
        '- Factor de carga',
        'performance'
    ),
    (
        'performance-masa-centrado',
        'Masa y centrado',
        '- Limitaciones del centro de gravedad
- Factor de carga límite
- Limitación estructural
- Cálculo de masa
- Cálculo del centro de gravedad
- Masa máxima para despegue y aterrizaje
- Datum y posición del centro de gravedad',
        'performance'
    ),
    (
        'performance-planificacion-vuelo',
        'Planificación del vuelo',
        '- Planificación de vuelos VFR
- Cartas VFR, rutas, aeródromos y altitudes
- Cartas de aeródromos
- Rumbos y distancias
- Planificación de las comunicaciones
- Cálculo del combustible y reservas
- Información AIP y NOTAM
- Aeródromos alternativos
- Rutas y espacio aéreo
- Información meteorológica
- Comprobaciones en vuelo
- Gestión del combustible
- Seguimiento de la ruta y tiempo de vuelo
- Recalcular los datos del vuelo si hay desviación de lo planificado',
        'performance'
    );