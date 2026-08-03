import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = await contactSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const contact = await prisma.contact.create({
      data: {
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        phone: validated.phone || null,
        service: validated.service || null,
        message: validated.message,
      },
    });

    await sendContactNotification({
      name: validated.name,
      email: validated.email,
      company: validated.company,
      phone: validated.phone,
      service: validated.service,
      message: validated.message,
    });

    return NextResponse.json(
      { success: true, id: contact.id },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = error.inner.reduce(
        (acc, err) => {
          if (err.path) acc[err.path] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );
      return NextResponse.json({ errors }, { status: 400 });
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
