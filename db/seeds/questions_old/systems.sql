-- Preguntas para la categoría: Sistemas de Aeronaves (systems)
-- Lote 1: Preguntas sobre sistemas básicos de aeronaves
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'systems',
        '¿Cuál es la función principal del alerón en una aeronave?',
        '[{"text": "Controlar el cabeceo"}, {"text": "Controlar el alabeo"}, {"text": "Controlar la guiñada"}, {"text": "Aumentar la sustentación"}]',
        'Controlar el alabeo',
        'Los alerones son superficies de control ubicadas en los bordes de salida de las alas que, al moverse en direcciones opuestas, crean un movimiento de alabeo (roll) en el eje longitudinal de la aeronave.',
        1
    ),
    (
        'systems',
        '¿Qué sistema proporciona información sobre la actitud de la aeronave?',
        '[{"text": "Sistema de navegación"}, {"text": "Sistema hidráulico"}, {"text": "Sistema de instrumentos de vuelo"}, {"text": "Sistema de combustible"}]',
        'Sistema de instrumentos de vuelo',
        'El sistema de instrumentos de vuelo, particularmente el indicador de actitud o horizonte artificial, proporciona información sobre la posición de la aeronave con respecto al horizonte.',
        1
    ),
    (
        'systems',
        '¿Qué es un sistema pitot-estático?',
        '[{"text": "Un sistema de control de velocidad"}, {"text": "Un sistema que mide la presión para determinar velocidad y altitud"}, {"text": "Un componente del tren de aterrizaje"}, {"text": "Un sistema de control de combustible"}]',
        'Un sistema que mide la presión para determinar velocidad y altitud',
        'El sistema pitot-estático mide presiones de aire estático y dinámico para proporcionar información de velocidad aerodinámica, altitud y velocidad vertical.',
        1
    ),
    (
        'systems',
        '¿Cuál es la función del estabilizador horizontal en una aeronave?',
        '["Proporcionar estabilidad lateral", "Proporcionar estabilidad direccional", "Proporcionar estabilidad longitudinal", "Controlar la velocidad"]',
        'Proporcionar estabilidad longitudinal',
        'El estabilizador horizontal proporciona estabilidad longitudinal (estabilidad en el eje de cabeceo) y también sirve como punto de montaje para el elevador.',
        1
    ),
    (
        'systems',
        '¿Qué sistema se utiliza para evitar la formación de hielo en las alas?',
        '["Sistema de oxígeno", "Sistema anti-hielo o de deshielo", "Sistema hidráulico", "Sistema de combustible"]',
        'Sistema anti-hielo o de deshielo',
        'Los sistemas anti-hielo previenen la formación de hielo, mientras que los sistemas de deshielo eliminan el hielo ya formado en superficies críticas como alas, entradas de motor y hélices.',
        1
    ),
    (
        'systems',
        '¿Qué es un APU en una aeronave?',
        '["Unidad de Potencia Auxiliar", "Sistema de Control Automático del Piloto", "Unidad de Procesamiento Aviónico", "Unidad de Presurización Automática"]',
        'Unidad de Potencia Auxiliar',
        'El APU (Auxiliary Power Unit) es un pequeño motor que proporciona energía eléctrica, neumática e hidráulica cuando los motores principales no están funcionando, típicamente en tierra.',
        1
    ),
    (
        'systems',
        '¿Cuál es la función principal de los flaps?',
        '["Aumentar la sustentación y el arrastre", "Reducir la velocidad de crucero", "Controlar la dirección en tierra", "Mantener la estabilidad a altas velocidades"]',
        'Aumentar la sustentación y el arrastre',
        'Los flaps son dispositivos hipersustentadores que se extienden desde el borde de salida del ala para aumentar la sustentación y el arrastre, permitiendo despegues y aterrizajes a velocidades más bajas.',
        1
    ),
    (
        'systems',
        '¿Qué es un sistema FADEC?',
        '["Control Digital Electrónico del Motor Completo", "Sistema de Combustible para Motores de Alta Compresión", "Dispositivo de Control de Flujo de Aire", "Sistema de Navegación Avanzada"]',
        'Control Digital Electrónico del Motor Completo',
        'FADEC (Full Authority Digital Engine Control) es un sistema que controla todos los aspectos del funcionamiento del motor, optimizando su rendimiento y eficiencia.',
        2
    ),
    (
        'systems',
        '¿Qué componente del motor a reacción comprime el aire antes de que entre a la cámara de combustión?',
        '["Turbina", "Compresor", "Tobera de escape", "Cámara de combustión"]',
        'Compresor',
        'El compresor en un motor a reacción está diseñado para aumentar la presión del aire antes de que entre en la cámara de combustión, lo que mejora la eficiencia de la combustión.',
        1
    ),
    (
        'systems',
        '¿Cuál es la función principal del sistema hidráulico en una aeronave?',
        '["Proporcionar electricidad", "Proporcionar fuerza para mover superficies de control y otros sistemas", "Controlar la temperatura de la cabina", "Gestionar el combustible"]',
        'Proporcionar fuerza para mover superficies de control y otros sistemas',
        'El sistema hidráulico utiliza fluido presurizado para transmitir potencia y operar varios componentes como superficies de control, tren de aterrizaje, frenos y otros sistemas que requieren fuerza mecánica.',
        1
    );
-- Lote 2: Preguntas sobre aviónica y sistemas eléctricos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'systems',
        '¿Qué es un sistema de vuelo fly-by-wire?',
        '["Un sistema de control por cables mecánicos", "Un sistema de control que sustituye los controles mecánicos por señales electrónicas", "Un simulador de vuelo", "Un sistema de piloto automático"]',
        'Un sistema de control que sustituye los controles mecánicos por señales electrónicas',
        'En un sistema fly-by-wire, los movimientos de los controles del piloto se convierten en señales electrónicas que son procesadas por computadoras y transmitidas a actuadores que mueven las superficies de control.',
        2
    ),
    (
        'systems',
        '¿Qué es un TCAS?',
        '["Sistema de Alerta de Tráfico y Evasión de Colisiones", "Sistema de Control de Aproximación Terminal", "Sistema de Comunicación Aérea Táctica", "Sistema de Análisis de Condiciones Térmicas"]',
        'Sistema de Alerta de Tráfico y Evasión de Colisiones',
        'TCAS (Traffic Collision Avoidance System) es un sistema diseñado para reducir el riesgo de colisiones entre aeronaves en vuelo, proporcionando alertas y recomendaciones de resolución.',
        2
    ),
    (
        'systems',
        '¿Cuál es la función del radar meteorológico en una aeronave?',
        '["Detectar otras aeronaves", "Detectar turbulencia y precipitación", "Navegar usando señales terrestres", "Comunicarse con el control de tráfico aéreo"]',
        'Detectar turbulencia y precipitación',
        'El radar meteorológico de a bordo detecta condiciones meteorológicas adversas como tormentas, turbulencia y precipitación, permitiendo a los pilotos evitar áreas peligrosas.',
        1
    ),
    (
        'systems',
        '¿Qué es el sistema GPWS?',
        '["Sistema de Posicionamiento Global", "Sistema de Advertencia de Proximidad al Suelo", "Sistema de Vuelo Guiado por Piloto", "Sistema de Monitoreo de Rendimiento Global"]',
        'Sistema de Advertencia de Proximidad al Suelo',
        'GPWS (Ground Proximity Warning System) alerta a los pilotos cuando la aeronave está en peligro de impactar con el terreno, ayudando a prevenir accidentes CFIT (Controlled Flight Into Terrain).',
        2
    ),
    (
        'systems',
        '¿Qué proporciona un sistema ILS?',
        '["Navegación en ruta", "Comunicación aire-tierra", "Guía de aproximación precisa", "Información meteorológica"]',
        'Guía de aproximación precisa',
        'ILS (Instrument Landing System) proporciona guía lateral y vertical precisa para una aeronave durante la aproximación y el aterrizaje, especialmente en condiciones de baja visibilidad.',
        1
    ),
    (
        'systems',
        '¿Qué es un VOR?',
        '["Very Old Radio", "Visual Orientation Range", "Very High Frequency Omnidirectional Range", "Variable Oscillation Receiver"]',
        'Very High Frequency Omnidirectional Range',
        'VOR es una ayuda a la navegación que proporciona información de rumbo magnético a la aeronave, permitiendo seguir rutas específicas o radiales desde o hacia la estación VOR.',
        1
    ),
    (
        'systems',
        '¿Cuál es la función principal del alternador en un sistema eléctrico de aeronave?',
        '["Almacenar energía eléctrica", "Convertir energía mecánica en eléctrica", "Distribuir electricidad", "Regular el voltaje"]',
        'Convertir energía mecánica en eléctrica',
        'El alternador convierte la energía mecánica del motor en energía eléctrica para alimentar los sistemas de la aeronave y recargar la batería durante el vuelo.',
        1
    ),
    (
        'systems',
        '¿Qué es un EFIS?',
        '["Sistema de Instrumentos de Vuelo Electrónicos", "Sistema de Inyección de Combustible Mejorado", "Sistema de Información de Emergencia para Vuelo", "Sistema de Identificación de Fallas del Motor"]',
        'Sistema de Instrumentos de Vuelo Electrónicos',
        'EFIS (Electronic Flight Instrument System) reemplaza los instrumentos mecánicos tradicionales con pantallas digitales, proporcionando información integrada de vuelo y navegación.',
        2
    ),
    (
        'systems',
        '¿Qué es un INS?',
        '["Sistema de Navegación por Internet", "Sistema de Navegación Inercial", "Sistema de Instrumentación Nocturna", "Sistema de Información de Notificación"]',
        'Sistema de Navegación Inercial',
        'El Sistema de Navegación Inercial (INS) utiliza acelerómetros y giróscopos para calcular continuamente la posición, velocidad y actitud de la aeronave sin necesidad de referencias externas.',
        2
    ),
    (
        'systems',
        '¿Qué son los circuit breakers en una aeronave?',
        '["Controladores de velocidad", "Dispositivos de protección contra sobrecarga eléctrica", "Interruptores de comunicación", "Reguladores de presión"]',
        'Dispositivos de protección contra sobrecarga eléctrica',
        'Los circuit breakers (disyuntores) protegen los sistemas eléctricos de la aeronave interrumpiendo el flujo de corriente en caso de sobrecarga o cortocircuito.',
        1
    );
-- Lote 3: Preguntas sobre sistemas de propulsión y otros sistemas especializados
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'systems',
        '¿Cuál es la función de los spoilers en una aeronave?',
        '["Aumentar la sustentación", "Reducir la sustentación y aumentar el arrastre", "Mejorar el control direccional", "Reducir la resistencia durante el crucero"]',
        'Reducir la sustentación y aumentar el arrastre',
        'Los spoilers se despliegan desde la superficie superior del ala para reducir la sustentación y aumentar el arrastre, ayudando en el descenso, la deceleración en vuelo y el frenado durante el aterrizaje.',
        1
    ),
    (
        'systems',
        '¿Qué es el sistema de presurización de cabina?',
        '["Un sistema que regula la temperatura", "Un sistema que mantiene niveles adecuados de presión de aire", "Un sistema de oxígeno de emergencia", "Un sistema de control de humedad"]',
        'Un sistema que mantiene niveles adecuados de presión de aire',
        'El sistema de presurización mantiene una presión de aire respirable dentro de la cabina a grandes altitudes donde la presión atmosférica natural sería demasiado baja para la supervivencia humana.',
        1
    ),
    (
        'systems',
        '¿Qué es un sistema EGPWS?',
        '["Sistema de Posicionamiento GPS Mejorado", "Sistema Mejorado de Advertencia de Proximidad al Suelo", "Sistema de Monitoreo de Gases de Escape", "Sistema de Entrada de Datos de Plan de Vuelo Electrónico"]',
        'Sistema Mejorado de Advertencia de Proximidad al Suelo',
        'EGPWS (Enhanced Ground Proximity Warning System) es una versión avanzada del GPWS que utiliza una base de datos de terreno y GPS para proporcionar alertas más precisas y anticipadas de colisión potencial con el terreno.',
        2
    ),
    (
        'systems',
        '¿Qué es un motor turbofan?',
        '["Un motor de pistón con turbocompresor", "Un motor a reacción donde parte del flujo de aire pasa por el núcleo y parte alrededor", "Un motor a reacción utilizado exclusivamente en helicópteros", "Un motor que utiliza combustible alternativo"]',
        'Un motor a reacción donde parte del flujo de aire pasa por el núcleo y parte alrededor',
        'Un motor turbofan es un tipo de motor a reacción que tiene un ventilador en la parte delantera que desvía parte del aire alrededor del núcleo del motor (bypass), mejorando la eficiencia y reduciendo el ruido.',
        2
    ),
    (
        'systems',
        '¿Cuál es la función del inversor de empuje?',
        '["Aumentar el empuje durante el despegue", "Revertir la dirección del empuje para ayudar a frenar", "Mejorar la eficiencia de combustible", "Reducir el ruido del motor"]',
        'Revertir la dirección del empuje para ayudar a frenar',
        'El inversor de empuje redirecciona el flujo de gases de escape o el flujo de aire del bypass hacia adelante, creando una fuerza que ayuda a desacelerar la aeronave después del aterrizaje.',
        1
    ),
    (
        'systems',
        '¿Qué es un autothrottle?',
        '["Un dispositivo que monitorea automáticamente el combustible", "Un sistema que controla automáticamente la potencia del motor", "Un control manual del acelerador", "Un sistema de emergencia para corte de combustible"]',
        'Un sistema que controla automáticamente la potencia del motor',
        'El autothrottle es un sistema que ajusta automáticamente la potencia del motor para mantener parámetros establecidos como velocidad, número Mach o empuje, reduciendo la carga de trabajo del piloto.',
        2
    ),
    (
        'systems',
        '¿Qué es el sistema Bleed Air?',
        '["Un sistema de refrigeración del motor", "Aire a presión extraído del compresor del motor", "Un sistema de lubricación", "Un sistema de ventilación de emergencia"]',
        'Aire a presión extraído del compresor del motor',
        'El sistema Bleed Air utiliza aire comprimido extraído de las etapas del compresor del motor para varios sistemas como presurización de cabina, sistemas anti-hielo, arranque de motores y aire acondicionado.',
        2
    ),
    (
        'systems',
        '¿Qué ventaja tiene un sistema de combustible presurizado?',
        '["Reduce el peso total de combustible", "Previene la formación de vapor lock", "Aumenta la octanaje del combustible", "Simplifica el diseño del sistema"]',
        'Previene la formación de vapor lock',
        'Un sistema de combustible presurizado mantiene el combustible bajo presión para evitar la formación de burbujas de vapor (vapor lock) a grandes altitudes donde disminuye la presión atmosférica.',
        2
    ),
    (
        'systems',
        '¿Qué es el sistema FMS?',
        '["Flight Motion Stabilizer", "Fuel Management System", "Flight Management System", "Forward Monitoring System"]',
        'Flight Management System',
        'El FMS (Flight Management System) es un sistema computarizado que integra navegación, gestión de rendimiento, planificación de vuelo y otras funciones para optimizar la operación de la aeronave.',
        2
    ),
    (
        'systems',
        '¿Cuál es la función del compensador (trim) en una aeronave?',
        '["Aumentar el empuje del motor", "Reducir las fuerzas de control para mantener la actitud deseada", "Mejorar la visibilidad del piloto", "Aumentar la sustentación durante el despegue"]',
        'Reducir las fuerzas de control para mantener la actitud deseada',
        'El compensador o trim ajusta la posición neutral de las superficies de control para reducir las fuerzas que el piloto necesita aplicar en los controles, facilitando mantener una actitud de vuelo específica.',
        1
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'systems'
    )
WHERE id = 'systems';