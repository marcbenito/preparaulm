-- Preguntas para la categoría: Navegación (navigation)
-- Lote 1: Principios básicos de navegación
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'navigation',
        '¿Qué es la navegación  a estima?',
        '["Navegación basada en instrumentos electrónicos", "Navegación basada en el cálculo de posición a partir de rumbo, velocidad y tiempo", "Navegación usando exclusivamente referencias visuales", "Navegación basada en señales de satélite"]',
        'Navegación basada en el cálculo de posición a partir de rumbo, velocidad y tiempo',
        'La navegación a estima (dead reckoning) es un método que determina la posición actual calculando los desplazamientos desde una posición conocida, utilizando rumbo, velocidad y tiempo.',
        1
    ),
    (
        'navigation',
        '¿Qué es la declinación magnética?',
        '["La diferencia entre el norte magnético y el norte verdadero", "La diferencia entre el rumbo verdadero y el rumbo de la brújula", "La variación en la altitud durante el vuelo", "El cambio en la presión atmosférica con la altitud"]',
        'La diferencia entre el norte magnético y el norte verdadero',
        'La declinación magnética es el ángulo entre el norte magnético (al que apunta una brújula) y el norte verdadero (eje de rotación de la Tierra). Varía según la ubicación geográfica.',
        1
    ),
    (
        'navigation',
        '¿Qué tipo de carta aeronáutica se utiliza principalmente para la navegación visual?',
        '["Carta de área terminal", "Carta en ruta", "Carta de aproximación instrumental", "Carta de navegación visual (VFR)"]',
        'Carta de navegación visual (VFR)',
        'Las cartas de navegación visual o VFR están diseñadas para vuelos bajo reglas de vuelo visual, con énfasis en referencias terrestres, espacio aéreo y obstrucciones visibles desde el aire.',
        1
    ),
    (
        'navigation',
        '¿Qué es un waypoint en navegación aérea?',
        '["Un punto de espera en tierra", "Un punto geográfico específico utilizado para definir rutas", "Una torre de control", "Un tipo de radioayuda"]',
        'Un punto geográfico específico utilizado para definir rutas',
        'Un waypoint es un punto de referencia específico definido por coordenadas geográficas que se utiliza en la planificación de vuelos y navegación para definir rutas aéreas y procedimientos.',
        1
    ),
    (
        'navigation',
        '¿Qué es la desviación de la brújula?',
        '["El error causado por los campos magnéticos de la aeronave", "La diferencia entre el norte magnético y el norte verdadero", "El error en la lectura de la brújula debido a la aceleración", "La variación en las lecturas de la brújula con la altitud"]',
        'El error causado por los campos magnéticos de la aeronave',
        'La desviación de la brújula es el error en la lectura causado por los campos magnéticos generados por los componentes eléctricos y metálicos de la propia aeronave.',
        2
    ),
    (
        'navigation',
        '¿Qué significan las siglas DME?',
        '["Distance Measuring Equipment", "Digital Map Enhancement", "Directional Movement Evaluator", "Dynamic Meteorological Estimator"]',
        'Distance Measuring Equipment',
        'DME (Distance Measuring Equipment) es un sistema electrónico que mide la distancia oblicua entre la aeronave y una estación terrestre, proporcionando información precisa de distancia.',
        1
    ),
    (
        'navigation',
        '¿Cuál es la diferencia entre rumbo magnético y rumbo verdadero?',
        '["No hay diferencia", "El rumbo magnético considera la declinación magnética, el verdadero no", "El rumbo verdadero considera la declinación magnética, el magnético no", "El rumbo verdadero solo se usa en el hemisferio norte"]',
        'El rumbo verdadero considera la declinación magnética, el magnético no',
        'El rumbo verdadero se mide con respecto al norte geográfico o verdadero, mientras que el rumbo magnético se mide con respecto al norte magnético. La diferencia entre ambos es la declinación magnética.',
        2
    ),
    (
        'navigation',
        '¿Qué es un radial en navegación VOR?',
        '["Una línea recta desde una estación VOR en cualquier dirección", "Una ruta circular alrededor de la estación VOR", "Una línea de posición que se origina en la aeronave", "Un tipo de aproximación"]',
        'Una línea recta desde una estación VOR en cualquier dirección',
        'Un radial es una línea magnética que se extiende desde una estación VOR. Los radiales se identifican por su rumbo magnético desde la estación (1-360 grados) y se utilizan para definir rutas aéreas.',
        1
    ),
    (
        'navigation',
        '¿Qué información proporciona un ADF?',
        '["Dirección hacia la estación NDB", "Distancia a un VOR", "Dirección y distancia a un DME", "Altitud sobre el nivel del mar"]',
        'Dirección hacia la estación NDB',
        'El ADF (Automatic Direction Finder) proporciona la dirección relativa o el rumbo hacia una estación de radiofaro no direccional (NDB), ayudando a la navegación.',
        1
    ),
    (
        'navigation',
        '¿Qué es una aerovía?',
        '["Una ruta entre aeropuertos", "Un corredor aéreo definido entre radioayudas", "Un tipo de espacio aéreo restringido", "Una ruta de aproximación"]',
        'Un corredor aéreo definido entre radioayudas',
        'Una aerovía es un corredor o ruta de navegación aérea establecida entre radioayudas y/o waypoints, con límites laterales y verticales definidos, utilizada para controlar el tráfico aéreo.',
        1
    );
-- Lote 2: Navegación avanzada y sistemas modernos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'navigation',
        '¿Qué es RNAV?',
        '["Radio Navigation", "Required Navigation", "Area Navigation", "Reserved Navigation Area"]',
        'Area Navigation',
        'RNAV (Area Navigation) es un método de navegación que permite a las aeronaves operar en cualquier ruta deseada dentro de la cobertura de las ayudas a la navegación basadas en tierra o espacio, o dentro de los límites de capacidad de los sistemas autónomos.',
        2
    ),
    (
        'navigation',
        '¿Qué es PBN?',
        '["Performance Based Navigation", "Precision Bearing Navigation", "Pilot Based Navigation", "Position Based Network"]',
        'Performance Based Navigation',
        'PBN (Performance Based Navigation) es un concepto que especifica los requisitos de rendimiento para aeronaves que operan a lo largo de una ruta ATS, en un procedimiento de aproximación o en un espacio aéreo designado.',
        3
    ),
    (
        'navigation',
        '¿Qué es un FIX en navegación aérea?',
        '["Un punto geográfico específico identificado por referencia visual o por otros medios", "Una reparación de equipo de navegación", "Una corrección de rumbo", "Un ajuste del plan de vuelo"]',
        'Un punto geográfico específico identificado por referencia visual o por otros medios',
        'Un FIX es un punto geográfico en el espacio, determinado por referencias visuales, radioayudas o sistemas de navegación, utilizado para definir rutas, procedimientos o puntos de notificación.',
        2
    ),
    (
        'navigation',
        '¿Qué es un procedimiento STAR?',
        '["Standard Terminal Arrival Route", "Special Takeoff and Runway procedure", "System for Terminal Area Restriction", "Standardized Taxiway and Ramp"]',
        'Standard Terminal Arrival Route',
        'STAR (Standard Terminal Arrival Route) es un procedimiento publicado de llegada por instrumentos que proporciona una transición desde la fase en ruta hasta la fase de aproximación.',
        2
    ),
    (
        'navigation',
        '¿Qué es un procedimiento SID?',
        '["Standard Instrument Departure", "Special Information Display", "System Identification Database", "Surface Information Detail"]',
        'Standard Instrument Departure',
        'SID (Standard Instrument Departure) es un procedimiento de salida por instrumentos diseñado para proporcionar una transición desde el despegue hasta la fase en ruta de vuelo.',
        2
    ),
    (
        'navigation',
        '¿Qué información proporciona un sistema ADS-B?',
        '["Solo identificación de la aeronave", "Posición, altitud, velocidad y otra información de vuelo", "Solo posición de la aeronave", "Solo información meteorológica"]',
        'Posición, altitud, velocidad y otra información de vuelo',
        'ADS-B (Automatic Dependent Surveillance-Broadcast) transmite automáticamente datos como posición, altitud, velocidad y otros parámetros desde la aeronave a estaciones terrestres y otras aeronaves equipadas.',
        2
    ),
    (
        'navigation',
        '¿Qué es un GPS?',
        '["Global Positioning System", "Ground Proximity Sensor", "General Planning System", "Guidance and Positioning Standard"]',
        'Global Positioning System',
        'GPS (Global Positioning System) es un sistema de navegación por satélite que proporciona posicionamiento, navegación y cronometría a nivel mundial mediante una constelación de satélites.',
        1
    ),
    (
        'navigation',
        '¿Qué es RNP?',
        '["Required Navigation Performance", "Radio Navigation Protocol", "Route and Navigation Procedure", "Regional Navigation Plan"]',
        'Required Navigation Performance',
        'RNP (Required Navigation Performance) es una especificación de navegación basada en la navegación de área que incluye un requisito de monitoreo y alerta del rendimiento a bordo.',
        3
    ),
    (
        'navigation',
        '¿Qué es una aproximación GNSS?',
        '["Global Navigation Satellite System approach", "Ground Navigation Standard System", "General Non-directional Signal Service", "Guided Non-precision Standard Service"]',
        'Global Navigation Satellite System approach',
        'Una aproximación GNSS utiliza sistemas de navegación por satélite global para guiar a la aeronave durante el procedimiento de aproximación, proporcionando guía de posición precisa.',
        2
    ),
    (
        'navigation',
        '¿Cuál es la ventaja principal de la navegación inercial (INS)?',
        '["Funciona sin señales externas", "Es más precisa que GPS", "Consume menos energía", "Es más fácil de instalar"]',
        'Funciona sin señales externas',
        'La principal ventaja del Sistema de Navegación Inercial (INS) es que funciona de manera autónoma sin necesidad de señales externas o referencias terrestres, utilizando acelerómetros y giróscopos para determinar la posición.',
        2
    );
-- Lote 3: Procedimientos y conceptos de navegación avanzados
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'navigation',
        '¿Qué es un procedimiento de aproximación por instrumentos?',
        '["Un procedimiento para aterrizar usando solo referencias visuales", "Un procedimiento predeterminado para guiar a la aeronave desde la fase en ruta hasta el aterrizaje usando instrumentos", "Un procedimiento de emergencia", "Un procedimiento para despegar con baja visibilidad"]',
        'Un procedimiento predeterminado para guiar a la aeronave desde la fase en ruta hasta el aterrizaje usando instrumentos',
        'Un procedimiento de aproximación por instrumentos es una serie de maniobras predeterminadas para transferir una aeronave desde la fase inicial de aproximación hasta un aterrizaje, o hasta un punto desde el cual se puede realizar un aterrizaje visual.',
        2
    ),
    (
        'navigation',
        '¿Qué es un hold o patrón de espera?',
        '["Un procedimiento para mantener la aeronave en tierra", "Un patrón específico de vuelo para retrasar la llegada", "Un procedimiento de emergencia", "Una maniobra para aumentar la altitud"]',
        'Un patrón específico de vuelo para retrasar la llegada',
        'Un patrón de espera es una maniobra predeterminada que mantiene a la aeronave dentro de un espacio aéreo específico mientras espera autorización para proceder, generalmente en forma de óvalo con giros a la derecha.',
        1
    ),
    (
        'navigation',
        '¿Qué información proporciona un VOR/DME?',
        '["Solo distancia a la estación", "Solo dirección desde la estación", "Dirección desde la estación y distancia a ella", "Altitud y velocidad"]',
        'Dirección desde la estación y distancia a ella',
        'Un VOR/DME es una combinación de dos ayudas a la navegación: el VOR proporciona información de dirección (radial) desde la estación, mientras que el DME proporciona la distancia oblicua a la misma estación.',
        1
    ),
    (
        'navigation',
        '¿Qué es el método 1 en 60 en navegación?',
        '["Una regla para calcular la desviación de la trayectoria", "Una técnica de aproximación", "Un método para calcular el combustible", "Una regla para determinar la altitud mínima"]',
        'Una regla para calcular la desviación de la trayectoria',
        'La regla 1 en 60 establece que una desviación de 1 grado de la trayectoria deseada resultará en aproximadamente 1 milla náutica de desplazamiento lateral por cada 60 millas náuticas recorridas.',
        2
    ),
    (
        'navigation',
        '¿Qué es una aproximación estabilizada?',
        '["Una aproximación con instrumentos específicos", "Una aproximación donde todos los parámetros de vuelo están controlados y estables", "Una aproximación con viento en calma", "Una aproximación a baja velocidad"]',
        'Una aproximación donde todos los parámetros de vuelo están controlados y estables',
        'Una aproximación estabilizada es aquella en la que la aeronave está en la configuración de aterrizaje correcta, en la trayectoria de aproximación correcta, con velocidad, potencia y tasa de descenso apropiadas y estabilizadas antes de alcanzar una altitud específica.',
        2
    ),
    (
        'navigation',
        '¿Qué es el espacio aéreo controlado?',
        '["Espacio aéreo donde no se permite volar", "Espacio aéreo donde se requiere permiso especial", "Espacio aéreo de dimensiones definidas donde se proporciona servicio de control de tránsito aéreo", "Espacio aéreo reservado para uso militar"]',
        'Espacio aéreo de dimensiones definidas donde se proporciona servicio de control de tránsito aéreo',
        'El espacio aéreo controlado es un volumen de espacio aéreo de dimensiones definidas dentro del cual se proporciona servicio de control de tránsito aéreo a los vuelos IFR y, en algunos casos, a los vuelos VFR.',
        1
    ),
    (
        'navigation',
        '¿Qué es un FIR?',
        '["Flight Information Region", "Formal Instrument Route", "Federal Investigation Report", "Final Inspection Record"]',
        'Flight Information Region',
        'FIR (Flight Information Region) es un espacio aéreo de dimensiones definidas dentro del cual se proporcionan servicios de información de vuelo y servicios de alerta.',
        2
    ),
    (
        'navigation',
        '¿Cuál es la función principal del Director de Vuelo (Flight Director)?',
        '["Controlar automáticamente la aeronave", "Proporcionar guía visual para los controles manuales", "Comunicarse con ATC", "Monitorear los sistemas de la aeronave"]',
        'Proporcionar guía visual para los controles manuales',
        'El Director de Vuelo es un sistema que proporciona guía visual al piloto para seguir una trayectoria preseleccionada, mostrando barras de comando que indican los movimientos necesarios de los controles para mantener la trayectoria deseada.',
        2
    ),
    (
        'navigation',
        '¿Qué es un NDB?',
        '["Navigation Database", "Non-Directional Beacon", "National Defense Barrier", "Navigational Display Board"]',
        'Non-Directional Beacon',
        'Un NDB (Non-Directional Beacon) es un transmisor de radio ubicado en un lugar conocido que emite señales uniformemente en todas direcciones, utilizado como ayuda a la navegación con un receptor ADF en la aeronave.',
        1
    ),
    (
        'navigation',
        '¿Qué es la navegación a 4D?',
        '["Navegación en las cuatro direcciones", "Navegación que incluye las tres dimensiones espaciales más el tiempo", "Navegación con cuatro sistemas independientes", "Un tipo de navegación militar"]',
        'Navegación que incluye las tres dimensiones espaciales más el tiempo',
        'La navegación 4D incorpora el tiempo como una cuarta dimensión a las tres dimensiones espaciales tradicionales, permitiendo a las aeronaves seguir trayectorias precisas con restricciones de tiempo específicas, optimizando la gestión del tráfico aéreo.',
        3
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'navigation'
    )
WHERE id = 'navigation';