-- Preguntas para la categoría: Meteorología (meteorology)
-- Lote 1: Preguntas básicas sobre meteorología
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'meteorology',
        '¿Cuál es la tasa de enfriamiento estándar en la atmósfera?',
        '[{"text": "1.0°C por 1000 pies"}, {"text": "1.5°C por 1000 pies"}, {"text": "2.0°C por 1000 pies"}, {"text": "3.0°C por 1000 pies"}]',
        '2.0°C por 1000 pies',
        'La tasa de enfriamiento estándar o gradiente adiabático seco en la atmósfera es de aproximadamente 2.0°C por cada 1000 pies de altitud.',
        1
    ),
    (
        'meteorology',
        '¿Qué tipo de nube está asociada con tormentas?',
        '[{"text": "Cirrus"}, {"text": "Stratus"}, {"text": "Cumulus"}, {"text": "Cumulonimbus"}]',
        'Cumulonimbus',
        'Las nubes Cumulonimbus son nubes verticales de gran desarrollo que pueden alcanzar la troposfera superior y están asociadas con tormentas eléctricas y condiciones meteorológicas severas.',
        1
    ),
    (
        'meteorology',
        '¿Qué es el punto de rocío?',
        '[{"text": "La temperatura a la que comienza a caer la lluvia"}, {"text": "La temperatura a la que el vapor de agua comienza a condensarse"}, {"text": "La temperatura del suelo al amanecer"}, {"text": "La temperatura a la que se forman cristales de hielo"}]',
        'La temperatura a la que el vapor de agua comienza a condensarse',
        'El punto de rocío es la temperatura a la que el aire debe enfriarse para que se sature de vapor de agua y comience la condensación, formando rocío, niebla o nubes.',
        1
    ),
    (
        'meteorology',
        '¿Qué causa el viento?',
        '["Las diferencias de presión atmosférica", "La rotación de la Tierra", "La atracción gravitatoria de la Luna", "La cantidad de humedad en el aire"]',
        'Las diferencias de presión atmosférica',
        'El viento es causado principalmente por diferencias de presión atmosférica. El aire se mueve de áreas de alta presión a áreas de baja presión.',
        1
    ),
    (
        'meteorology',
        '¿Qué es una inversión térmica?',
        '["Una disminución de temperatura con la altitud", "Un aumento de temperatura con la altitud", "Una temperatura constante con la altitud", "Fluctuaciones rápidas de temperatura"]',
        'Un aumento de temperatura con la altitud',
        'Una inversión térmica ocurre cuando la temperatura aumenta con la altitud, lo cual es contrario a la condición normal de disminución de temperatura con la altura.',
        2
    ),
    (
        'meteorology',
        '¿Qué fenómeno meteorológico está asociado con el efecto Coriolis?',
        '["Huracanes", "Tornados", "Monzones", "Todos los anteriores"]',
        'Todos los anteriores',
        'El efecto Coriolis influye en la dirección del viento y las corrientes oceánicas, afectando a fenómenos meteorológicos a gran escala como huracanes, tornados y monzones.',
        2
    ),
    (
        'meteorology',
        '¿Cuál es la principal causa de la niebla?',
        '["Enfriamiento rápido del aire", "Aire cálido moviéndose sobre una superficie fría", "Mayor radiación solar", "Altos niveles de presión atmosférica"]',
        'Enfriamiento rápido del aire',
        'La niebla se forma típicamente cuando el aire cerca del suelo se enfría rápidamente, causando que el vapor de agua se condense en pequeñas gotas de agua suspendidas en el aire.',
        2
    ),
    (
        'meteorology',
        '¿Qué proporciona un METAR?',
        '["Pronósticos meteorológicos a largo plazo", "Condiciones meteorológicas actuales en un aeropuerto", "Informes meteorológicos para pilotos", "Imágenes satelitales"]',
        'Condiciones meteorológicas actuales en un aeropuerto',
        'Un METAR (Meteorological Terminal Aviation Routine Weather Report) proporciona información sobre las condiciones meteorológicas actuales en un aeropuerto, incluyendo temperatura, viento, visibilidad y cobertura de nubes.',
        1
    ),
    (
        'meteorology',
        '¿Qué es la corriente en chorro (jet stream)?',
        '["Un río de aire a alta velocidad en la atmósfera superior", "Un tipo de motor de avión", "Una corriente oceánica cálida", "Un tipo de satélite meteorológico"]',
        'Un río de aire a alta velocidad en la atmósfera superior',
        'La corriente en chorro o jet stream es un flujo de aire rápido y serpenteante en la alta atmósfera que tiene una influencia significativa en los patrones climáticos.',
        2
    ),
    (
        'meteorology',
        '¿Cuál es la diferencia entre un frente frío y un frente cálido?',
        '["Velocidad y dirección", "Temperatura y humedad", "Formación de nubes y precipitación", "Todas las anteriores"]',
        'Todas las anteriores',
        'Los frentes fríos y cálidos difieren en velocidad, dirección, temperatura, humedad, formación de nubes y patrones de precipitación.',
        2
    );
-- Lote 2: Preguntas sobre predicción del tiempo y fenómenos meteorológicos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'meteorology',
        '¿Qué es la CAT (Clear Air Turbulence)?',
        '["Turbulencia en aire claro sin nubes visibles", "Un tipo de nube de alta altitud", "Una zona de baja presión", "Un frente meteorológico estacionario"]',
        'Turbulencia en aire claro sin nubes visibles',
        'La CAT (Clear Air Turbulence) es turbulencia que ocurre en ausencia de nubes visibles, generalmente a altitudes de crucero y a menudo asociada con la corriente en chorro.',
        2
    ),
    (
        'meteorology',
        '¿Qué causa el engelamiento del carburador en motores de pistón?',
        '["Alta temperatura exterior", "Baja humedad relativa", "Evaporación de combustible y expansión de aire", "Altos niveles de contaminación"]',
        'Evaporación de combustible y expansión de aire',
        'El engelamiento del carburador se produce debido al enfriamiento causado por la evaporación del combustible y la expansión del aire, lo que puede hacer que la humedad en el aire se congele en el carburador.',
        2
    ),
    (
        'meteorology',
        '¿Qué tipo de nubes indican generalmente buen tiempo?',
        '["Nimbostratus", "Cumulonimbus", "Cirrus y Cirrocumulus", "Stratus bajos"]',
        'Cirrus y Cirrocumulus',
        'Las nubes Cirrus y Cirrocumulus de gran altitud generalmente indican buen tiempo, aunque pueden preceder a un frente cálido por 24 a 36 horas.',
        1
    ),
    (
        'meteorology',
        '¿Qué es una tormenta de arena?',
        '["Un tipo de frente frío", "Una masa de aire que mueve partículas de arena y polvo", "Un huracán sobre el desierto", "Un tipo de tornado"]',
        'Una masa de aire que mueve partículas de arena y polvo',
        'Una tormenta de arena es un fenómeno meteorológico donde vientos fuertes levantan y transportan partículas de arena y polvo, reduciendo significativamente la visibilidad.',
        1
    ),
    (
        'meteorology',
        '¿Qué es una SIGMET?',
        '["Un tipo de radar meteorológico", "Un informe de condiciones meteorológicas significativas", "Un plan de vuelo especial", "Un tipo de estación meteorológica"]',
        'Un informe de condiciones meteorológicas significativas',
        'SIGMET (Significant Meteorological Information) es un aviso de condiciones meteorológicas que pueden afectar la seguridad de todas las aeronaves, como tormentas severas o turbulencia extrema.',
        2
    ),
    (
        'meteorology',
        '¿Qué es el ITCZ (Intertropical Convergence Zone)?',
        '["Una zona de baja presión cerca del ecuador", "Un frente polar", "Una zona de alta presión en los trópicos", "La frontera entre dos masas de aire frío"]',
        'Una zona de baja presión cerca del ecuador',
        'La ITCZ es una banda de nubes, precipitaciones y tormentas que rodea el planeta cerca del ecuador donde convergen los vientos alisios del hemisferio norte y sur.',
        3
    ),
    (
        'meteorology',
        '¿Qué significa CAVOK en un informe meteorológico?',
        '["Nubes y visibilidad limitada", "Ceiling And Visibility OK", "Condiciones adversas para el vuelo", "Vuelo cancelado por visibilidad"]',
        'Ceiling And Visibility OK',
        'CAVOK (Ceiling And Visibility OK) indica que la visibilidad es de 10 km o más, no hay nubes por debajo de 5000 pies y no hay condiciones meteorológicas significativas.',
        1
    ),
    (
        'meteorology',
        '¿Qué es un microburst?',
        '["Una ráfaga de viento horizontal", "Una corriente ascendente intensa", "Una columna de aire descendente intensa de pequeño diámetro", "Un tipo de tormenta eléctrica miniatura"]',
        'Una columna de aire descendente intensa de pequeño diámetro',
        'Un microburst es una columna de aire descendente muy intensa y localizada que impacta en el suelo y se extiende horizontalmente. Es particularmente peligroso durante el despegue y aterrizaje de aeronaves.',
        2
    ),
    (
        'meteorology',
        '¿Qué es la presión QNH?',
        '["Presión a nivel de la pista", "Presión al nivel del mar", "Altitud de densidad", "Presión estándar a nivel del mar"]',
        'Presión al nivel del mar',
        'QNH es el ajuste de altímetro que proporciona la elevación sobre el nivel del mar cuando la aeronave está en tierra. Es la presión atmosférica local reducida al nivel medio del mar.',
        1
    ),
    (
        'meteorology',
        '¿Qué son las ondas de montaña?',
        '["Olas en lagos de montaña", "Ondulaciones en el terreno montañoso", "Ondulaciones en la atmósfera causadas por el flujo de aire sobre montañas", "Un tipo de frente meteorológico en regiones montañosas"]',
        'Ondulaciones en la atmósfera causadas por el flujo de aire sobre montañas',
        'Las ondas de montaña son oscilaciones atmosféricas que se producen cuando una corriente de aire estable cruza una cadena montañosa, causando ondulaciones en el flujo de aire corriente abajo.',
        2
    );
-- Lote 3: Preguntas avanzadas sobre meteorología aeronáutica
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'meteorology',
        '¿Qué es la altitud de densidad?',
        '["La altitud indicada corregida por temperatura y presión", "La altura sobre el nivel del mar", "La altura sobre el terreno", "La altitud de crucero estándar"]',
        'La altitud indicada corregida por temperatura y presión',
        'La altitud de densidad es la altitud de presión corregida por temperaturas no estándar. Representa la densidad del aire en términos de una altitud en la atmósfera estándar.',
        2
    ),
    (
        'meteorology',
        '¿Qué causa la turbulencia en aire claro (CAT)?',
        '["La convección térmica", "La cizalladura del viento", "La fricción con el terreno", "La convergencia de masas de aire"]',
        'La cizalladura del viento',
        'La turbulencia en aire claro (CAT) es principalmente causada por la cizalladura del viento, especialmente cerca de las corrientes en chorro donde existen grandes variaciones en la velocidad del viento.',
        3
    ),
    (
        'meteorology',
        '¿Qué es un TAF?',
        '["Terminal Area Forecast", "Temporal Aviation Forecast", "Terrain Alert Function", "Takeoff And Flight report"]',
        'Terminal Area Forecast',
        'TAF (Terminal Area Forecast) es un pronóstico meteorológico para un aeropuerto y sus alrededores, generalmente válido por 24 a 30 horas.',
        1
    ),
    (
        'meteorology',
        '¿Qué información proporciona una carta de tiempo significativo?',
        '["Solo información de vientos", "Solo información de nubes", "Fenómenos meteorológicos significativos para la aviación", "Únicamente zonas de turbulencia"]',
        'Fenómenos meteorológicos significativos para la aviación',
        'Una carta de tiempo significativo muestra información sobre nubes, turbulencia, engelamiento, tormentas y otros fenómenos meteorológicos importantes para la planificación de vuelos.',
        2
    ),
    (
        'meteorology',
        '¿Qué es la estabilidad atmosférica?',
        '["La tendencia de una masa de aire a acelerar verticalmente", "La tendencia de una masa de aire a resistir el movimiento vertical", "El grado de humedad en el aire", "La fuerza del viento"]',
        'La tendencia de una masa de aire a resistir el movimiento vertical',
        'La estabilidad atmosférica se refiere a la resistencia de la atmósfera al movimiento vertical. Una atmósfera estable resiste el movimiento vertical, mientras que una inestable favorece el movimiento vertical.',
        2
    ),
    (
        'meteorology',
        '¿Cuál de estos fenómenos NO es típico de un frente frío?',
        '["Nubes cumuliformes", "Precipitación intensa y breve", "Ascenso gradual de nubes estratiformes", "Cambio rápido en la dirección del viento"]',
        'Ascenso gradual de nubes estratiformes',
        'El ascenso gradual de nubes estratiformes es típico de un frente cálido, no de un frente frío. Los frentes fríos suelen caracterizarse por nubes cumuliformes, precipitación intensa pero breve y cambios rápidos en la dirección del viento.',
        2
    ),
    (
        'meteorology',
        '¿Qué es una tromba marina?',
        '["Un tornado sobre el agua", "Una corriente ascendente sobre el mar", "Un tipo de tsunami", "Un huracán de pequeña escala"]',
        'Un tornado sobre el agua',
        'Una tromba marina es esencialmente un tornado que se forma o se desplaza sobre el agua, creando un vórtice visible de agua y spray.',
        1
    ),
    (
        'meteorology',
        '¿Qué es un sistema de alta presión?',
        '["Un área donde el aire converge y asciende", "Un área donde el aire diverge y desciende", "Una zona de baja presión atmosférica", "Una región con tormentas frecuentes"]',
        'Un área donde el aire diverge y desciende',
        'Un sistema de alta presión o anticiclón es un área donde la presión atmosférica es más alta que en las áreas circundantes. El aire desciende y diverge, generalmente asociado con cielos despejados y buen tiempo.',
        2
    ),
    (
        'meteorology',
        '¿Qué es el viento geostrófico?',
        '["Viento resultante del equilibrio entre la fuerza de gradiente de presión y la fuerza de Coriolis", "Viento causado por diferencias de temperatura", "Viento descendente en montañas", "Viento localizado cerca de la superficie terrestre"]',
        'Viento resultante del equilibrio entre la fuerza de gradiente de presión y la fuerza de Coriolis',
        'El viento geostrófico es un viento teórico que resulta del equilibrio entre la fuerza del gradiente de presión y la fuerza de Coriolis, fluyendo paralelo a las isobaras a altitudes donde la fricción con la superficie es insignificante.',
        3
    ),
    (
        'meteorology',
        '¿Qué causa el fenómeno de St. Elmo''s Fire?',
        '["Reflexión de la luz lunar en las nubes", "Descarga eléctrica de corona visible", "Refracción de la luz solar", "Combustión de gases en la atmósfera"]',
        'Descarga eléctrica de corona visible',
        'St. Elmo''s Fire es una descarga eléctrica luminosa tipo corona que se produce en puntas y bordes afilados de objetos durante tormentas eléctricas, causada por un fuerte campo eléctrico en la atmósfera.',
        2
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'meteorology'
    )
WHERE id = 'meteorology';