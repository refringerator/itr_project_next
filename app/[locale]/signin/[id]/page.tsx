import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "@/navigation";
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from "@/utils/auth-helpers/settings";

import PasswordSignIn from "@/components/AuthForms/PasswordSignIn";
import SignUp from "@/components/AuthForms/Signup";
import EmailSignIn from "@/components/AuthForms/EmailSignIn";
import ForgotPassword from "@/components/AuthForms/ForgotPassword";
import UpdatePassword from "@/components/AuthForms/UpdatePassword";
import OauthSignIn from "@/components/AuthForms/OauthSignIn";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: string };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;
  const disableButton = /^true$/i.test(searchParams.disable_button);

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get("preferredSignInView")?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3 style={{ display: "flex" }}>
          {viewProp === "forgot_password"
            ? "Reset Password"
            : viewProp === "update_password"
            ? "Update Password"
            : viewProp === "signup"
            ? "Sign Up"
            : viewProp === "email_signin"
            ? "Sign in with magic link"
            : "Sign In"}
        </h3>
        {viewProp === "password_signin" && (
          <PasswordSignIn
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
          />
        )}
        {viewProp === "signup" && (
          <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
        )}
        {viewProp === "email_signin" && (
          <EmailSignIn
            allowPassword={allowPassword}
            redirectMethod={redirectMethod}
            disableButton={disableButton}
          />
        )}
        {viewProp === "forgot_password" && (
          <ForgotPassword
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
            disableButton={disableButton}
          />
        )}
        {viewProp === "update_password" && (
          <UpdatePassword redirectMethod={redirectMethod} />
        )}
        {viewProp !== "update_password" && allowOauth && (
          <>
            <OauthSignIn />
          </>
        )}
      </div>
    </>
  );
}
