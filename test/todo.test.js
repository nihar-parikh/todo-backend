import chai from "chai";
let expect = chai.expect;
let should = chai.should();
import chaiHttp from "chai-http";

const BASE_URL = `http://localhost:8000/api/v1/todo`;

// Configure Chai
chai.use(chaiHttp);

describe("API Tests", () => {
  // Test the GET /todos route
  describe("GET /todo", () => {
    it("should return all todos", (done) => {
      chai
        .request(`${BASE_URL}`)
        .get("/all")
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body)
            .to.be.a("object")
            .that.has.all.keys(["data", "message"]);
          Object.entries(res.body.data).map((entry) => {
            let key = entry[0];
            let value = entry[1];

            switch (key) {
              case "_id":
                expect(value).to.be.a("string");
                break;
              case "title":
                expect(value).to.be.a("string");
                break;
              case "isComplete":
                expect(value).to.be.a("boolean");
                break;
              case "createdAt":
                expect(value).to.be.a("string");
                break;
              case "updatedAt":
                expect(value).to.be.a("string");
                break;
              case "__v":
                expect(value).to.be.a("number");
                break;
              default:
            }
          });
          done();
        });
    });
  });

  //   Test the POST /users route
  describe("POST /todo", () => {
    it("should create a new todo", (done) => {
      const newToDo = {
        title: "radha1",
      };
      chai
        .request(`${BASE_URL}`)
        .post("/create")
        .send(newToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be
            .an("object")
            .that.has.all.keys(["data", "message"]);
          res.body.data.should.have.property("title").eq(newToDo.title);
          res.body.data.should.have.property("isComplete").eq(false);
          expect(res.body.message).to.be.equal("To Do created.");
          done();
        });
    });
  });

  //   Test the POST /users route
  describe("POST /todo", () => {
    it("unable to create a new todo", (done) => {
      const newToDo = {
        title: "ra",
      };
      chai
        .request(`${BASE_URL}`)
        .post("/create")
        .send(newToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object").that.has.all.keys(["errors"]);
          res.body.errors.map((error) => {
            expect(error.msg).to.be.equal("Title should be 4 to 80 characters");
          });
          done();
        });
    });
  });

  // Test the PUT /users/:id route
  describe("PUT /todo", () => {
    it("should update an existing todo", (done) => {
      const updatedToDo = {
        id: "6443a4d41459725f02d8d509",
        title: "radha2",
      };
      chai
        .request(`${BASE_URL}`)
        .put("")
        .send(updatedToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be
            .an("object")
            .that.has.all.keys(["data", "message"]);
          res.body.data.should.have.property("title").eq(updatedToDo.title);
          expect(res.body.message).to.be.equal("To Do updated.");
          done();
        });
    });
  });

  // Test the PUT /users/:id route
  describe("PUT /todo", () => {
    it("unable to update an existing todo", (done) => {
      const updatedToDo = {
        id: "6443a4d4145f02d8d509",
        title: "ra",
      };
      chai
        .request(`${BASE_URL}`)
        .put("")
        .send(updatedToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object").that.has.all.keys(["errors"]);
          res.body.errors.map((error) => {
            if (error.path === "id") {
              expect(error.msg).to.be.equal("Invalid ID");
            }
            if (error.path === "title") {
              expect(error.msg).to.be.equal(
                "Title should be 4 to 80 characters"
              );
            }
          });
          done();
        });
    });
  });

  // Test the PUT /users/:id route
  describe("PUT /todo", () => {
    it("should update a status of todo", (done) => {
      const updatedToDo = {
        id: "6443a4d41459725f02d8d509",
        isComplete: true,
      };
      chai
        .request(`${BASE_URL}`)
        .put("/status-update")
        .send(updatedToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be
            .an("object")
            .that.has.all.keys(["data", "message"]);
          res.body.data.should.have
            .property("isComplete")
            .eq(updatedToDo.isComplete);
          expect(res.body.message).to.be.equal("To Do status updated.");
          done();
        });
    });
  });

  // Test the PUT /users/:id route
  describe("PUT /todo", () => {
    it("unable to update a status of todo", (done) => {
      const updatedToDo = {
        id: "6443a4d4125f02d8d509",
        isComplete: 2,
      };
      chai
        .request(`${BASE_URL}`)
        .put("/status-update")
        .send(updatedToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object").that.has.all.keys(["errors"]);
          res.body.errors.map((error) => {
            if (error.path === "id") {
              expect(error.msg).to.be.equal("Invalid ID");
            }
            if (error.path === "isComplete") {
              expect(error.msg).to.be.equal("isComplete should be Boolean");
            }
          });
          done();
        });
    });
  });

  // Test the DELETE /users/:id route
  describe("DELETE /todo", () => {
    it("should delete an existing todo", (done) => {
      const deleteToDo = {
        id: "6443a4d41459725f02d8d509",
      };
      chai
        .request(`${BASE_URL}`)
        .delete("")
        .send(deleteToDo)
        .end((err, res) => {
          res.body.should.be
            .an("object")
            .that.has.all.keys(["data", "message"]);
          expect(res.body.message).to.be.equal("To Do deleted.");
          done();
        });
    });
  });

  // Test the DELETE /users/:id route
  describe("DELETE /todo", () => {
    it("unable to delete an existing todo", (done) => {
      const deleteToDo = {
        id: "6443a4d41459f02d8d509",
      };
      chai
        .request(`${BASE_URL}`)
        .delete("")
        .send(deleteToDo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object").that.has.all.keys(["errors"]);
          res.body.errors.map((error) => {
            if (error.path === "id") {
              expect(error.msg).to.be.equal("Invalid ID");
            }
          });
          done();
        });
    });
  });
});
