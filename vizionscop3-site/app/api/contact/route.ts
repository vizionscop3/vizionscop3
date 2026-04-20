import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().optional(),
  organizationType: z.string(),
  projectType: z.array(z.string()),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // For now, log the submission (in production, send via Resend)
    console.log("Contact form submission:", data);

    // TODO: Integrate with Resend when API key is configured
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'VizionScop3 Website <noreply@vizionscop3.com>',
    //   to: ['hello@vizionscop3.com'],
    //   subject: `New Contact: ${data.name} - ${data.organizationType}`,
    //   html: `...`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
