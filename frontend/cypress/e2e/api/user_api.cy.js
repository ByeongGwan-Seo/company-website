describe("User Signup API", () => {
  const apiUrl = Cypress.env("apiUrl");
  const baseUrl = `${apiUrl}/auth`;
  const loginUrl = `${apiUrl}/auth/login`;
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

  /**
   * ログイン後、ログアウト時にクッキーが削除されることを確認
   */
  it("should delete token cookie after logout", () => {
    const username = `logoutTestUser_${Date.now()}`;
    const password = "testpass123";

    // 1. signup
    cy.request("POST", `${baseUrl}/signup`, {
      username,
      password,
    }).then(() => {
      // 2. login + 자동 쿠키 저장
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: { username, password },
      });

      // 3. dummy 페이지 방문해서 쿠키 sync
      cy.visit("/"); // 아무 페이지나 OK, 쿠키 반영되게

      // 4. 쿠키 존재 확인
      cy.getCookie("token").should("exist");

      // 5. 로그아웃 (쿠키 전송됨)
      cy.request("POST", `${baseUrl}/logout`);

      // 6. 다시 dummy 방문해서 쿠키 상태 업데이트
      cy.visit("/");

      // 7. 쿠키가 사라졌는지 확인
      cy.getCookie("token").should("not.exist");
    });
  });
});
