import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/auth";

describe("verifyToken", () => {
  const jwtSecret = "test-secret";

  beforeEach(() => {
    process.env.JWT_SECRET = jwtSecret;
  });

  it("returns the user id from a valid token", () => {
    const token = jwt.sign({ userId: "user-123" }, jwtSecret);

    expect(verifyToken(token)).toMatchObject({ userId: "user-123" });
  });

  it("returns null for an invalid token", () => {
    expect(verifyToken("invalid-token")).toBeNull();
  });

  it("returns null for a token signed with a different secret", () => {
    const token = jwt.sign({ userId: "user-123" }, "other-secret");

    expect(verifyToken(token)).toBeNull();
  });
});
