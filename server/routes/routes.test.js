const request = require("supertest");
const app = require("../index");
const models = require("../models");
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExMmU0YjUyYWI4MzMwMTdkMzg1Y2UwZDBiNGM2MDU4N2VkMjU4NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDcwOTc2NTY2Mzc1LXNvZzFwczA5MnZobWVpbmE2NWxpOGZpbWluMnIxN2poLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTIzMDI5MzAwMjczMjkyNTk0IiwiZW1haWwiOiJyb2RyaWdvZWlkZWx2ZWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRW5uSUZPMklrdTBDMXhFRWdodm9qdyIsIm5hbWUiOiJSb2RyaWdvIEZhemVuZGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd0VHUV9MSmlOeldPWXRScnlpaWM1V1NkeGEzMk5PNm5vdTVRV0I9czk2LWMiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyIsImZhbWlseV9uYW1lIjoiRmF6ZW5kYSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjI0ODI3MDAwLCJleHAiOjE2MjQ4MzA2MDAsImp0aSI6IjlmMTczZWFjM2NlNGRkOTdiZDg4MWY1Njk5MmNhZGM4MTc0YTA4ZjUifQ.Xd8c_759yb2c4je6_hammr3sg-zrxyi75RIRbYr8rKEHsu1owywVRsdijS1N34fEUoc2luPfM92GwsGc9fRqQa76axDGaj06BSR8Yjmq0L5oNsLuUricztUsTJ6jxHVYMkHtc7ZhHaEWI-2WRirggBuBSrRpSEWLQ7vwcARG2NVdpy1G6C6ziX1pwohctKwju4lgVQtd6C5J8aQk2KDEjzDzCLqMvODF07MnAllW8RhrtL5BqjwXsHApgpB1vGgZ2FP-ycrkrv2PXD_pWfko9o0fjcl8YRRqTOQ3EJd_d6tjtZ04IqW0kd7jI1PkRWY8kimdSFVm34nOIjPF0X0Npw"
const cookie = `G_AUTHUSER_H=0; token=${token}`;

describe("PadPage endpoints", () => {
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

    it("should turn the pad to private", async () => {
        const res = await request(app)
            .put(`/api/pad/type/${idPad}`)
            .send({
                type: "PRIVATE"
            })
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.type).toBe("PRIVATE");
    })

    it("should delete the pad successfully", async () => {
        const res = await request(app)
            .delete(`/api/pad/${idPad}`)
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("PadPage excluído com sucesso.");
    });
});

describe("User Endpoints", () => {
    it("should find users by email", async () => {
        const res = await request(app)
            .get(`/api/user?email=rodr`)
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].email).toBe("rodrigoeidelvein@gmail.com");
    })
})

afterAll(() => {
    models.sequelize.close();
})
