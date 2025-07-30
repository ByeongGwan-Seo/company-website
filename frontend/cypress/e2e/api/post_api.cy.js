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
        username: "admin",
        password: "admin123!",
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
        fileUrl: "http://example.com/file.png",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "Test Post");
      createdPostId = response.body._id || response.body.id;
    });
  });

  it("should fetch all posts", () => {
    cy.request({
      method: "GET",
      url: baseUrl,
      headers: {
        Cookie: tokenCookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should fetch a post by ID", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/${createdPostId}`,
      headers: {
        Cookie: tokenCookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title");
    });
  });

  it("should update the post", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/${createdPostId}`,
      headers: {
        Cookie: tokenCookie,
      },
      body: {
        title: "Updated Title",
        content: "Updated Content",
        fileUrl: "http://example.com/updated.png",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("修正しました");
    });
  });

  it("should delete the post", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/${createdPostId}`,
      headers: {
        Cookie: tokenCookie,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("掲示物を削除しました");
    });
  });
});
