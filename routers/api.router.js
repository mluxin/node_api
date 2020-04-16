/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();

    // Inner
    const mysql = require('mysql');

/*
Routes definition
*/
    class ApiRouterClass {

        // Inject Passport to secure routes
        constructor() {}

        // Set route fonctions
        routes(){
            /*
            CRUD: Create route
            */
                router.post('/:endpoint', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host : process.env.MYSQL_HOST,
                        port : process.env.MYSQL_PORT,
                        user : process.env.MYSQL_USER,
                        password : process.env.MYSQL_PASS,
                        database : process.env.MYSQL_DB
                    })

                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            connection.query('INSERT INTO post SET ?', {
                                title: req.body.title,
                                content: req.body.content
                            }, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })

            /*
            CRUD: Read all route
            */
                router.get('/:endpoint', (req, res) => {
                    // Set MySql connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     : 8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api_node'
                    })

                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`SELECT * FROM ${req.params.endpoint}`, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })

            /*
            CRUD: Read one route
            */
                router.get('/:endpoint/:id', (req, res) => {
                    // Set MySql connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     : 8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api_node'
                    })

                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint/:id
                            connection.query(`SELECT * FROM ${req.params.endpoint} WHERE id = ${req.params.id}`, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })

            /*
            CRUD: Update route
            */
                router.put('/:endpoint/:id', (req, res) => {

                        // Set MySQL connection
                        const connection = mysql.createConnection({
                            host     : 'localhost',
                            port     :  8889,
                            user     : 'root',
                            password : 'root',
                            database : 'api_node'
                        })

                        // Connect the DB
                        connection.connect( (connectionError) => {
                            if (connectionError) {
                                return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                            }
                            else{
                                // Get all item from table :endpoint
                                connection.query(`
                                    UPDATE ${req.params.endpoint}
                                    SET title = "${req.body.title}", content = "${req.body.content}"
                                    WHERE id = ${req.params.id}
                                `, (queryError, results, fields) => {
                                    if (queryError) {
                                        return res.json({ msg: 'MYSQL: error query', err: queryError })
                                    }
                                    else{
                                        return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                    }
                                });
                            };
                        });
                    })

            /*
            CRUD: Delete route
            */
                router.delete('/:endpoint/:id', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api_node'
                    })

                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`
                                DELETE FROM ${req.params.endpoint}
                                WHERE id = ${req.params.id}
                            `, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
        };

        // Start router
        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return router;
        };
    };
//

/*
Export
*/
    module.exports = ApiRouterClass;
//