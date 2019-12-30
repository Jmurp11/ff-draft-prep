import { User } from '../../entity/index';
import {
    user as userData,
} from '../../constants/test-constants';
import {
    duplicateEmail,
    emailNotLongEnough,
    passwordNotLongEnough,
    invalidEmail,
    invalidLogin,
    confirmEmailError
} from './errorMessages';
import { createTypeormConn, TestClient } from '../../utils';
import { Connection } from 'typeorm';

let conn: Connection;

beforeEach(async () => {
    conn = await createTypeormConn();
});

afterEach(async () => {
    conn.close();
});

describe("Register user", () => {
    it("check for duplicate emails", async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;
        // make sure we can register a user
        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });
        const users = await User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(userData.password);

        const response2: any = await client.register(email, userData.password, userData.username);

        expect(response2.data.register).toHaveLength(1);
        expect(response2.data.register[0]).toEqual({
            path: "email",
            message: duplicateEmail
        });
    });

    it("check bad email", async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response3: any = await client.register("b", userData.password, userData.username);
        expect(response3.data).toEqual({
            register: [
                {
                    path: "email",
                    message: emailNotLongEnough
                },
                {
                    path: "email",
                    message: invalidEmail
                }
            ]
        });
    });

    it("check bad password", async () => {
        // catch bad password
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response4: any = await client.register(userData.email, 'abcd', userData.username);
        expect(response4.data).toEqual({
            register: [
                {
                    path: "password",
                    message: passwordNotLongEnough
                }
            ]
        });
    });

    it("check bad password and bad email", async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response5: any = await client.register('df', 'abcd', userData.username);

        expect(response5.data).toEqual({
            register: [
                {
                    path: "email",
                    message: emailNotLongEnough
                },
                {
                    path: "email",
                    message: invalidEmail
                },
                {
                    path: "password",
                    message: passwordNotLongEnough
                }
            ]
        });
    });

    it("register user", async () => {
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;
        const password = userData.password;

        const client = await new TestClient(process.env.TEST_HOST as string);

        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });

        const users = await User.find({ where: { email } });


        expect(users).toHaveLength(1);

        const userTest = users[0];

        expect(userTest.email).toEqual(email);
        expect(userTest.password).not.toEqual(password)
    })
});

describe('Login User', () => {
    it('test login with invalid credentials returns error', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response = await client.login('bademail@email.com', 'badpass');

        expect(response.data).toEqual({
            login: [
                {
                    path: 'email',
                    message: invalidLogin
                }
            ]
        });
    });

    it('test login with email not confirmed', async () => {
        const email = userData.email;
        const client = await new TestClient(process.env.TEST_HOST as string);

        await client.register(email, userData.password, userData.username);

        const response = await client.login(email, userData.password);

        expect(response.data).toEqual({
            login: [
                {
                    path: 'email',
                    message: confirmEmailError
                }
            ]
        });
    });

    it('test login with wrong password returns error', async () => {
        const wrongPassword = 'wrongPassword';
        const email = 'testEmail1@test.com';
        await User.create({
            email,
            password: userData.password,
            username: userData.username,
            confirmed: true
        }).save();

        const client = await new TestClient(process.env.TEST_HOST as string);

        const response = await client.login(email, wrongPassword);
        expect(response.data).toEqual({
            login: [
                {
                    path: 'email',
                    message: invalidLogin
                }
            ]
        });
    });

    it('test login with correct credentials', async () => {
        const email = userData.email;
        const client = await new TestClient(process.env.TEST_HOST as string);

        await client.register(email, userData.password, userData.username);

        await User.update({ email }, { confirmed: true });

        const response = await client.login(email, userData.password);

        expect(response.data).toEqual({ login: null});
    });
});

describe('user queries', () => {
    it('return all users', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;

        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });

        const response2 = await client.users();

        expect(response2.data.users).toHaveLength(1);

        expect(response2.data.users[0].email).toEqual(email);
    });

    it('return user by id', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;

        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });

        const user = await User.find();
        const id = user[0].id;
        const response2 = await client.user(id);

        expect(response2.data.user.email).toEqual(email);
    });

    it('return by username', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;

        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });

        const response2 = await client.userByUsername(userData.username);

        expect(response2.data.userByUsername.username).toEqual(userData.username);
    });

    it('return by email', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);
        const email = `${Math.floor((Math.random() * 10000) + 1).toString()}${userData.email}`;

        const response = await client.register(email, userData.password, userData.username);

        expect(response.data).toEqual({ register: null });

        const response2 = await client.userByEmail(email);

        expect(response2.data.userByEmail.email).toEqual(email);
    });
})