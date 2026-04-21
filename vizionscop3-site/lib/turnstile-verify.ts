export async function verifyTurnstileToken(
  token: string,
  secret: string
): Promise<boolean> {
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }
  );

  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}
