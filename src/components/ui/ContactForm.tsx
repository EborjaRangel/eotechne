"use client";

import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage, type FieldProps } from "formik";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  contactSchema,
  contactInitialValues,
  CONTACT_HONEYPOT_FIELD,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { serviceOptions } from "@/lib/data/services";
import { industryOptions } from "@/lib/data/industries";

export default function ContactForm() {
  const id = useId();
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const companyId = `${id}-company`;
  const phoneId = `${id}-phone`;
  const serviceId = `${id}-service`;
  const industryId = `${id}-industry`;
  const messageId = `${id}-message`;
  const notRobotId = `${id}-not-robot`;
  const honeypotId = `${id}-website`;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400 && data.errors) return;
        throw new Error(data.error ?? "Request failed");
      }

      setStatus("success");
      resetForm();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-eotechne-green focus:ring-2 focus:ring-eotechne-green/20";

  return (
    <Formik
      initialValues={contactInitialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="relative space-y-5">
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <Field
              id={honeypotId}
              name={CONTACT_HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-white/80">
                Nombre *
              </label>
              <Field id={nameId} name="name" type="text" placeholder="Tu nombre" className={inputClass} />
              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-400" />
            </div>
            <div>
              <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-white/80">
                Correo electrónico *
              </label>
              <Field id={emailId} name="email" type="email" placeholder="tu@empresa.com" className={inputClass} />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-400" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={companyId} className="mb-1.5 block text-sm font-medium text-white/80">
                Empresa
              </label>
              <Field id={companyId} name="company" type="text" placeholder="Nombre de tu empresa" className={inputClass} />
              <ErrorMessage name="company" component="p" className="mt-1 text-sm text-red-400" />
            </div>
            <div>
              <label htmlFor={phoneId} className="mb-1.5 block text-sm font-medium text-white/80">
                Teléfono
              </label>
              <Field id={phoneId} name="phone" type="tel" placeholder="55 3232 1113" className={inputClass} />
              <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-400" />
            </div>
          </div>

          <div>
            <label htmlFor={serviceId} className="mb-1.5 block text-sm font-medium text-white/80">
              Servicio de interés
            </label>
            <Field as="select" id={serviceId} name="service" className={inputClass}>
              <option value="" className="bg-eotechne-blue-dark">
                Selecciona un servicio
              </option>
              {serviceOptions.map((service) => (
                <option key={service} value={service} className="bg-eotechne-blue-dark">
                  {service}
                </option>
              ))}
            </Field>
            <ErrorMessage name="service" component="p" className="mt-1 text-sm text-red-400" />
          </div>

          <div>
            <label htmlFor={industryId} className="mb-1.5 block text-sm font-medium text-white/80">
              Industria
            </label>
            <Field as="select" id={industryId} name="industry" className={inputClass}>
              <option value="" className="bg-eotechne-blue-dark">
                Selecciona una industria
              </option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry} className="bg-eotechne-blue-dark">
                  {industry}
                </option>
              ))}
            </Field>
            <ErrorMessage name="industry" component="p" className="mt-1 text-sm text-red-400" />
          </div>

          <div>
            <label htmlFor={messageId} className="mb-1.5 block text-sm font-medium text-white/80">
              Mensaje *
            </label>
            <Field
              as="textarea"
              id={messageId}
              name="message"
              rows={5}
              placeholder="Cuéntanos sobre tu proyecto..."
              className={`${inputClass} resize-none`}
            />
            <ErrorMessage name="message" component="p" className="mt-1 text-sm text-red-400" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <Field name="notRobot">
                {({ field }: FieldProps<boolean>) => (
                  <input
                    id={notRobotId}
                    type="checkbox"
                    name={field.name}
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 bg-white/10 accent-eotechne-green"
                  />
                )}
              </Field>
              <label
                htmlFor={notRobotId}
                className="cursor-pointer select-none text-sm font-medium text-white/80"
              >
                No soy un robot
              </label>
            </div>
            <ErrorMessage name="notRobot" component="p" className="mt-1 text-sm text-red-400" />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-eotechne-green/10 px-4 py-3 text-eotechne-green">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">¡Mensaje enviado! Nos pondremos en contacto contigo pronto.</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-eotechne-green px-6 py-4 font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar mensaje
                <Send className="h-4 w-4 transition group-hover:translate-x-1" />
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
