import * as Yup from "yup";

export const NEWSLETTER_HONEYPOT_FIELD = "website";

export const newsletterSchema = Yup.object({
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo es requerido"),
  name: Yup.string().max(100, "Máximo 100 caracteres"),
  notRobot: Yup.boolean()
    .oneOf([true], "Confirma que no eres un robot")
    .required("Confirma que no eres un robot"),
});

export type NewsletterFormValues = Omit<
  Yup.InferType<typeof newsletterSchema>,
  "notRobot"
> & {
  notRobot: boolean;
  [NEWSLETTER_HONEYPOT_FIELD]: string;
};

export const newsletterInitialValues: NewsletterFormValues = {
  email: "",
  name: "",
  notRobot: false,
  [NEWSLETTER_HONEYPOT_FIELD]: "",
};

export function isNewsletterHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[NEWSLETTER_HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
