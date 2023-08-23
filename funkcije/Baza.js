const pg = require("pg");
const bcrypt = require("bcrypt");

let config = {
    user: 'postgres', //env var: PGUSER
    database: 'Baza', //env var: PGDATABASE
    password: 'Lord3sc@nor1601', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 100, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

/*pool.query('Sql naredbe', [varijable], (err, results) => {
    if (err) {
        throw err;
    }
    next();
});*/
function uzmi_sve_events(req, res, next){
    if(req.user === undefined || req.user.id_institucije === null)
        pool.query('SELECT E.ID AS ID, E.NAZIV AS NAZIV, E.OPIS AS OPIS, I.NAZIV AS NAZIV_INSTITUCIJE, E.DATUM AS datum, E.SLIKA AS SLIKA, I.adresa AS ADRESA FROM EVENT E JOIN INSTITUCIJA I ON E.ID_INSTITUCIJE = I.ID WHERE DATUM > NOW()', [], (err, results) => {
            if (err) {
                throw err;
            }
            req.body.events = results.rows;
            next();
        });
    else
        pool.query('SELECT E.ID AS ID,E.DATUM AS DATUM, E.NAZIV AS NAZIV, E.OPIS AS OPIS, I.NAZIV AS NAZIV_INSTITUCIJE, E.SLIKA AS SLIKA, I.adresa AS ADRESA FROM EVENT E JOIN INSTITUCIJA I ON E.ID_INSTITUCIJE = I.ID WHERE DATUM > NOW() AND I.ID = $1', [req.user.id_institucije], (err, results) => {

            if (err) {
                throw err;
            }
            console.log("Glavni");
            console.log(results.rows);
            req.body.events = results.rows;
            next();
        });
}

function uzmi_8(req, res, next){
    pool.query('SELECT * FROM EVENT WHERE DATUM > NOW() LIMIT 8', [], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.events = results.rows;
        next();
    });
}
function uzmi_sve_institucije(req, res ,next){
    pool.query('SELECT * FROM INSTITUCIJA', [], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.locations = results.rows;
        next();
    });
}
function uzmi_instituciju(req, res ,next){
    let id = req.params.id;
    pool.query('SELECT * FROM INSTITUCIJA WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.location = results.rows[0];
        next();
    });
}

function uzmi_instituciju2(req, res ,next){
    let id = req.user.id_institucije;
    pool.query('SELECT * FROM INSTITUCIJA WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.location = results.rows[0];
        next();
    });
}

function uzmi_event_za_instituciju(req, res, next){
    let id = req.params.id;
    pool.query('SELECT * FROM EVENT WHERE ID_INSTITUCIJE = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.events = results.rows;
        next();
    });
}

function uzmi_event(req, res ,next){
    let id = req.params.id;
    pool.query('SELECT * FROM EVENT WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        req.body.event = results.rows[0];
        next();
    });
}

function provjeri_lokaciju(req, res,next){
    if(req.body.naziv_lokacije === '')
        next();
    else{
        pool.query('SELECT * FROM INSTITUCIJA WHERE NAZIV = $1', [req.body.naziv_lokacije], (err, results) => {
            if (err) {
                throw err;
            }
            if(results.rows.length === 0){
                return res.send({ne_postoji_lokacija:true, postoji_email:false});
            }else{
                req.body.location = results.rows[0];
                next();
            }


        });
    }

}

function provjeri_postojanje_korisnika(req, res, next){
    pool.query('SELECT * FROM KORISNIK WHERE EMAIL = $1', [req.body.email], (err, results) => {
        if (err) {
            throw err;
        }

        if(results.rows.length === 0){
            next();
        }
        else{
            return res.send({postoji_email:true});
        }
    });

}

function ubaci_korisnika(req, res, next){
    if(req.body.naziv_lokacije === '')
        id = null;
    else
        id = req.body.location.id;

    bcrypt.hash(req.body.password, 10).then(function(hash) {
        pool.query('INSERT INTO KORISNIK(EMAIL, SIFRA, IME, PREZIME, ID_INSTITUCIJE) VALUES($1, $2, $3, $4, $5)', [req.body.email, hash, req.body.ime, req.body.prezime, id], (err, results) => {
            if (err) {
                throw err;
            }
            return res.send();
        });
    });
}

function ubaci_instituciju(req, res, next){
    pool.query('INSERT INTO INSTITUCIJA(NAZIV, ADRESA, BROJ_TELEFONA, OPIS, SLIKA) VALUES($1, $2, $3, $4, $5)', [req.body.naziv, req.body.adresa, req.body.broj_tel, req.body.opis, req.body.slika], (err, results) => {
        if (err) {
            throw err;
        }
        return res.send({mogu:true});
    });

}

function ubaci_event(req, res, next){
    console.log("2");
    console.log(req);
    pool.query('INSERT INTO EVENT(naziv, id_institucije, datum, opis, slika) VALUES($1, $2, $3, $4, $5)', [req.body.naziv, req.user.id_institucije, req.body.datum, req.body.opis, req.body.slika], (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        return res.send({mogu:true});
    });


}

function uzmi_evente_od_institucije(){


}

function provjeri_usera(req, res, next){
    console.log("1")
    if(req.user.id_institucije === null)
        return;
    next();
}


module.exports = {uzmi_instituciju2, uzmi_event_za_instituciju, uzmi_8,uzmi_event,uzmi_instituciju, ubaci_korisnika, provjeri_postojanje_korisnika, provjeri_lokaciju, uzmi_sve_events, uzmi_sve_institucije, ubaci_instituciju, ubaci_event, provjeri_usera};