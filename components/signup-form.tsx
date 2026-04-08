'use client'

import { signupAction, SignupState } from "@/app/signup/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { ErrorMessage } from "./error-message"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const [ state, formAction ] = useActionState<SignupState | null, FormData>(signupAction, null);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input id="name" type="text" name="name" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="example@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пороль</FieldLabel>
              <Input id="password" type="password" name="password" required />
              <FieldDescription>
                Пароль дролжен быть больше 8 символов
              </FieldDescription>
            </Field>
            {
              state?.error && <ErrorMessage message={state.error} />
            }
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>
                
                <FieldDescription className="px-6 text-center">
                  У вас уже есть аккаунт? <a href="/login">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
