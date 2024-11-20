import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

// Temporary secret key for testing (NEVER use this in production!)
const TEST_SECRET =
  "your_super_secret_test_key_that_should_never_be_used_in_production";

// Create a fake token with some dummy user data
export function createTestToken() {
  console.log("Creating test token");
  const testUser = {
    _id: "673d622d935f7ba8ba6b0c39",
    username: "bookworm1",
    email: "bookworm1@example.com",
  };

  console.log("Test user data", testUser);

  return jwt.sign(
    {
      data: testUser,
    },
    TEST_SECRET,
    { expiresIn: "1h" }
  );
}

// Temporary verification function for testing
export function verifyTestToken(token: string) {
  try {
    const decoded = jwt.verify(token, TEST_SECRET) as JwtPayload;
    if (decoded.data && decoded.data._id) {
      decoded.data._id = new Types.ObjectId(decoded.data._id);
    }
    console.log("Token Verified and decoded", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification failed", error);
    return null;
  }
}
