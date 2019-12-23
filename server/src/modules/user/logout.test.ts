import { createTypeormConn, TestClient } from "../../utils";
import { User } from "../../entity/index";
import { Connection } from "typeorm";
import { user as userData } from '../../constants/test-constants';

let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";

let userId: string;

beforeEach(async () => {
  conn = await createTypeormConn();
  const user = await User.create({
    email,
    password,
    username: userData.username,
    confirmed: true
  }).save();
  userId = user.id;
});

afterEach(async () => {
  conn.close();
});

describe("logout", () => {
  test("multiple sessions", async () => {
    // computer 1
    const sess1 = new TestClient(process.env.TEST_HOST as string);
    // computer 2
    const sess2 = new TestClient(process.env.TEST_HOST as string);

    await sess1.login(email, password);
    await sess2.login(email, password);
    expect(await sess1.me()).toEqual(await sess2.me());
    await sess1.logout();
    expect(await sess1.me()).toEqual(await sess2.me());
  });

  test("single session", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    await client.login(email, password);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    });

    await client.logout();

    const response2 = await client.me();

    expect(response2.data.me).toBeNull();
  });
});