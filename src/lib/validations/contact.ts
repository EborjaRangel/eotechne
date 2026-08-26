import * as Yup from "yup";

export const CONTACT_HONEYPOT_FIELD = "website";

export const contactSchema = Yup.object({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .required("El nombre es requerido"),
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo es requerido"),
  company: Yup.string().max(150, "Máximo 150 caracteres"),
  phone: Yup.string().max(20, "Máximo 20 caracteres"),
  service: Yup.string(),
  industry: Yup.string(),
  message: Yup.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres")
    .required("El mensaje es requerido"),
  notRobot: Yup.boolean()
    .oneOf([true], "Confirma que no eres un robot")
    .required("Confirma que no eres un robot"),
});

export type ContactFormValues = Omit<
  Yup.InferType<typeof contactSchema>,
  "notRobot"
> & {
  notRobot: boolean;
  [CONTACT_HONEYPOT_FIELD]: string;
};

export const contactInitialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  industry: "",
  message: "",
  notRobot: false,
  [CONTACT_HONEYPOT_FIELD]: "",
};

export function isContactHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[CONTACT_HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
