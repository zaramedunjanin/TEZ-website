const pg = require("pg");

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
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function provjeri_logovanje(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next()
}

function daj_pristup(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        pool.query(`SELECT * FROM KORISNIK WHERE EMAIL = $1`, [email], (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt.compare(password, user.sifra, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Šifra je netačna" });
                    }
                });
            } else
                return done(null, false, { message: "Ne postoji user sa tim emailom" });

        });
    };
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM KORISNIK WHERE ID = $1`, [id], (err, results) => {
            if (err) {
                return done(err);
            }
                return done(null, results.rows[0]);
        });
    });
}

module.exports = {initialize, daj_pristup, provjeri_logovanje};