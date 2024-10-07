export interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string; // Timestamp of the challenge
  hostname?: string; // Hostname where the challenge was served
  "error-codes"?: string[]; // Any potential error codes
}

export default async function TurnstileVerify(
  token: string,
): Promise<TurnstileResponse> {
  const verifyEndpoint =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret = process.env.TURNSTILE_SECRET as string;

  if (!secret) {
    throw new Error("Turnstile secret is not defined");
  }

  const res = await fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to verify Turnstile token: ${res.statusText}`);
  }

  const data: TurnstileResponse = await res.json();

  return data;
}
