describe("Post API Tests", () => {
  const baseUrl = "http://localhost:3000/api/post";
  const loginUrl = "http://localhost:3000/api/auth/login";
  let createdPostId = null;
  let tokenCookie = "";

  before(() => {
    cy.request({
      method: "POST",
      url: loginUrl,
      body: {
        username: Cypress.env("ADMIN_ID"),
        password: Cypress.env("ADMIN_PW"),
      },
    }).then((res) => {
      const cookies = res.headers["set-cookie"];
      const tokenHeader = cookies.find((c) => c.startsWith("token="));
      expect(tokenHeader).to.exist;
      tokenCookie = tokenHeader.split(";")[0];
    });
  });

  it("should create a new post", () => {
    cy.request({
      method: "POST",
      url: baseUrl,
      headers: {
        Cookie: tokenCookie,
      },
      body: {
        title: "Test Post",
        content: "This is a test post",
        fileUrl: ["https://example.com/file.png"],
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("title", "Test Post");
      createdPostId = res.body._id;
    });
  });

  it("should fetch all posts", () => {
    cy.request("GET", baseUrl).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  it("should fetch a post by ID with renderedContent", () => {
    cy.request("GET", `${baseUrl}/${createdPostId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("title");
      expect(res.body).to.have.property("renderedContent");
    });
  });

  it("should update the post and expect message", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/${createdPostId}`,
      headers: {
        Cookie: tokenCookie,
      },
      body: {
        title: "Updated Title",
        content: "Updated Content ![](https://example.com/old.png)",
        fileUrl: ["https://example.com/updated.png"],
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("修正しました");
      expect(res.body.post.title).to.eq("Updated Title");
    });
  });

  it("should delete the post and remove files", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/${createdPostId}`,
      headers: {
        Cookie: tokenCookie,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("投稿した掲示物とファイルを削除しました");
    });
  });
});
