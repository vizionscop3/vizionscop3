export async function verifyHCaptcha(
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  if (!secret) return false;
  if (!token) return false;
  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
