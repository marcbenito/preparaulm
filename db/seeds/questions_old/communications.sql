-- Preguntas para la categoría: Comunicaciones Radio (communications)
-- Lote 1: Conceptos básicos de comunicaciones aeronáuticas
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'communications',
        '¿Qué significa "STANDBY" en comunicaciones aeronáuticas?',
        '["Espere, llamaré de nuevo", "Repita su mensaje", "Continúe con su mensaje", "Entendido"]',
        'Espere, llamaré de nuevo',
        '"STANDBY" significa que debe esperar. El controlador o estación terrestre llamará de nuevo. No es necesario que usted responda a esta instrucción ni mantenga la frecuencia ocupada confirmando que está esperando.',
        1
    ),
    (
        'communications',
        '¿Qué significa "WILCO" en comunicaciones aeronáuticas?',
        '["He recibido su mensaje y lo cumpliré", "Espere, llamaré de nuevo", "Repita su mensaje", "Entendido"]',
        'He recibido su mensaje y lo cumpliré',
        '"WILCO" es una contracción de "Will Comply" que significa "Cumpliré". Indica que el mensaje ha sido recibido, entendido y será cumplido. No debe usarse junto con "ROGER" ya que sería redundante.',
        1
    ),
    (
        'communications',
        '¿Qué significa "ROGER" en comunicaciones aeronáuticas?',
        '["He recibido toda su última transmisión", "Correcto", "Repita su mensaje", "Aprobado para proceder como se ha solicitado"]',
        'He recibido toda su última transmisión',
        '"ROGER" significa "He recibido toda su última transmisión". No implica aprobación, permiso o cumplimiento, simplemente acusa recibo del mensaje. Equivale a "recibido" o "copiado".',
        1
    ),
    (
        'communications',
        '¿Qué significa el término "SAY AGAIN" en comunicaciones aeronáuticas?',
        '["Repita todo o parte específica de su última transmisión", "Confirme que ha recibido mi mensaje", "Continúe con su mensaje", "Espere más instrucciones"]',
        'Repita todo o parte específica de su última transmisión',
        '"SAY AGAIN" se utiliza cuando se requiere la repetición de todo o parte de un mensaje que no se ha recibido correctamente. Puede especificarse la parte concreta que debe repetirse, por ejemplo: "SAY AGAIN ALTIMETER" o "SAY AGAIN ALL AFTER DEPARTURE".',
        1
    ),
    (
        'communications',
        '¿Qué significa "CLEARED FOR TAKEOFF" en comunicaciones aeronáuticas?',
        '["Autorización para despegar", "Autorización para entrar en la pista", "Autorización para iniciar el rodaje", "Autorización para alinearse en pista"]',
        'Autorización para despegar',
        '"CLEARED FOR TAKEOFF" es la autorización específica del ATC para que una aeronave despegue. No debe confundirse con otras autorizaciones como "LINE UP AND WAIT" (alinearse en pista y esperar) o "TAXI TO HOLDING POINT" (rodar al punto de espera).',
        1
    ),
    (
        'communications',
        '¿Qué significa "NEGATIVE" en comunicaciones aeronáuticas?',
        '["No, o permiso no concedido, o eso no es correcto, o no tengo capacidad", "Repita su mensaje", "Afirmativo", "Recibido"]',
        'No, o permiso no concedido, o eso no es correcto, o no tengo capacidad',
        '"NEGATIVE" se utiliza para expresar una negación, que algo no es correcto o que no se tiene capacidad para hacer algo solicitado. Es una forma estándar de decir "no" en comunicaciones aeronáuticas.',
        1
    ),
    (
        'communications',
        '¿Qué significa la abreviatura "QNH" en comunicaciones aeronáuticas?',
        '["Presión atmosférica al nivel del mar", "Presión atmosférica al nivel de la pista", "Ajuste altimétrico estándar (1013.2 hPa)", "Altura sobre el nivel del terreno"]',
        'Presión atmosférica al nivel del mar',
        'QNH es la presión atmosférica ajustada al nivel medio del mar utilizando la atmósfera estándar. Cuando se selecciona en el altímetro, éste indicará la altura sobre el nivel medio del mar mientras la aeronave está en tierra.',
        1
    ),
    (
        'communications',
        '¿Qué significa "MAYDAY" en comunicaciones aeronáuticas?',
        '["Señal de socorro que indica peligro grave e inminente", "Señal de urgencia que indica un problema sin peligro inmediato", "Solicitud para prioridad en el aterrizaje", "Aviso de condiciones meteorológicas peligrosas"]',
        'Señal de socorro que indica peligro grave e inminente',
        '"MAYDAY" es la señal de socorro internacional que indica que una aeronave está amenazada por un peligro grave e inminente y requiere asistencia inmediata. La llamada debe repetirse tres veces: "MAYDAY, MAYDAY, MAYDAY" seguida de la información esencial.',
        1
    ),
    (
        'communications',
        '¿Qué significa "PAN-PAN" en comunicaciones aeronáuticas?',
        '["Señal de urgencia que indica un problema sin peligro inmediato", "Señal de socorro que indica peligro grave e inminente", "Solicitud para prioridad en el despegue", "Aviso de pista cerrada"]',
        'Señal de urgencia que indica un problema sin peligro inmediato',
        '"PAN-PAN" es la señal de urgencia internacional que indica que una aeronave tiene un problema urgente pero que no requiere asistencia inmediata de emergencia. Se utiliza cuando existe preocupación por la seguridad de la aeronave o sus ocupantes, pero no hay peligro inmediato de vida.',
        1
    ),
    (
        'communications',
        '¿Qué significa "AFFIRM" en comunicaciones aeronáuticas?',
        '["Sí", "No", "Espere", "Repita"]',
        'Sí',
        '"AFFIRM" es el término estándar en comunicaciones aeronáuticas para decir "Sí". Se utiliza en lugar de "yes" o "sí" para evitar confusiones con "negative" o "three" en condiciones de mala calidad de transmisión.',
        1
    );
-- Lote 2: Fraseología y procedimientos de comunicación específicos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'communications',
        '¿Cómo se debe transmitir correctamente el nivel de vuelo 230 en comunicaciones aeronáuticas?',
        '["FLIGHT LEVEL TWO THREE ZERO", "FLIGHT LEVEL TWO THIRTY", "LEVEL TWO THREE ZERO", "ALTITUDE TWO THREE THOUSAND"]',
        'FLIGHT LEVEL TWO THREE ZERO',
        'Los niveles de vuelo deben transmitirse pronunciando cada dígito separadamente. La forma correcta es "FLIGHT LEVEL TWO THREE ZERO", no "two thirty" o "two hundred thirty", para evitar malentendidos.',
        1
    ),
    (
        'communications',
        '¿Qué significa "TRAFFIC IN SIGHT" en comunicaciones aeronáuticas?',
        '["He visto el tráfico que me han notificado", "Estoy buscando el tráfico", "No veo el tráfico", "Hay tráfico en la pista"]',
        'He visto el tráfico que me han notificado',
        '"TRAFFIC IN SIGHT" es la respuesta que debe dar un piloto cuando ha identificado visualmente el tráfico del que le ha informado el control de tráfico aéreo. Indica que el piloto ha establecido contacto visual con la otra aeronave.',
        1
    ),
    (
        'communications',
        '¿Qué significa "SQUAWK 7500" en comunicaciones aeronáuticas?',
        '["Código de emergencia para indicar un secuestro", "Código para indicar fallo de comunicaciones", "Código para indicar emergencia general", "Código estándar para vuelos VFR"]',
        'Código de emergencia para indicar un secuestro',
        'El código transponder 7500 es el código internacional que indica un secuestro o interferencia ilícita a bordo de la aeronave. Los otros códigos de emergencia son 7600 (fallo de comunicaciones) y 7700 (emergencia general).',
        1
    ),
    (
        'communications',
        '¿Qué significa "CLEARED TO LAND" en comunicaciones aeronáuticas?',
        '["Autorización para aterrizar en la pista designada", "Autorización para iniciar la aproximación final", "Autorización para entrar en el circuito de tráfico", "Autorización para descender a la altitud de circuito"]',
        'Autorización para aterrizar en la pista designada',
        '"CLEARED TO LAND" es la autorización específica dada por el control de tráfico aéreo para que una aeronave aterrice en una pista determinada. Sin esta autorización, una aeronave no debe aterrizar aunque esté realizando una aproximación.',
        1
    ),
    (
        'communications',
        '¿Qué significa "READ BACK" en comunicaciones aeronáuticas?',
        '["Repita todo mi mensaje o la parte especificada exactamente como lo ha recibido", "Lea nuevamente su último mensaje", "Confirme que ha entendido el mensaje", "Revise su información anterior"]',
        'Repita todo mi mensaje o la parte especificada exactamente como lo ha recibido',
        '"READ BACK" es una instrucción para repetir todo o parte específica de un mensaje exactamente como se ha recibido. Es un procedimiento esencial en comunicaciones críticas para la seguridad, como autorizaciones, instrucciones y específicamente en las relativas a niveles, códigos transponder, ajustes de altímetro, pistas en uso, etc.',
        1
    ),
    (
        'communications',
        '¿Qué significa "LINE UP AND WAIT" en comunicaciones aeronáuticas?',
        '["Entre en la pista y espere la autorización de despegue", "Alinéese con el eje de la pista desde su posición actual", "Mantenga posición antes del punto de espera", "Prepárese para el despegue inmediato"]',
        'Entre en la pista y espere la autorización de despegue',
        '"LINE UP AND WAIT" es la instrucción para entrar en la pista y alinearse en la dirección de despegue, pero esperar la autorización específica para despegar. Reemplaza a la antigua fraseología "Taxi into position and hold" en muchos países.',
        1
    ),
    (
        'communications',
        '¿Cómo se expresaría correctamente el mensaje para solicitar autorización de despegue?',
        '["[Indicativo] READY FOR DEPARTURE", "[Indicativo] READY FOR TAKEOFF", "[Indicativo] REQUEST TAKEOFF", "[Indicativo] DEPARTING NOW"]',
        '[Indicativo] READY FOR DEPARTURE',
        'La fraseología correcta es "[Indicativo] READY FOR DEPARTURE". Se utiliza "DEPARTURE" en lugar de "TAKEOFF" para evitar confusiones, ya que la palabra "TAKEOFF" solo debe utilizarse en la autorización específica "CLEARED FOR TAKEOFF" o en su cancelación.',
        1
    ),
    (
        'communications',
        '¿Qué significa "GO AROUND" en comunicaciones aeronáuticas?',
        '["Interrumpa la aproximación y ascienda", "Continúe con la aproximación", "Gire alrededor del aeropuerto", "Proceda a su destino alternativo"]',
        'Interrumpa la aproximación y ascienda',
        '"GO AROUND" es una instrucción para que el piloto interrumpa su aproximación, abandone el intento de aterrizaje, aplique potencia, establezca ascenso y siga los procedimientos de aproximación frustrada o las instrucciones específicas del ATC.',
        1
    ),
    (
        'communications',
        '¿Qué significa la frase "CORRECTION" en comunicaciones aeronáuticas?',
        '["Se ha cometido un error en la transmisión, la versión correcta es...", "Corrija su altitud", "Confirme su posición", "Ajuste su rumbo"]',
        'Se ha cometido un error en la transmisión, la versión correcta es...',
        '"CORRECTION" se utiliza cuando el emisor del mensaje se da cuenta de que ha cometido un error durante la transmisión. Tras decir "CORRECTION", debe repetirse la parte correcta del mensaje para aclarar cualquier malentendido.',
        1
    ),
    (
        'communications',
        '¿Qué significa "MAINTAIN FLIGHT LEVEL" en comunicaciones aeronáuticas?',
        '["Permanezca en el nivel de vuelo especificado", "Ascienda al nivel de vuelo especificado", "Descienda al nivel de vuelo especificado", "Mantenga su velocidad actual"]',
        'Permanezca en el nivel de vuelo especificado',
        '"MAINTAIN FLIGHT LEVEL" es una instrucción para permanecer en el nivel de vuelo especificado. No implica ascenso ni descenso, sino mantener la altitud indicada.',
        1
    );
-- Lote 3: Sistemas de comunicación y procedimientos específicos
INSERT INTO questions (
        category_id,
        text,
        options,
        correct_answer,
        explanation,
        difficulty
    )
VALUES (
        'communications',
        '¿Qué frecuencia se utiliza internacionalmente como frecuencia de emergencia aeronáutica?',
        '["121.5 MHz", "243.0 MHz", "125.5 MHz", "118.0 MHz"]',
        '121.5 MHz',
        'La frecuencia de 121.5 MHz es la frecuencia internacional de emergencia aeronáutica en VHF. Todas las estaciones terrestres y aeronaves deben mantener escucha en esta frecuencia cuando sea posible. También existe una frecuencia de emergencia militar en UHF de 243.0 MHz.',
        1
    ),
    (
        'communications',
        '¿Qué es ATIS en comunicaciones aeronáuticas?',
        '["Automatic Terminal Information Service - servicio automático de información de terminal", "Air Traffic Intelligence System", "Advance Terminal Instruction Service", "Automated Takeoff Information System"]',
        'Automatic Terminal Information Service - servicio automático de información de terminal',
        'ATIS (Automatic Terminal Information Service) es un servicio continuo de radiodifusión que proporciona información operativa rutinaria para aeródromos específicos, como condiciones meteorológicas, pistas en uso, niveles de transición, información esencial para las operaciones, etc. Cada transmisión se identifica con una letra del alfabeto fonético.',
        1
    ),
    (
        'communications',
        '¿Qué significa la frase "BREAK BREAK" en comunicaciones aeronáuticas?',
        '["Indica una separación entre mensajes transmitidos a diferentes aeronaves en un entorno muy ocupado", "Solicita interrumpir las comunicaciones inmediatamente", "Indica una emergencia", "Informa de un fallo en las comunicaciones"]',
        'Indica una separación entre mensajes transmitidos a diferentes aeronaves en un entorno muy ocupado',
        '"BREAK BREAK" se utiliza para separar partes de un mensaje que se transmiten a diferentes aeronaves en un entorno de comunicaciones muy ocupado. Permite a cada receptor identificar claramente qué parte del mensaje está dirigida a él.',
        2
    ),
    (
        'communications',
        '¿Qué significa "RADIO CHECK" en comunicaciones aeronáuticas?',
        '["Solicitud para verificar la calidad de las comunicaciones", "Verificación del equipo de radio antes del vuelo", "Anuncio de que se va a revisar el equipo de radio", "Confirmación de que el radio está funcionando"]',
        'Solicitud para verificar la calidad de las comunicaciones',
        '"RADIO CHECK" es una solicitud para verificar la calidad de las comunicaciones radio. La respuesta debe incluir una indicación de la legibilidad de la transmisión en una escala de 1 a 5, donde 5 significa "perfectamente legible" y 1 significa "ilegible".',
        1
    ),
    (
        'communications',
        '¿Qué significa "WORDS TWICE" en comunicaciones aeronáuticas?',
        '["Solicitud de que cada palabra o grupo de palabras se diga dos veces debido a condiciones difíciles", "Repita su mensaje completo", "Ha dicho la misma palabra dos veces", "Utilice frases más cortas"]',
        'Solicitud de que cada palabra o grupo de palabras se diga dos veces debido a condiciones difíciles',
        '"WORDS TWICE" es una solicitud o instrucción que indica que, debido a dificultades de comunicación, cada palabra o grupo de palabras debe pronunciarse dos veces. Por ejemplo: "Lima Lima, Alfa Alfa, November November, Delta Delta..." en lugar de "Lima, Alfa, November, Delta...".',
        2
    ),
    (
        'communications',
        '¿Qué significa "UNABLE" en comunicaciones aeronáuticas?',
        '["No puedo cumplir con su instrucción o autorización", "No entiendo su mensaje", "No he recibido su transmisión completa", "No estoy listo para proceder"]',
        'No puedo cumplir con su instrucción o autorización',
        '"UNABLE" se utiliza para indicar que no es posible cumplir con una instrucción o autorización recibida. Es una forma estándar de comunicar que no se puede ejecutar lo solicitado, y generalmente debe ir seguida de una explicación breve.',
        1
    ),
    (
        'communications',
        '¿Qué significa "REPORT" en comunicaciones aeronáuticas?',
        '["Solicitud para proporcionar información específica", "Confirme que ha recibido mi mensaje", "Presente un informe de incidente", "Comuníquese con la siguiente frecuencia"]',
        'Solicitud para proporcionar información específica',
        '"REPORT" se utiliza para solicitar que el piloto proporcione información específica, como "REPORT PASSING FLIGHT LEVEL 120" o "REPORT ESTABLISHED ON LOCALIZER". Indica que el piloto debe comunicar la información solicitada cuando corresponda.',
        1
    ),
    (
        'communications',
        '¿Qué información debe incluir un mensaje inicial de socorro MAYDAY?',
        '["Identificación, posición, naturaleza de la emergencia, intenciones, información útil para la asistencia", "Solo identificación y posición", "Solo naturaleza de la emergencia", "Solo identificación y solicitud de ayuda"]',
        'Identificación, posición, naturaleza de la emergencia, intenciones, información útil para la asistencia',
        'Un mensaje inicial de socorro debe incluir, en lo posible y en este orden: la señal MAYDAY (repetida 3 veces), identificación de la aeronave, naturaleza de la condición de emergencia, intención del piloto al mando, posición actual, altitud o nivel de vuelo, cualquier otra información útil como rumbo, velocidad, etc.',
        1
    ),
    (
        'communications',
        '¿Qué significa el término "HEAVY" cuando se utiliza junto al indicativo de una aeronave?',
        '["Indica que es una aeronave de categoría pesada por su estela turbulenta", "Indica que la aeronave está en sobrepeso", "Indica que la aeronave transporta carga peligrosa", "Indica que la aeronave está operando a máxima capacidad"]',
        'Indica que es una aeronave de categoría pesada por su estela turbulenta',
        'El término "HEAVY" se añade al indicativo de llamada de aeronaves certificadas con una masa máxima de despegue de 136,000 kg o más, para alertar sobre el potencial peligro de su estela turbulenta. Por ejemplo: "Air France three four two HEAVY".',
        1
    ),
    (
        'communications',
        '¿Qué es CPDLC en comunicaciones aeronáuticas?',
        '["Controller-Pilot Data Link Communications - comunicaciones por enlace de datos entre controlador y piloto", "Cockpit Pre-Departure Link Check", "Central Processing Data Link Control", "Combined Pilot Directional Link Communication"]',
        'Controller-Pilot Data Link Communications - comunicaciones por enlace de datos entre controlador y piloto',
        'CPDLC (Controller-Pilot Data Link Communications) es un sistema que permite el intercambio de mensajes de texto entre controladores y pilotos, complementando las comunicaciones de voz por radio. Se utiliza principalmente en operaciones oceánicas y permite transmitir autorizaciones, solicitudes e información de manera más eficiente.',
        2
    );
-- Actualizar el contador de preguntas para esta categoría
UPDATE categories
SET total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE category_id = 'communications'
    )
WHERE id = 'communications';