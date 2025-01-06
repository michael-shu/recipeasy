"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from 'resend';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (previousState: unknown, formData: FormData) => {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Sorry, we couldn't find an account matching those credentials. Please check your email and password and try again." }
    }
    return { error: error.message }
  }

  return redirect("/form");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  /*

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });
  
  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }*/

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "message",
    "/forgot-password",
    "If there is an email attached to your account, we will send a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Your password has successfully been changed!");
};

export const signOutAction = async () => {

  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const submitContactForm = async (prevState: unknown, formData: FormData) => {

  //console.info("This is form data", formData);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'michaelshu34@gmail.com',
      subject: 'Recipeasy contact form',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Contact Form Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333333;
    }
    table {
      border-spacing: 0;
      width: 100%;
    }
    td {
      padding: 10px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #555555;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #eeeeee;
      font-size: 12px;
      color: #777777;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .message {
      padding: 10px;
      background-color: #f9f9f9;
      border-left: 4px solid #007bff;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td>
        <div class="email-container">
          <!-- Header Section -->
          <div class="header">
            <h1>Contact Form Submission</h1>
          </div>
          
          <!-- Content Section -->
          <div class="content">
            <p><strong>You have received a new message from your contact form!</strong></p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div class="message">
              <p>${message}</p>
            </div>
            <p>You can respond directly to the sender by replying to this email or contacting them at <a href="mailto:${email}">${email}</a>.</p>
          </div>
          
          <!-- Footer Section -->
          <div class="footer">
            <p>&copy; 2025 Recipeasy Contact System</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`
    });

    return {success: "Your email has been sent successfully! I'll get back to you as soon as I can."};
  } catch (e : unknown) {
    const error = e as Error; // Type assertion to `Error`
    console.error(error.message); // Optional logging for debugging

    return {error: "Sorry, something went wrong. Please try contacting me in another way; through my website, LinkedIn or Github."};
  }
}

