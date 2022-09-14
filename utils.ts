import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./pages/aws-exports";
import { CognitoUser } from "@aws-amplify/auth";

Amplify.configure(awsconfig)

export const uuid = (): string =>
  new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

export const getLabel = (): string => {
  let inp = prompt("Enter node text: ");
  while (!inp) {
    inp = prompt("Enter node text: ");
  }
  return inp;
};

export async function signUp(username: string, password: string, email: string, name: string): Promise<SignUpData | ErrorData> {
  try {
    const { user, userConfirmed, userSub } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        preferred_username: username,
        name: name
      }
    });
    return {
      "user": user,
      "userConfirmed": userConfirmed,
      "userSub": userSub
    }
  } catch (e: any) {
    return {
      msg: e.toString()
    }
  }
}

export async function signIn(username: string, password: string): Promise<CognitoUser | ErrorData> {
  try {
    const { user } = await Auth.signIn(username, password);
    return user;
  } catch (e: any) {
    return {
      msg: e.toString()
    }
  }
}

interface SignUpData {
  user: CognitoUser;
  userConfirmed: boolean;
  userSub: string;
}

interface ErrorData {
  msg: string;
}
