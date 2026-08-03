import * as Yup from "yup";

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
});

export type ContactFormValues = Yup.InferType<typeof contactSchema>;

export const contactInitialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  industry: "",
  message: "",
};
