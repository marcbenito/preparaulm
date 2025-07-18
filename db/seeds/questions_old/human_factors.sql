-- Preguntas para la categoría: Factores Humanos (human_factors)
-- Lote 1: Conceptos básicos de factores humanos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'human_factors',
        '¿Qué es la fatiga en el contexto de la aviación?',
        '["Un estado temporal de reducción de la capacidad física y/o mental", "Un tipo de enfermedad respiratoria", "Un fallo mecánico en la aeronave", "Un procedimiento de emergencia"]',
        'Un estado temporal de reducción de la capacidad física y/o mental',
        'La fatiga en aviación se refiere a un estado fisiológico de capacidad reducida para realizar actividades físicas o mentales, generalmente asociado con falta de sueño, ciclos circadianos alterados o carga de trabajo prolongada.',
        1
    ),
    (
        'human_factors',
        '¿Qué significa el acrónimo SHELL en factores humanos?',
        '["Software, Hardware, Environment, Liveware, Liveware", "System, Human, Equipment, Learning, Liability", "Safety, Health, Environment, Life, Logistics", "Simulation, Hierarchy, Experience, Logic, Learning"]',
        'Software, Hardware, Environment, Liveware, Liveware',
        'El modelo SHELL describe la interacción entre Software (procedimientos), Hardware (equipos), Environment (entorno), y Liveware (elemento humano), con Liveware central interactuando con los demás componentes.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la hipoxia?',
        '["Exceso de oxígeno en la sangre", "Deficiencia de oxígeno en tejidos corporales", "Aumento de la presión sanguínea", "Reducción del ritmo cardíaco"]',
        'Deficiencia de oxígeno en tejidos corporales',
        'La hipoxia es una condición en la que el cuerpo o una región del cuerpo está privada de un suministro adecuado de oxígeno. En aviación, puede ocurrir a gran altitud y afectar severamente el juicio y las capacidades psicomotoras.',
        1
    ),
    (
        'human_factors',
        '¿Qué es el efecto túnel en factores humanos?',
        '["Concentración excesiva en un instrumento específico ignorando otros", "Un tipo de ilusión visual durante el vuelo nocturno", "Una técnica de comunicación", "Un procedimiento de despegue"]',
        'Concentración excesiva en un instrumento específico ignorando otros',
        'El efecto túnel o visión túnel es un fenómeno psicológico donde la atención se concentra excesivamente en un estímulo o aspecto específico, ignorando información periférica importante.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la desorientación espacial?',
        '["Incapacidad para determinar con precisión la posición, movimiento o actitud de la aeronave", "Incapacidad para leer mapas", "Incapacidad para comunicarse con ATC", "Incapacidad para operar los controles de la aeronave"]',
        'Incapacidad para determinar con precisión la posición, movimiento o actitud de la aeronave',
        'La desorientación espacial ocurre cuando un piloto no puede determinar correctamente su posición, altitud o la actitud de la aeronave en relación con el horizonte, a menudo debido a condiciones IMC o ilusiones sensoriales.',
        1
    ),
    (
        'human_factors',
        '¿Qué es el CRM (Crew Resource Management)?',
        '["Un sistema para gestionar el combustible", "Entrenamiento en gestión efectiva de todos los recursos disponibles para optimizar la seguridad", "Un procedimiento de mantenimiento", "Un sistema de navegación"]',
        'Entrenamiento en gestión efectiva de todos los recursos disponibles para optimizar la seguridad',
        'CRM es un conjunto de principios y técnicas diseñadas para maximizar la seguridad mediante el uso eficiente de todos los recursos disponibles: humanos, información y equipos. Enfatiza la comunicación, liderazgo y toma de decisiones.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la ilusión de falsa inclinación?',
        '["Sensación de inclinación cuando la aeronave está nivelada", "Un error en el indicador de actitud", "Una falla en el sistema hidráulico", "Un error en la lectura del altímetro"]',
        'Sensación de inclinación cuando la aeronave está nivelada',
        'La ilusión de falsa inclinación es una ilusión vestibular donde el piloto percibe erróneamente que la aeronave está inclinada cuando en realidad está nivelada, o viceversa. Puede ocurrir durante aceleraciones, desaceleraciones o vuelo en condiciones IMC.',
        2
    ),
    (
        'human_factors',
        '¿Qué es el efecto de la hipoxia en el juicio del piloto?',
        '["Mejora el juicio y la toma de decisiones", "No tiene efecto en el juicio", "Deteriora el juicio sin que el piloto sea consciente", "Solo afecta la visión, no el juicio"]',
        'Deteriora el juicio sin que el piloto sea consciente',
        'La hipoxia deteriora gradualmente las funciones cognitivas, incluyendo el juicio, la toma de decisiones y el tiempo de reacción. Lo más peligroso es que el piloto suele no ser consciente del deterioro y puede sentirse eufórico o confiado.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la complacencia en aviación?',
        '["Estado de satisfacción que puede llevar a una reducción de vigilancia", "Un procedimiento para calmar a pasajeros nerviosos", "Una técnica de comunicación", "Un tipo de fatiga"]',
        'Estado de satisfacción que puede llevar a una reducción de vigilancia',
        'La complacencia es un estado de satisfacción o confianza excesiva que puede resultar en una reducción de la vigilancia y atención a los detalles, especialmente en tareas rutinarias o cuando se utilizan sistemas automatizados.',
        1
    ),
    (
        'human_factors',
        '¿Qué es el efecto túnel auditivo?',
        '["Concentrarse en un solo canal de comunicación ignorando otros", "Un problema de audición causado por cambios de presión", "Un tipo de ruido en los auriculares", "Una técnica para mejorar la comunicación"]',
        'Concentrarse en un solo canal de comunicación ignorando otros',
        'El efecto túnel auditivo ocurre cuando la atención auditiva se concentra excesivamente en una fuente específica de información, como una frecuencia de radio, ignorando otras comunicaciones importantes o alertas.',
        2
    );
-- Lote 2: Gestión del error y factores psicológicos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'human_factors',
        '¿Qué es el modelo "queso suizo" de James Reason?',
        '["Un modelo nutricional para pilotos", "Un modelo que explica cómo múltiples barreras defensivas pueden ser penetradas causando accidentes", "Un sistema de navegación", "Un tipo de aproximación"]',
        'Un modelo que explica cómo múltiples barreras defensivas pueden ser penetradas causando accidentes',
        'El modelo del "queso suizo" describe cómo los accidentes ocurren cuando múltiples defensas, barreras y salvaguardias (representadas como lonchas de queso con agujeros) se alinean permitiendo que un peligro cause daño.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la carga de trabajo en el contexto de factores humanos?',
        '["El peso total de la aeronave", "La cantidad de tareas mentales y físicas que debe realizar una persona", "El número de horas de vuelo acumuladas", "El número de pasajeros en un vuelo"]',
        'La cantidad de tareas mentales y físicas que debe realizar una persona',
        'La carga de trabajo se refiere a la demanda mental y física impuesta a un individuo al realizar tareas específicas. Una carga excesiva puede provocar errores, fatiga y pérdida de conciencia situacional.',
        1
    ),
    (
        'human_factors',
        '¿Qué es el error de confirmación?',
        '["Tendencia a buscar información que confirme nuestras creencias preexistentes", "Error en la confirmación de un plan de vuelo", "Incapacidad para confirmar instrucciones de ATC", "Error en la lectura de un instrumento"]',
        'Tendencia a buscar información que confirme nuestras creencias preexistentes',
        'El error de confirmación (o sesgo de confirmación) es la tendencia a interpretar, buscar y recordar información de manera que confirme las creencias o hipótesis previas, ignorando evidencia contradictoria.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la tolerancia al riesgo?',
        '["Capacidad para soportar turbulencias", "Willingness to accept a certain level of risk", "Un tipo de seguro de vuelo", "Una técnica de aterrizaje"]',
        'Willingness to accept a certain level of risk',
        'La tolerancia al riesgo es el nivel de riesgo que un individuo está dispuesto a aceptar. Varía según la personalidad, experiencia, presión de grupo, y puede cambiar en diferentes situaciones o bajo estrés.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la cultura de seguridad?',
        '["Un conjunto de procedimientos de seguridad", "El conjunto de valores, actitudes y comportamientos relacionados con la seguridad", "Un tipo de entrenamiento obligatorio", "Un departamento dentro de una aerolínea"]',
        'El conjunto de valores, actitudes y comportamientos relacionados con la seguridad',
        'La cultura de seguridad se refiere al conjunto de valores, prioridades, compromisos, y comportamientos compartidos en una organización respecto a la seguridad. Una cultura de seguridad positiva fomenta la comunicación abierta sobre riesgos y errores.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la cadena de errores?',
        '["Una secuencia de errores que contribuyen a un accidente", "Un tipo de comunicación entre pilotos", "Un sistema para reportar errores", "Un procedimiento de mantenimiento"]',
        'Una secuencia de errores que contribuyen a un accidente',
        'La cadena de errores se refiere a una serie de eventos, decisiones o acciones inadecuadas que, combinadas, conducen a un accidente o incidente. Interrumpir esta cadena en cualquier punto puede prevenir un desenlace negativo.',
        1
    ),
    (
        'human_factors',
        '¿Qué es el estrés agudo?',
        '["Estrés causado por un evento repentino e intenso", "Estrés acumulado durante largo tiempo", "Estrés causado específicamente por turbulencias", "Un tipo de enfermedad relacionada con la altitud"]',
        'Estrés causado por un evento repentino e intenso',
        'El estrés agudo es una respuesta intensa a un evento o situación específica, como una emergencia en vuelo. Puede mejorar el rendimiento a corto plazo (respuesta "lucha o huida") pero también puede deteriorar el juicio y la toma de decisiones.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la toma de decisiones aeronáuticas (ADM)?',
        '["Un enfoque sistemático para el proceso mental de tomar decisiones óptimas", "Un sistema automático de navegación", "Un procedimiento de emergencia", "Un tipo de lista de verificación"]',
        'Un enfoque sistemático para el proceso mental de tomar decisiones óptimas',
        'ADM (Aeronautical Decision Making) es un enfoque sistemático para analizar situaciones, evaluar opciones y reducir los riesgos asociados con cada decisión en el entorno aeronáutico.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la automatización de la cabina?',
        '["El uso de sistemas automáticos para reducir la carga de trabajo del piloto", "Un sistema de piloto automático", "Un sistema de control de temperatura en cabina", "Un sistema para controlar las luces de la cabina"]',
        'El uso de sistemas automáticos para reducir la carga de trabajo del piloto',
        'La automatización de cabina se refiere a los sistemas que automatizan tareas que tradicionalmente realizaban los pilotos manualmente. Incluye sistemas como piloto automático, gestión de vuelo y alertas automatizadas.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la complacencia por automatización?',
        '["Excesiva confianza en los sistemas automatizados", "Un tipo de sistema automático", "Un procedimiento para calibrar sistemas automáticos", "Un método para enseñar sobre automatización"]',
        'Excesiva confianza en los sistemas automatizados',
        'La complacencia por automatización es la tendencia a confiar excesivamente en sistemas automatizados, lo que puede llevar a una reducción en la vigilancia, monitoreo y capacidad para intervenir cuando estos sistemas fallan o funcionan incorrectamente.',
        2
    );
-- Lote 3: Fisiología de vuelo y gestión del desempeño
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'human_factors',
        '¿Cómo afecta la deshidratación al rendimiento del piloto?',
        '["No tiene efectos significativos", "Mejora la concentración y el tiempo de reacción", "Reduce la concentración, aumenta la fatiga y deteriora el rendimiento cognitivo", "Solo afecta en vuelos por encima de 10,000 pies"]',
        'Reduce la concentración, aumenta la fatiga y deteriora el rendimiento cognitivo',
        'La deshidratación, común en cabinas presurizadas con baja humedad, puede causar fatiga, dolor de cabeza, deterioro del juicio, tiempo de reacción más lento y menor capacidad para procesar información.',
        1
    ),
    (
        'human_factors',
        '¿Qué son las ilusiones visuales en aviación?',
        '["Trucos de magia realizados durante el vuelo", "Percepciones erróneas del entorno visual que pueden llevar a errores de juicio", "Problemas específicos con los instrumentos de la cabina", "Un tipo de enfermedad ocular"]',
        'Percepciones erróneas del entorno visual que pueden llevar a errores de juicio',
        'Las ilusiones visuales en aviación son interpretaciones incorrectas de lo que el piloto ve, causadas por factores como terreno engañoso, condiciones de luz, o movimiento. Pueden llevar a errores peligrosos en el control de la aeronave.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la ilusión somatogravic?',
        '["Una sensación de inclinación durante aceleración o desaceleración", "Una sensación de rotación durante giros", "Una percepción errónea de la altitud", "Un tipo de mareo por movimiento"]',
        'Una sensación de inclinación durante aceleración o desaceleración',
        'La ilusión somatogravic ocurre cuando la aceleración lineal se percibe incorrectamente como un cambio en la actitud de la aeronave. Por ejemplo, durante la aceleración, un piloto puede sentir que la aeronave está inclinada hacia arriba cuando está nivelada.',
        3
    ),
    (
        'human_factors',
        '¿Qué es el fenómeno del "crepúsculo negro"?',
        '["Un tipo de ilusión visual durante el vuelo nocturno", "La ausencia total de luz en vuelo espacial", "Un fenómeno meteorológico", "Una condición médica que afecta a los pilotos"]',
        'La ausencia total de luz en vuelo espacial',
        'El "crepúsculo negro" o "black-out" es un fenómeno experimentado por astronautas y pilotos a muy alta altitud donde el cielo aparece completamente negro debido a la ausencia de dispersión de luz en la atmósfera tenue.',
        3
    ),
    (
        'human_factors',
        '¿Qué es la ilusión de falsa horizontal?',
        '["Percibir incorrectamente el horizonte debido a terreno inclinado o condiciones de luz", "Un error en el indicador de actitud", "Una falla en el sistema de navegación", "Un tipo de error de cálculo"]',
        'Percibir incorrectamente el horizonte debido a terreno inclinado o condiciones de luz',
        'La ilusión de falsa horizontal ocurre cuando el piloto confunde características del terreno o luces con el horizonte real. Por ejemplo, luces de una ciudad en terreno inclinado pueden hacer que el piloto perciba incorrectamente la actitud de la aeronave.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la fatiga de decisión?',
        '["Cansancio físico que afecta la capacidad de decisión", "Deterioro en la capacidad de tomar decisiones debido a múltiples decisiones consecutivas", "Un tipo específico de fatiga muscular", "Incapacidad para decidir debido a hipoxia"]',
        'Deterioro en la capacidad de tomar decisiones debido a múltiples decisiones consecutivas',
        'La fatiga de decisión es el deterioro de la calidad de las decisiones que ocurre después de tomar múltiples decisiones consecutivas. El cerebro tiene recursos limitados para la toma de decisiones y puede agotarse, llevando a decisiones más impulsivas o a la postergación.',
        2
    ),
    (
        'human_factors',
        '¿Qué es el efecto halo en la evaluación de situaciones?',
        '["Tendencia a que una impresión general positiva influya en la evaluación de aspectos específicos", "Un tipo de ilusión óptica", "Un fenómeno meteorológico que afecta la visibilidad", "Un tipo de error de navegación"]',
        'Tendencia a que una impresión general positiva influya en la evaluación de aspectos específicos',
        'El efecto halo es un sesgo cognitivo donde la percepción general de una persona o situación influye en la evaluación de características específicas. Por ejemplo, un piloto con buena reputación podría recibir menos escrutinio por errores pequeños.',
        2
    ),
    (
        'human_factors',
        '¿Qué es la presión de grupo en el contexto de la aviación?',
        '["Presión en la cabina debido a la altitud", "Influencia de otros miembros de la tripulación o pares que puede llevar a tomar riesgos innecesarios", "Un tipo de emergencia médica", "Un procedimiento para evaluar el rendimiento de la tripulación"]',
        'Influencia de otros miembros de la tripulación o pares que puede llevar a tomar riesgos innecesarios',
        'La presión de grupo en aviación se refiere a la influencia social que puede llevar a un piloto a tomar decisiones que normalmente no tomaría solo, como volar en condiciones marginales o realizar maniobras arriesgadas para "demostrar" habilidad.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la gestión del riesgo en aviación?',
        '["Un tipo de seguro de vuelo", "Proceso sistemático de identificar peligros y mitigar riesgos", "Un procedimiento de emergencia", "Un sistema de mantenimiento preventivo"]',
        'Proceso sistemático de identificar peligros y mitigar riesgos',
        'La gestión del riesgo en aviación es un proceso estructurado para identificar peligros, evaluar la probabilidad e impacto de riesgos potenciales, y desarrollar estrategias para mitigarlos o eliminarlos.',
        1
    ),
    (
        'human_factors',
        '¿Qué es la "trampa de plan" en la toma de decisiones?',
        '["Tendencia a seguir con un plan original a pesar de cambios en la situación", "Un procedimiento de planificación de vuelo erróneo", "Un tipo de error en la programación de FMS", "Una falla en los sistemas de navegación"]',
        'Tendencia a seguir con un plan original a pesar de cambios en la situación',
        'La "trampa de plan" es la tendencia a aferrarse al plan original a pesar de que las condiciones han cambiado significativamente. Este sesgo puede llevar a los pilotos a continuar con un curso de acción peligroso por resistencia al cambio o compromiso excesivo con el plan inicial.',
        2
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'human_factors'
    )
WHERE id = 'human_factors';