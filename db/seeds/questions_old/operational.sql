-- Preguntas para la categoría: Procedimientos Operacionales (operational)
-- Lote 1: Procedimientos operacionales básicos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'operational',
        '¿Qué es una SOP?',
        '["Standard Operating Procedure", "Safety Oversight Program", "Special Operations Permit", "System Overview Protocol"]',
        'Standard Operating Procedure',
        'SOP (Standard Operating Procedure) son procedimientos estandarizados de operación que establecen métodos prescritos para realizar actividades específicas. En aviación, proporcionan orientación paso a paso para operaciones normales, anormales y de emergencia.',
        1
    ),
    (
        'operational',
        '¿Qué es un briefing de aproximación?',
        '["Una reunión previa al vuelo", "Una revisión verbal de los procedimientos y consideraciones para una aproximación específica", "Un informe posterior al vuelo", "Una instrucción del controlador de tránsito aéreo"]',
        'Una revisión verbal de los procedimientos y consideraciones para una aproximación específica',
        'Un briefing de aproximación es una revisión verbal realizada por la tripulación de vuelo antes de iniciar una aproximación, que incluye la revisión del procedimiento de aproximación, mínimos, configuración de la aeronave, procedimientos de aproximación frustrada y consideraciones especiales.',
        1
    ),
    (
        'operational',
        '¿Qué es una lista de verificación (checklist)?',
        '["Un documento que lista los equipos requeridos para un vuelo", "Una herramienta que asegura que tareas críticas sean completadas en una secuencia específica", "Un registro de mantenimiento", "Un documento que detalla los procedimientos de emergencia"]',
        'Una herramienta que asegura que tareas críticas sean completadas en una secuencia específica',
        'Una lista de verificación (checklist) es una herramienta de ayuda a la memoria que garantiza que las tareas críticas de seguridad se completen en una secuencia específica, reduciendo la posibilidad de que se omitan pasos importantes durante operaciones normales, anormales o de emergencia.',
        1
    ),
    (
        'operational',
        '¿Qué significa ETOPS?',
        '["Extended Twin Operations", "Emergency Takeoff Procedures", "European Training for Operational Safety", "Extra Terrestrial Operations Protocol"]',
        'Extended Twin Operations',
        'ETOPS (Extended Twin Operations, ahora también llamado Extended Operations) se refiere a los estándares y requisitos para operar aviones bimotor en rutas donde la aeronave estará a más de 60 minutos de vuelo de un aeropuerto adecuado para aterrizaje de emergencia.',
        1
    ),
    (
        'operational',
        '¿Qué es una aproximación estabilizada?',
        '["Una aproximación realizada exclusivamente con instrumentos", "Una aproximación donde todos los parámetros de vuelo están controlados y estables", "Una aproximación con asistencia del piloto automático", "Una aproximación con visibilidad perfecta"]',
        'Una aproximación donde todos los parámetros de vuelo están controlados y estables',
        'Una aproximación estabilizada es aquella en la que la aeronave está en la configuración correcta, a la velocidad adecuada, en la trayectoria correcta, con régimen de descenso apropiado y potencia estable antes de alcanzar una altitud predeterminada, típicamente 1000 pies en IMC o 500 pies en VMC.',
        1
    ),
    (
        'operational',
        '¿Qué es el TCAS?',
        '["Traffic Collision Avoidance System", "Terminal Control Area System", "Total Computer Automated System", "Takeoff Climb Analysis Software"]',
        'Traffic Collision Avoidance System',
        'TCAS (Traffic Collision Avoidance System) es un sistema diseñado para reducir la incidencia de colisiones en el aire entre aeronaves. Monitorea el espacio aéreo alrededor de la aeronave, advierte a los pilotos de la presencia de otras aeronaves equipadas con transponder y proporciona instrucciones de evasión si es necesario.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento de aproximación frustrada?',
        '["Un procedimiento a seguir cuando una aproximación no puede continuarse hasta el aterrizaje", "Un procedimiento para aproximarse a un aeropuerto con mal tiempo", "Un procedimiento para aterrizar en pistas cortas", "Un procedimiento para aproximarse a aeropuertos congestionados"]',
        'Un procedimiento a seguir cuando una aproximación no puede continuarse hasta el aterrizaje',
        'El procedimiento de aproximación frustrada (missed approach) es un procedimiento publicado que debe seguirse cuando una aproximación por instrumentos no puede continuarse hasta el aterrizaje. Define la ruta, altitudes y puntos de notificación para ascender de manera segura y reposicionarse para otra aproximación o dirigirse a un alternativo.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento STAR?',
        '["Standard Terminal Arrival Route", "Special Takeoff and Runway procedure", "System for Terminal Area Restriction", "Standard Taxiway and Ramp"]',
        'Standard Terminal Arrival Route',
        'STAR (Standard Terminal Arrival Route) es un procedimiento publicado de llegada por instrumentos que proporciona una transición desde la fase en ruta hasta la fase de aproximación, definiendo rutas, altitudes y velocidades.',
        1
    ),
    (
        'operational',
        '¿Qué es una aproximación de no precisión?',
        '["Una aproximación por instrumentos que utiliza guía lateral pero no vertical", "Una aproximación visual", "Una aproximación sin instrumentos", "Una aproximación con mala visibilidad"]',
        'Una aproximación por instrumentos que utiliza guía lateral pero no vertical',
        'Una aproximación de no precisión es un procedimiento de aproximación por instrumentos que proporciona guía lateral (de curso) pero no proporciona guía vertical electrónica. Los ejemplos incluyen aproximaciones VOR, NDB, localizer-only y LNAV.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento SID?',
        '["Standard Instrument Departure", "Special Information Display", "System Identification Database", "Surface Information Detail"]',
        'Standard Instrument Departure',
        'SID (Standard Instrument Departure) es un procedimiento de salida por instrumentos diseñado para proporcionar una transición desde el despegue hasta la fase en ruta del vuelo, especificando rutas, altitudes y restricciones.',
        1
    );
-- Lote 2: Procedimientos operacionales avanzados
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'operational',
        '¿Qué es la regla de "sterile cockpit"?',
        '["Prohibición de entrar a la cabina durante el vuelo", "Procedimiento de limpieza de la cabina", "Prohibición de conversaciones no esenciales durante fases críticas del vuelo", "Protocolo de comunicación solo por radio"]',
        'Prohibición de conversaciones no esenciales durante fases críticas del vuelo',
        'La regla de cabina estéril (sterile cockpit) prohíbe actividades no esenciales para la operación segura de la aeronave durante fases críticas del vuelo (generalmente por debajo de 10,000 pies), como conversaciones no relacionadas con el vuelo, comidas, y otras distracciones.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento CFIT?',
        '["Controlled Flight Into Terrain", "Critical Flight Instruction Technique", "Cabin Fire Isolation Technique", "Cockpit Familiarization and Information Training"]',
        'Controlled Flight Into Terrain',
        'CFIT (Controlled Flight Into Terrain) no es un procedimiento sino un tipo de accidente donde una aeronave en perfecto estado de funcionamiento y bajo el control completo de los pilotos es volada inadvertidamente contra el terreno, agua u obstáculo. Los procedimientos de prevención de CFIT incluyen alertas de proximidad al terreno y conciencia situacional.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento de descenso de emergencia?',
        '["Un procedimiento para descender rápidamente en caso de despresurización", "Un procedimiento para aterrizar con sobrepeso", "Un procedimiento para descender en condiciones de hielo", "Un procedimiento para descender con visibilidad reducida"]',
        'Un procedimiento para descender rápidamente en caso de despresurización',
        'Un procedimiento de descenso de emergencia (emergency descent) es una maniobra para descender rápidamente a una altitud segura, típicamente por debajo de 10,000 pies, en caso de despresurización de cabina u otra emergencia que requiera abandonar rápidamente altitudes elevadas.',
        1
    ),
    (
        'operational',
        '¿Qué es un EFB?',
        '["Electronic Flight Bag", "Emergency Flotation Beacon", "Extended Flap Boundary", "Engine Fire Bottle"]',
        'Electronic Flight Bag',
        'EFB (Electronic Flight Bag) es un dispositivo electrónico que ayuda a los pilotos a realizar funciones de gestión de vuelo más fácilmente y con mayor eficiencia, reemplazando documentación en papel como cartas de navegación, manuales de operación, listas de verificación y cálculos de rendimiento.',
        1
    ),
    (
        'operational',
        '¿Qué es una DH (Decision Height)?',
        '["Una altitud específica en una aproximación de precisión a la cual debe iniciarse una aproximación frustrada si no se ha establecido referencia visual", "La altura máxima para despegue", "La altura mínima para iniciar un aterrizaje", "La altura de transición a velocidad de crucero"]',
        'Una altitud específica en una aproximación de precisión a la cual debe iniciarse una aproximación frustrada si no se ha establecido referencia visual',
        'La Altura de Decisión (DH) es una altura específica en procedimientos de aproximación de precisión o con guía vertical a la cual debe iniciarse una aproximación frustrada si las referencias visuales requeridas para continuar la aproximación no han sido establecidas.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento de aproximación con RVR?',
        '["Un procedimiento que utiliza el Alcance Visual en Pista como criterio para aterrizar", "Un procedimiento de aproximación radar", "Un procedimiento de aproximación con visibilidad reducida", "Un procedimiento de aproximación con restricciones verticales"]',
        'Un procedimiento que utiliza el Alcance Visual en Pista como criterio para aterrizar',
        'RVR (Runway Visual Range) es una medida de la distancia a la que un piloto puede ver las marcas de la superficie de la pista. Los procedimientos de aproximación con RVR utilizan este valor como criterio para determinar si se cumplen los mínimos requeridos para continuar una aproximación hasta el aterrizaje.',
        2
    ),
    (
        'operational',
        '¿Qué es un circuito de espera?',
        '["Un patrón de vuelo predeterminado utilizado para retrasar una aeronave ya en el aire", "Una ruta circular alrededor del aeropuerto", "Un procedimiento de búsqueda y rescate", "Un circuito eléctrico de respaldo"]',
        'Un patrón de vuelo predeterminado utilizado para retrasar una aeronave ya en el aire',
        'Un circuito de espera (holding pattern) es un patrón de vuelo predeterminado, generalmente en forma de "hipódromo" o racetrack, que se asigna a las aeronaves por ATC para mantenerlas en un área específica mientras esperan autorización para proceder.',
        1
    ),
    (
        'operational',
        '¿Qué es un LVO?',
        '["Low Visibility Operation", "Landing Vector Oscillation", "Level Vertical Offset", "Limited Visual Orientation"]',
        'Low Visibility Operation',
        'LVO (Low Visibility Operation) son operaciones de aeródromo en condiciones de visibilidad reducida que requieren procedimientos especiales para garantizar la seguridad, incluyendo despegues en baja visibilidad y aproximaciones y aterrizajes de Categoría II/III.',
        2
    ),
    (
        'operational',
        '¿Qué es el GPWS?',
        '["Ground Proximity Warning System", "Global Positioning Weather System", "General Purpose Weather Sensor", "Glide Path Warning System"]',
        'Ground Proximity Warning System',
        'GPWS (Sistema de Advertencia de Proximidad al Terreno) es un sistema diseñado para alertar a los pilotos si su aeronave está en peligro inminente de impactar contra el terreno. Monitorea la altitud de la aeronave sobre el terreno usando un altímetro radar y proporciona alertas auditivas y visuales.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento de evacuación de emergencia?',
        '["Un procedimiento para evacuar pasajeros rápidamente de la aeronave", "Un procedimiento para evitar una zona de mal tiempo", "Un procedimiento para abandonar una ruta aérea", "Un procedimiento para evacuar combustible"]',
        'Un procedimiento para evacuar pasajeros rápidamente de la aeronave',
        'Un procedimiento de evacuación de emergencia es un conjunto de acciones diseñadas para permitir la salida rápida y ordenada de todos los ocupantes de una aeronave en situaciones de emergencia, como incendio, amerizaje o aterrizaje forzoso.',
        1
    );
-- Lote 3: Procedimientos especiales y de emergencia
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'operational',
        '¿Qué es un procedimiento QRH?',
        '["Quick Reference Handbook - un manual con listas de verificación para situaciones normales y anormales", "Qualified Runway Heading - un procedimiento de despegue", "Quality Requirements History - un registro de mantenimiento", "Quantified Radar Homing - un sistema de navegación"]',
        'Quick Reference Handbook - un manual con listas de verificación para situaciones normales y anormales',
        'El QRH (Quick Reference Handbook) es un manual que contiene las listas de verificación para procedimientos normales, anormales y de emergencia, diseñado para un acceso rápido a la información crítica durante situaciones que requieren acción inmediata.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento EGPWS?',
        '["Enhanced Ground Proximity Warning System", "Emergency General Purpose Warning System", "Electronic Glide Path Warning System", "Extended Ground Positioning Wireless System"]',
        'Enhanced Ground Proximity Warning System',
        'EGPWS (Enhanced Ground Proximity Warning System) o TAWS (Terrain Awareness and Warning System) es una versión mejorada del GPWS que utiliza una base de datos del terreno global y GPS para proporcionar alertas anticipadas de proximidad al terreno, mejorando significativamente la prevención de CFIT.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento para windshear?',
        '["Un procedimiento para evitar o recuperarse de un encuentro con cizalladura del viento", "Un procedimiento para despegar con viento cruzado", "Un procedimiento para mejorar la eficiencia con viento en contra", "Un procedimiento para calcular la velocidad del viento"]',
        'Un procedimiento para evitar o recuperarse de un encuentro con cizalladura del viento',
        'Los procedimientos de windshear (cizalladura del viento) incluyen técnicas para evitar encontrarse con este fenómeno peligroso y, si se encuentra, recuperar control de la aeronave. Típicamente incluyen aplicación máxima de potencia, mantenimiento de actitud óptima y minimización de cambios en la configuración.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento para despegue con performance limitada?',
        '["Un procedimiento para maximizar el rendimiento de despegue en condiciones adversas", "Un procedimiento para despegar con sobrepeso", "Un procedimiento para despegar con mal tiempo", "Un procedimiento para despegar con potencia reducida"]',
        'Un procedimiento para maximizar el rendimiento de despegue en condiciones adversas',
        'Los procedimientos de despegue con performance limitada se utilizan cuando condiciones como pista corta, obstáculos, temperatura elevada, altitud elevada o contaminación de pista limitan el rendimiento de despegue. Incluyen técnicas como uso de flaps específicos, ajustes de potencia y velocidades V optimizadas.',
        2
    ),
    (
        'operational',
        '¿Qué es la técnica DODAR para gestión de emergencias?',
        '["Diagnose, Options, Decide, Assign, Review", "Direct, Observe, Detect, Act, Report", "Determine, Organize, Deploy, Analyze, Respond", "Divert, Oxygen, Descend, Alert, Radio"]',
        'Diagnose, Options, Decide, Assign, Review',
        'DODAR es un acrónimo utilizado como ayuda memorística para la toma de decisiones en emergencias: Diagnose (diagnosticar el problema), Options (considerar opciones disponibles), Decide (decidir curso de acción), Assign (asignar tareas), Review (revisar acciones y resultados).',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento RNAV?',
        '["Un procedimiento de navegación de área que permite operaciones a lo largo de cualquier trayectoria de vuelo deseada", "Un procedimiento para comunicaciones por radio", "Un procedimiento para aterrizajes automáticos", "Un procedimiento para despegues con visibilidad reducida"]',
        'Un procedimiento de navegación de área que permite operaciones a lo largo de cualquier trayectoria de vuelo deseada',
        'Los procedimientos RNAV (Area Navigation) son procedimientos que permiten a una aeronave volar en cualquier trayectoria deseada dentro de la cobertura de ayudas a la navegación basadas en tierra o espacio, o dentro de los límites de las capacidades de sistemas autónomos, sin necesidad de volar directamente sobre ayudas a la navegación.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento de contingencia por fallo de comunicaciones?',
        '["Un procedimiento a seguir cuando se pierden las comunicaciones por radio", "Un procedimiento para reparar equipos de radio", "Un procedimiento para mejorar la calidad de las comunicaciones", "Un procedimiento para comunicarse con aeropuertos alternos"]',
        'Un procedimiento a seguir cuando se pierden las comunicaciones por radio',
        'Los procedimientos de contingencia por fallo de comunicaciones establecen las acciones que debe tomar un piloto cuando se pierde la comunicación por radio con el control de tránsito aéreo. Generalmente incluyen mantener el último nivel autorizado, seguir el plan de vuelo y aproximarse al destino a la hora prevista.',
        1
    ),
    (
        'operational',
        '¿Qué es un procedimiento ETOPS?',
        '["Procedimientos para operar aviones bimotores en rutas extendidas sobre agua o terreno inhóspito", "Procedimientos para emergencias durante el despegue", "Procedimientos para evaluación técnica de potencia del sistema", "Procedimientos para entrenamiento operacional de pilotos suplentes"]',
        'Procedimientos para operar aviones bimotores en rutas extendidas sobre agua o terreno inhóspito',
        'Los procedimientos ETOPS (Extended Twin Operations) son procedimientos especiales que permiten a aviones bimotores volar rutas donde estarán a más de 60 minutos de un aeropuerto adecuado. Incluyen requisitos adicionales de planificación, combustible, mantenimiento y entrenamiento para garantizar la seguridad.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento para operaciones en pistas contaminadas?',
        '["Procedimientos para operar en pistas afectadas por nieve, hielo, agua, caucho u otros contaminantes", "Procedimientos para limpiar pistas", "Procedimientos para operar en aeropuertos con problemas medioambientales", "Procedimientos para despegar con contaminación en los motores"]',
        'Procedimientos para operar en pistas afectadas por nieve, hielo, agua, caucho u otros contaminantes',
        'Los procedimientos para pistas contaminadas establecen ajustes para despegue y aterrizaje cuando la superficie está afectada por contaminantes como nieve, hielo, agua o caucho. Incluyen cálculos de rendimiento ajustados, técnicas de control específicas y consideraciones adicionales de distancia requerida.',
        2
    ),
    (
        'operational',
        '¿Qué es un procedimiento de reencendido de motor en vuelo?',
        '["Un procedimiento para reiniciar un motor que se ha apagado durante el vuelo", "Un procedimiento para aumentar la potencia del motor", "Un procedimiento para abortar un despegue", "Un procedimiento para probar los motores antes del despegue"]',
        'Un procedimiento para reiniciar un motor que se ha apagado durante el vuelo',
        'Los procedimientos de reencendido de motor en vuelo son secuencias específicas de acciones para intentar reiniciar un motor que se ha apagado durante el vuelo. Varían según el tipo de aeronave y motores, pero generalmente incluyen verificaciones, ajustes de combustible y aire, y secuencias de encendido específicas.',
        1
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'operational'
    )
WHERE id = 'operational';