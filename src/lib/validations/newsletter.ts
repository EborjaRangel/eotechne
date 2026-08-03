import * as Yup from "yup";

export const newsletterSchema = Yup.object({
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo es requerido"),
  name: Yup.string().max(100, "Máximo 100 caracteres"),
});

export type NewsletterFormValues = Yup.InferType<typeof newsletterSchema>;

export const newsletterInitialValues: NewsletterFormValues = {
  email: "",
  name: "",
};
