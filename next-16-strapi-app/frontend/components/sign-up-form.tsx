"use client"
import { useActionState, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { actions } from '@/actions'
import { type FormState } from '@/intefaces/auth-state';

const INITIAL_STATE: FormState = {
  success: false,
  message: 'Validation error',
  strapiErrors: null,
  data: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  errors: null
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [formState, formAction, isPending] = useActionState(actions.auth.registerUserAction, INITIAL_STATE)

  console.log({ formState, isPending })

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>
            Completa el formulario para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={formAction}>
            <div className="space-y-2">
              <Label htmlFor="register-name">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Juan Pérez"
                  className="pl-10"
                  name="fullName"
                  defaultValue={formState.data?.fullName ?? ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10"
                  name="email"
                  defaultValue={formState.data?.email ?? ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  name="password"
                  defaultValue={formState.data?.password ?? ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  name="confirmPassword"
                  defaultValue={formState.data?.confirmPassword ?? ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {formState.errors && (
              <Alert variant="destructive">
                {
                  Object.entries(formState.errors)
                    .map(([_, value], index) => (
                      <AlertDescription key={index + 'errors'} className="flex items-center" >
                        <AlertCircle className="h-4 w-4" />
                        {value as string}
                      </AlertDescription>
                    ))
                }
              </Alert>
            )}

            {formState.strapiErrors && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formState.strapiErrors.message}</AlertDescription>
              </Alert>
            )}
            {formState.success && (
              <Alert className="border-green-500 text-green-700 bg-green-50">
                <AlertDescription>{formState.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link
            href="/signin"
            className="text-sm text-blue-600 hover:underline w-full text-center"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
