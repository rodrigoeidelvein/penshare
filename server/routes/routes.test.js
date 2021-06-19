const request = require("supertest");
const app = require("../index");
const models = require("../models");
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5ZmUyYTdiNjc5NTIzOTYwNmNhMGE3NTA3OTRhN2JkOWZkOTU5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTIzMDI5MzAwMjczMjkyNTk0IiwiZW1haWwiOiJyb2RyaWdvZWlkZWx2ZWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVWtoSEhJMUd3Tm5KYWFGN0cxUDNqQSIsIm5hbWUiOiJSb2RyaWdvIEZhemVuZGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd0VHUV9MSmlOeldPWXRScnlpaWM1V1NkeGEzMk5PNm5vdTVRV0I9czk2LWMiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImZhbWlseV9uYW1lIjoiRmF6ZW5kYSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjI0MTIxNDkzLCJleHAiOjE2MjQxMjUwOTMsImp0aSI6IjkxNDM0Y2Y3MmRlNjU2NmU3MTZlMGE3NmU4NTdkYmRiYWEwNjhlMzEifQ.zZ9qNWQQGEQM4u8M2TRcy30hY7Z7N0F2M24-KxXY37FMICkd5YojtDkv_BZspR0qPCMJikJNuY1-OxsD1PST4GR0TRB4RpZ5EH6gwB2vmVVM6RptV9Yvi-BOh26RrZTgnfZMTFHbpGrEFJPoI0AuUQ8C7W5eZWGJ_ZqfwIR50YDNw4J9WMxjCpyw6U50BW-6KPKv7yefLXRMGKGnBA18ADehXqHP2P5oi4DaAIe53bWfMY87_r5rZgaWVyYL8lNKEdIGxaxMtI_ekq5CuPtEXkQeTw35--ZxokZzHQsnhWzd5N152RR0XLR5uI1ezDJ_u3xYFESR9B5nvnqIpSiMTw"
const cookie = `G_AUTHUSER_H=0; token=${token}`;

const CategoryService = require("../services/CategoryService");
const PadService = require("../services/PadService");
const CategoryPadService = require("../services/CategoryPadService");

describe("Pad endpoints", () => {
    var idPad = "";

    it("should make a successful login", async () => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                token
            });

        expect(res.statusCode).toBe(200);
    })

    it("should create a new public pad", async () => {
        const res = await request(app)
            .post("/api/pad/")
            .set("Cookie", cookie);

        expect(res.body.pad.type).toBe("PUBLIC");
        expect(res.statusCode).toBe(201);

        idPad = res.body.pad.id;
    });

    it("should update the pad title", async () => {
        const res = await request(app)
            .put("/api/pad")
            .send({
                id: idPad,
                idUser: 1,
                title: "Test Title"
            })
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Test Title");
    });

    it("should update the content and raw content", async () => {
        const res = await request(app)
            .put("/api/pad")
            .send({
                id: idPad,
                idUser: 1,
                content: "<b>teste</b>",
                rawContent: "teste"
            })
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.content).toBe("<b>teste</b>");
        expect(res.body.rawContent).toBe("teste");
    });

    it("should get the pad with the updated information", async () => {
        const res = await request(app)
            .get(`/api/pad/${idPad}`)
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.pad.content).toBe("<b>teste</b>");
        expect(res.body.pad.rawContent).toBe("teste");
        expect(res.body.pad.title).toBe("Test Title");
        expect(res.body.pad).toEqual(
            expect.objectContaining({
                categories: expect.any(Array)
            })
        )
    });

    it("should assert that the user is the pad's owner", async () => {
        const res = await request(app)
            .get(`/api/pad/${idPad}`)
            .set("Cookie", cookie);

        expect(res.body.isOwner).toBe(true);
    });

    it("should get the most popular public pads", async () => {
        await request(app)
            .post("/api/pad/")
            .set("Cookie", cookie);

        await request(app)
            .post("/api/pad/")
            .set("Cookie", cookie);

        const res = await request(app)
            .get("/api/pad/popular/")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it("should get the pads created by the user", async () => {
        const res = await request(app)
            .get("/api/pad/user/")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it("should delete the pad successfully", async () => {
        const res = await request(app)
            .delete(`/api/pad/${idPad}`)
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Pad excluído com sucesso.");
    });
});

describe("Suggestion endpoints", () => {
    var firstPad;

    it("should make a successful login", async () => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                token
            });

        expect(res.statusCode).toBe(201);
    });

    it("should create a new suggestion", async () => {
        const user = {
            idGoogle: 123,
            firstName: "Sansão",
            fullName: "Sansão Cachorrino",
            email: "sansaocachorrino@gmail.com",
            photo: "https://i.imgur.com/01hG47d.jpeg"
        }

        // const newUser = await models.user.create(user);
        firstPad = await models.pad.findOne();
        const expected = {
            id: 1,
            idPad: firstPad.id,
            content: "<b>teste sugestão</b>",
            rawContent: "teste sugestão",
            comment: "Sugestão do Sansão",
            reviewed_at: null,
            read_at: null,
            read: null
        }

        const res = await request(app)
            .post("/api/suggestion")
            .send({
                idPad: firstPad.id,
                content: "<b>teste sugestão</b>",
                rawContent: "teste sugestão",
                comment: "Sugestão do Sansão"
            })
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(201);
        expect(res.body.suggestion).toMatchObject(expected);
    });

    it("should accept a suggestion", async () => {
        const res = await request(app)
            .put("/api/suggestion/accept/1")
            .set("Cookie", cookie);

        const expected = {id: 1, status: "APPROVED"};

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expected);
        expect(res.body.reviewed_at).not.toBeNull();
    });

    it("should create and reject a suggestion", async () => {
        const res = await request(app)
            .post("/api/suggestion")
            .send({
                idPad: firstPad.id,
                content: "<b>teste sugestão</b>",
                rawContent: "teste sugestão",
                comment: "Sugestão do Sansão"
            })
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(201);
        const idSuggestion = res.body.suggestion.id;
        const expected = {id: idSuggestion, status: "REJECTED"}

        const resReject = await request(app)
            .put(`/api/suggestion/reject/${idSuggestion}`)
            .set("Cookie", cookie);

        expect(resReject.statusCode).toBe(200);
        expect(resReject.body).toMatchObject(expected);
        expect(res.body.reviewed_at).not.toBeNull();
    })

    it("should get suggestion", async () => {
        const res = await request(app)
            .get("/api/suggestion/1")
            .set("Cookie", cookie);

        const expectedApproved = {
            id: 1,
            content: "<b>teste sugestão</b>",
            rawContent: "teste sugestão",
            comment: "Sugestão do Sansão",
            status: "APPROVED"
        }

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expectedApproved);

        const resRejected = await request(app)
            .get("/api/suggestion/2")
            .set("Cookie", cookie);

        const expectedRejected = {
            id: 2,
            content: "<b>teste sugestão</b>",
            rawContent: "teste sugestão",
            comment: "Sugestão do Sansão",
            status: "REJECTED"
        }

        expect(resRejected.statusCode).toBe(200);
        expect(resRejected.body).toMatchObject(expectedRejected);
    })

    it("should get suggestions by status", async () => {
        const resApproved = await request(app)
            .get("/api/suggestion?user=1&status=APPROVED")
            .set("Cookie", cookie);

        expect(resApproved.statusCode).toBe(200);
        expect(resApproved.body.length).toBe(1);
        expect(resApproved.body[0].status).toBe("APPROVED");

        const resRejected = await request(app)
            .get("/api/suggestion?user=1&status=REJECTED")
            .set("Cookie", cookie);

        expect(resRejected.statusCode).toBe(200);
        expect(resRejected.body.length).toBe(1);
        expect(resRejected.body[0].status).toBe("REJECTED");
    });

    it("should get all suggestions by owner", async () => {
        const idUser = 1;
        const res = await request(app)
            .get(`/api/suggestion?user=${idUser}`)
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].pad.idUser).toBe(idUser);
        expect(res.body[1].pad.idUser).toBe(idUser);
    });

    it("should delete suggestion", async () => {
        const res = await request(app)
            .delete("/api/suggestion/1")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Sugestão excluída com sucesso");
    });
});

describe("Authentication endpoints", () => {
    it("should make a successful login", async () => {
        const res = await request(app)
            .post("/api/auth")
            .send({
                token
            });

        expect(res.statusCode).toBe(201);
    });

    it("should get the user information", async () => {
        const res = await request(app)
            .get("/api/auth/me")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idGoogle: expect.any(String),
                firstName: expect.any(String),
                fullName: expect.any(String),
                email: expect.any(String),
                photo: expect.any(String)
            })
        );
    });
});

describe("Categories endpoints", () => {
    it("should create a new category", async () => {
        const res = await request(app)
            .post("/api/category")
            .send({
                name: "Desenvolvimento"
            })
            .set("Cookie", cookie)

        const expected = {
            id: 1,
            name: "Desenvolvimento"
        }

        expect(res.body).toMatchObject(expected);
        expect(res.statusCode).toBe(201);
    })

    it("should find a category by ID", async () => {
        const res = await request(app)
            .get("/api/category/1")

        const expected = {
            id: 1,
            name: "Desenvolvimento"
        }

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expected);
    });

    it("should update a category", async () => {
        const res = await request(app)
            .put("/api/category/1")
            .send({
                name: "Desenvolvimento 1"
            })
            .set("Cookie", cookie);

        const expected = {
            id: 1,
            name: "Desenvolvimento 1"
        }

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expected);
    });

    it("should find all categories", async () => {
        // create two more categories to have data to test
        await CategoryService.create({ name: "Programação" });
        await CategoryService.create({ name: "Comunicação" });

        const res = await request(app)
            .get("/api/category");

        expect(res.statusCode).toBe(200);

        // There was another category created in the previous tests
        expect(res.body.length).toBe(3);
    });

    it("should find a category by name", async () => {
        const res = await request(app)
            .get("/api/category/?name=Desenvolvimento+1")

        let expected = {
            id: 1,
            name: "Desenvolvimento 1"
        }

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toMatchObject(expected);
    });

    it("should get pads by category", async () => {
        // Get all the created pads so far
        const pads = await PadService.findAll();

        await CategoryPadService.addCategoryToPad(pads[0].id, 1);
        await CategoryPadService.addCategoryToPad(pads[1].id, 1);

        const res = await request(app)
            .get("/api/category/1/pads")

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });
})

afterAll(() => {
    models.sequelize.close();
})
