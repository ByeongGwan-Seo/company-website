describe("User Signup API", () => {
  const baseUrl = "http://localhost:3000/api/auth";

  it("should successfully register a new user", () => {
    const uniqueUsername = `testuser_${Date.now()}`;
    cy.request("POST", `${baseUrl}/signup`, {
      username: uniqueUsername,
      password: "testpass123",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("User created successfully");
    });
  });

  /**
   * 同一ユーザー名での登録が失敗することを確認
   */
  it("should fail to register an existing user", () => {
    const reusedUsername = `duplicateuser_${Date.now()}`;

    // First: ユーザー登録
    cy.request("POST", `${baseUrl}/signup`, {
      username: reusedUsername,
      password: "testpass123",
    }).then((response) => {
      expect(response.status).to.eq(201);

      // Then: 同じユーザー情報で登録
      cy.request({
        method: "POST",
        url: `${baseUrl}/signup`,
        failOnStatusCode: false,
        body: {
          username: reusedUsername,
          password: "testpass123",
        },
      }).then((secondResponse) => {
        expect(secondResponse.status).to.eq(400);
        expect(secondResponse.body.message).to.eq("Username already exists");
      });
    });
  });

  /**
   * usernameとpasswordいずれかを入れずに登録試し
   */
  it("should fail if username or password is missing", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/signup`,
      failOnStatusCode: false,
      body: {
        username: "",
        password: "",
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });
});
