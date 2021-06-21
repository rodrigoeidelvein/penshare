const request = require("supertest");
const app = require("../index");
const models = require("../models");
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5ZmUyYTdiNjc5NTIzOTYwNmNhMGE3NTA3OTRhN2JkOWZkOTU5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTIzMDI5MzAwMjczMjkyNTk0IiwiZW1haWwiOiJyb2RyaWdvZWlkZWx2ZWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiU1E2ZUlxc2JsTU1OOEMzU0ZFTmlWZyIsIm5hbWUiOiJSb2RyaWdvIEZhemVuZGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd0VHUV9MSmlOeldPWXRScnlpaWM1V1NkeGEzMk5PNm5vdTVRV0I9czk2LWMiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImZhbWlseV9uYW1lIjoiRmF6ZW5kYSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjIzOTc1ODI4LCJleHAiOjE2MjM5Nzk0MjgsImp0aSI6IjIyOTk3ZjEyZmVjZDI0OGM1OWM0OGEyMGZlY2E4ZmJhODQzMmQ3MDgifQ.w_VHIqC2DZJr-iXzQX4QE9US8wVAoVq2pjwU3x4Zu-h7Yrfwh8le2jk5idPKWJcz6mWysTo4EhyjEPyjtxiiH8_7yGYlD1DgOXCdej5QdfhEpRoooQpiCeBxVlvCxa7tA8DgarP_YaNPEDj094aYMwj38nH5zq3RREb3_Z7KAJ5TyVAWfpNx9uX2NaSyBDdn1nbF4am2kfFCId8OukVGEtT-3X0_AD_yctC81mFk8O1QcQVN4tnM-XMH6bN0qgXX-cWYhJc5Y9E5kSTGpQN6ZC43TCsRvmi8VtMJwOpTyFd1-G2QpW5KLiRG0lfe6cZBIQYbTyMeaAi7iQtcO4-8xQ"
const cookie = `G_AUTHUSER_H=0; token=${token}`;

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
    });

    it("should assert that the pad's owner", async () => {
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

afterAll(() => {
    models.sequelize.close();
})
