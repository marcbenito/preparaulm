-- Script para realizar backup de la base de datos
-- Descripción: Este script crea una copia de la base de datos actual
-- Fecha: 2023-05-01
-- Nota: En PostgreSQL, los backups se realizan generalmente usando pg_dump desde la línea de comandos:
-- pg_dump -U username -d dbname -f backup_$(date +%Y%m%d_%H%M%S).sql
-- Este script es solo una referencia y NO funcionará directamente como script SQL en PostgreSQL.
-- Se debe ejecutar pg_dump desde la línea de comandos o desde un script de shell.
-- Ejemplo de script de shell para PostgreSQL:
/*
 #!/bin/bash
 BACKUP_DIR="./backups"
 TIMESTAMP=$(date +%Y%m%d_%H%M%S)
 DB_NAME="your_database"
 DB_USER="your_username"
 BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
 
 mkdir -p $BACKUP_DIR
 pg_dump -U $DB_USER -d $DB_NAME -f $BACKUP_FILE
 
 echo "Backup creado en: $BACKUP_FILE"
 */