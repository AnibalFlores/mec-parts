'use strict'
module.exports = (db, sequelize, Sequelize) => {
    // Activar word warp para ver mejor
    // Funcion auxiliar para calcular diferencia de tiempo en HH:MM:SS apartir de 2 timestamps con zona
    // si el segundo argumento es menor que el primero da la diferencia en negativo
    const funcion_hhmmss = "CREATE OR REPLACE FUNCTION extraer_hhmmss(timestamptz, timestamptz) RETURNS interval AS $$    WITH dife(x) AS ( SELECT CASE WHEN $2 > $1 then $2 - $1 ELSE $1 - $2 END), resultado AS ( SELECT ROUND(EXTRACT('epoch' FROM x) / 3600) AS horas, to_char(x, 'MI:SS') AS min_sec FROM dife) SELECT (CASE WHEN $2 < $1 THEN '-' ELSE '' END || to_char(format('%s:%s', horas, min_sec)::INTERVAL, 'HH24:MI:SS'))::INTERVAL FROM resultado; $$ LANGUAGE SQL STABLE;";

    const calcula_tiempos_procedure = "CREATE OR REPLACE FUNCTION calcula_duraciones() RETURNS trigger AS $$ DECLARE     _idlabor integer; _inicio timestamptz; _final timestamptz; _evento RECORD; _tiempo interval; _iniciopap timestamptz; _iniciomec timestamptz; _inicioope timestamptz; _tiempopap interval; _tiempomec interval; _tiempoope interval; _cursor CURSOR (labor integer) FOR SELECT * FROM eventos WHERE \"laborId\" = labor ORDER BY inicio DESC; BEGIN     _final = new.final; IF _final IS NOT NULL THEN _idlabor = new.id; OPEN _cursor(labor:= _idlabor); FETCH _cursor INTO _evento; _inicio = _evento.inicio; SELECT extraer_hhmmss(_inicio, _final) INTO _tiempo; UPDATE eventos SET duracion = _tiempo WHERE eventos.id = _evento.id; IF _evento.nombre = 'MEC' THEN     _iniciomec = _inicio; _tiempomec = _tiempo; END IF; IF _evento.nombre = 'OPE' THEN _inicioope = _inicio; _tiempoope = _tiempo; END IF; LOOP _final = _evento.inicio; FETCH _cursor INTO _evento; EXIT WHEN NOT FOUND; _inicio = _evento.inicio; SELECT extraer_hhmmss(_inicio, _final) INTO _tiempo; UPDATE eventos SET duracion = _tiempo WHERE eventos.id = _evento.id; IF _evento.nombre = 'PAP' THEN _iniciopap = _inicio; _tiempopap = _tiempo; END IF; END LOOP;     CLOSE _cursor; IF _tiempomec IS NOT NULL THEN new.iniciomec = _iniciomec; new.duracionmec = _tiempomec; END IF;     IF _tiempoope IS NOT NULL THEN new.inicioope = _inicioope; new.duracionope = _tiempoope; END IF; IF _tiempopap IS NOT NULL THEN new.iniciopap = _iniciopap; new.duracionpap = _tiempopap; END IF; END IF; RETURN NEW; END; $$     LANGUAGE plpgsql VOLATILE;";

    // console.log(calcula_tiempos_procedure);

    const calcula_tiempos_trigger = "CREATE TRIGGER calculatiempos BEFORE INSERT OR UPDATE ON labores FOR EACH ROW EXECUTE PROCEDURE calcula_duraciones();";

    const actualiza_inicio_status = "CREATE OR REPLACE FUNCTION actualiza_inicio_status() RETURNS trigger AS $$ DECLARE     _idlabor integer; _inicio timestamptz; BEGIN _idlabor = new.\"laborId\"; _inicio = new.inicio; IF _inicio IS NOT NULL THEN UPDATE terminales SET inicio = _inicio WHERE terminales.laboractual = _idlabor; END IF; RETURN NULL; END; $$     LANGUAGE plpgsql VOLATILE;";

    const actualiza_inicio_trigger = "CREATE TRIGGER actualizainicio AFTER INSERT OR UPDATE ON eventos FOR EACH ROW EXECUTE PROCEDURE actualiza_inicio_status();";

    db.sequelize.query(
        funcion_hhmmss, {
            type: sequelize.QueryTypes.RAW
        })
        .then(function (results) {
            console.log('Function Procedure de hhmmss hecho.')
        });

    db.sequelize.query(
        calcula_tiempos_procedure, {
            type: sequelize.QueryTypes.RAW
        })
        .then(function (results) {
            console.log('Stored Procedure de calculatiempos hecho.')
        });

    db.sequelize.query(
        calcula_tiempos_trigger, {
            type: sequelize.QueryTypes.RAW
        })
        .then(function (results) {
            console.log('Trigger de calcula tiempos hecho.')
        });

    db.sequelize.query(
        actualiza_inicio_status, {
            type: sequelize.QueryTypes.RAW
        })
        .then(function (results) {
            console.log('Stored Procedure de actualizainicios hecho.')
        });

    db.sequelize.query(
        actualiza_inicio_trigger, {
            type: sequelize.QueryTypes.RAW
        })
        .then(function (results) {
            console.log('Trigger de actualiza inicios hecho.')
        });

    return db;
}