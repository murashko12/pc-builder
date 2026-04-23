'use client'

import { cn } from "@/lib/utils"
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
import { loginAction, LoginState } from "@/app/login/actions"
import { ErrorMessage } from "./error-message"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти с помощью вашего аккаунта</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              {
                state?.error && <ErrorMessage message={state.error} />
              }
              <Field>
                <Button 
                  type="submit"
                  className={"cursor-pointer"}
                >Войти</Button>
                <FieldDescription className="text-center">
                 У вас нету аккаунта? <a href="/signup">Зарегистрироваться</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}