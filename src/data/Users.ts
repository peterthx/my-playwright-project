export interface User {
  username: string;
  password: string;
}

export const validUser: User = {
  username: "tomsmith",
  password: "SuperSecretPassword!",
};

export const invalidUser: User = {
  username: "tomholland",
  password: "SuperSecretPassword!",
};

export const invalidPassword: User = {
  username: "tomsmith",
  password: "Password!",
};

export const invalidUserPasswordBoth: User = {
  username: "tomholland",
  password: "Password!",
};
