import chai from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import bcryptjs from 'bcryptjs';

import server from '../server.mjs';
import db from '../db/dbSettings.mjs';

// Configure chai
chai.use(chaiHttp);
chai.should();

let runningServer;

before(done => {
    db.sequelize.sync({})
        .then(() => {
            runningServer = server.listen(3000, () => {
                console.log('Server listening on port 3000...');
                bcryptjs.hash('admin', 12)
                    .then(hashedPassword => {
                        return db.Operator.create({
                            username: 'admin',
                            password: hashedPassword,
                            role: 'admin'
                        });
                    })
                    .then(() => {
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        })
        .catch(err => {
            console.log(err);
            done();
        });
});

describe("Session test", () => {
    describe("POST /api/login - valid data", () => {
        // Test to login and get authorization token in return
        it("should have response with: status equal to 200, success equal to true, message equal to 'Successfully logged in!' and token type string", (done) => {
            chai.request(runningServer)
                .post('/api/login')
                .send({
                    username: 'admin',
                    password: 'admin'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.success.should.be.equal(true);
                    res.body.message.should.be.equal('Successfully logged in!');
                    res.body.token.should.be.a('string');
                    done();
                });
        });
    });

    describe("POST /api/login - invalid username", () => {
        // Test to login with invalid username data and check if server return apropriate error in response
        it("should have response with: status equal to 422, success equal to false and message equal to 'Unprocessable Entity - User not found!'", (done) => {
            chai.request(runningServer)
                .post('/api/login')
                .send({
                    username: 'vAdmin',
                    password: 'admin'
                })
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    res.should.have.status(422);
                    res.body.success.should.be.equal(false);
                    res.body.message.should.be.equal('Unprocessable Entity - User not found!');
                    done();
                });
        });
    });
});

after(done => {
    db.Operator.findOne({
        where: {
            username: 'admin'
        }
    })
        .then(user => {
            return user.destroy();
        })
        .then(() => {
            done();
        })
        .catch(err => {
            console.log(err);
            done();
        });
});
