// const faker = require("faker");
// const puppeteer = require("puppeteer");

// const person = {
//   email: "james@gmail.com",
//   password: "password123",
// };
// const newPerson = {
//   name: faker.name.findName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
// };
// const appUrlBase = "http://localhost:3000";
// const routes = {
//   public: {
//     register: `${appUrlBase}/register`,
//     login: `${appUrlBase}/login`,
//     noMatch: `${appUrlBase}/ineedaview`,
//   },
//   private: {
//     home: `${appUrlBase}/dashboard`,
//     account: `${appUrlBase}/myaccount`,
//   },
// };

// let browser;
// let page;

// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     headless: true,
//   });
//   page = await browser.newPage();
// });

// describe("Login", () => {
//   test("users can login and will see name displayed in greeting", async () => {
//     await page.goto(routes.public.login);
//     await page.waitForSelector("[data-testid=login-form]");
//     await page.click("input[name=email]");
//     await page.type("input[name=email]", person.email);
//     await page.click("input[name=password]");
//     await page.type("input[name=password]", person.password);
//     await page.click("[data-testid=login-button]");
//     await page.waitForSelector("[data-testid=user-name]");
//   }, 1600000);
// });

// describe("Logout", () => {
//   test("users can logout", async () => {
//     await page.waitForSelector("[data-testid=logout-button]");
//     await page.click("[data-testid=logout-button]");
//     await page.waitForSelector("[data-testid=home-wrapper]");
//   }, 9000000);
// });

// describe("Unathorized view", () => {
//   test("users that are not logged in are redirected to sign in page if they try to access private route", async () => {
//     await page.goto(routes.private.home);
//     await page.waitForSelector("[data-testid=login-form]");
//   }, 9000000);
// });

// describe("Register", () => {
//   test("users can register and will see name displayed in greeting", async () => {
//     await page.goto(routes.public.register);
//     await page.waitForSelector("[data-testid=register-form]");
//     await page.click("input[name=name]");
//     await page.type("input[name=name]", newPerson.name);
//     await page.click("input[name=email]");
//     await page.type("input[name=email]", newPerson.email);
//     await page.click("input[name=password]");
//     await page.type("input[name=password]", newPerson.password);
//     await page.click("input[name=password2]");
//     await page.type("input[name=password2]", newPerson.password);
//     await page.click("[data-testid=register-button]");
//     await page.waitForSelector("[data-testid=user-name]");

//     const userName = await page.$eval(
//       "[data-testid=user-name]",
//       (e) => e.innerHTML
//     );
//     expect(userName).toBe(newPerson.name);
//   }, 1600000);
// });

// afterAll(() => {
//   browser.close();
// });

import authReducer from "../store/reducers/authReducer";
import { USER_LOADING } from "../store/actions/authActions";

describe("Auth reducer", () => {
  test("should return default state", () => {
    const newState = authReducer(undefined, {});
    const initialState = {
      token: localStorage.getItem("token"),
      isAuthenticated: null,
      isLoading: false,
      user: null,
      role: "",
      studentToken: "",
    };
    expect(newState).toEqual(initialState);
  });

  test("should return new state if receiving type", () => {
    const newState = authReducer(undefined, { type: USER_LOADING });
    expect(newState.isLoading).toBe(true);
  });
});
