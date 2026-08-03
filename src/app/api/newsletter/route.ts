import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = await newsletterSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este correo ya está suscrito al boletín" },
        { status: 409 },
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validated.email,
        name: validated.name || null,
      },
    });

    return NextResponse.json(
      { success: true, id: subscriber.id },
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

    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Error al procesar la suscripción" },
      { status: 500 },
    );
  }
}
