"use client";

import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage, type FieldProps } from "formik";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  newsletterSchema,
  newsletterInitialValues,
  NEWSLETTER_HONEYPOT_FIELD,
  type NewsletterFormValues,
} from "@/lib/validations/newsletter";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export default function NewsletterForm({
  variant = "light",
  compact = false,
}: NewsletterFormProps) {
  const id = useId();
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const notRobotId = `${id}-not-robot`;
  const honeypotId = `${id}-website`;
  const [status, setStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");

  const handleSubmit = async (
    values: NewsletterFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      if (!res.ok) {
        console.error("Newsletter error:", data);
        throw new Error(data.error ?? "Request failed");
      }

      setStatus("success");
      resetForm();
    } catch {
      setStatus("error");
    }
  };

  const isDark = variant === "dark";
  const inputClass = isDark
    ? "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-eotechne-green focus:ring-2 focus:ring-eotechne-green/20"
    : "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-eotechne-blue-dark placeholder:text-gray-400 outline-none transition focus:border-eotechne-green focus:ring-2 focus:ring-eotechne-green/20";
  const checkboxClass = isDark
    ? "h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 accent-eotechne-green"
    : "h-4 w-4 shrink-0 rounded border-gray-300 bg-white accent-eotechne-green";

  return (
    <Formik
      initialValues={newsletterInitialValues}
      validationSchema={newsletterSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={`relative ${compact ? "space-y-3" : "space-y-4"}`}>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <Field
              id={honeypotId}
              name={NEWSLETTER_HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {!compact && (
            <div>
              <label
                htmlFor={nameId}
                className={`mb-1.5 block text-sm font-medium ${isDark ? "text-white/80" : "text-gray-700"}`}
              >
                Nombre (opcional)
              </label>
              <Field
                id={nameId}
                name="name"
                type="text"
                placeholder="Tu nombre"
                className={inputClass}
              />
              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-400" />
            </div>
          )}

          <div>
            {!compact && (
              <label
                htmlFor={emailId}
                className={`mb-1.5 block text-sm font-medium ${isDark ? "text-white/80" : "text-gray-700"}`}
              >
                Correo electrónico *
              </label>
            )}
            <Field
              id={emailId}
              name="email"
              type="email"
              placeholder="tu@empresa.com"
              className={inputClass}
            />
            <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-400" />
          </div>

          <div className={compact ? "flex flex-col gap-3 sm:flex-row sm:items-start" : "space-y-4"}>
            <div className="flex-1">
              <div className="flex min-h-12 items-center gap-2.5">
                <Field name="notRobot">
                  {({ field }: FieldProps<boolean>) => (
                    <input
                      id={notRobotId}
                      type="checkbox"
                      name={field.name}
                      checked={Boolean(field.value)}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`${checkboxClass} cursor-pointer`}
                    />
                  )}
                </Field>
                <label
                  htmlFor={notRobotId}
                  className={`cursor-pointer select-none text-sm font-medium ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  No soy un robot
                </label>
              </div>
              <ErrorMessage name="notRobot" component="p" className="mt-1 text-sm text-red-400" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-eotechne-green px-6 py-3 font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light disabled:cursor-not-allowed disabled:opacity-60 ${
                compact ? "sm:shrink-0" : "w-full sm:w-auto"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Suscribiendo...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Suscribirme
                </>
              )}
            </button>
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-eotechne-green/10 px-4 py-3 text-eotechne-green">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                ¡Suscripción guardada en nuestra base de datos! Recibirás nuestro
                boletín pronto.
              </p>
            </div>
          )}

          {status === "duplicate" && (
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-3 text-amber-600">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">Este correo ya está suscrito a nuestro boletín.</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-red-500">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">Hubo un error. Intenta de nuevo más tarde.</p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
