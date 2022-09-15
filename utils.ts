import { Amplify, Auth } from "aws-amplify";
// import awsconfig from "./aws-exports";
import { CognitoUser } from "@aws-amplify/auth";

Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_CONFIG as string))

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
    const data = await Auth.signIn(username, password);
    return data;
  } catch (e: any) {
    throw e;
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
