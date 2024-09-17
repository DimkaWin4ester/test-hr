'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import client from '@/lib/client';
import { gql } from '@apollo/client';

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export default function Login() {
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation {
            login(email: "${email}", password: "${password}") {
              access_token
              refresh_token
            }
          }
        `,
      });

      if (data.login) {
        console.log('data', data);
        localStorage.setItem('access_token', data.login.access_token);
        localStorage.setItem('refresh_token', data.login.refresh_token);
        window.location.href = '/';
      }

    } catch (error) {
      console.error(error);
    }
  };
  console.log(email, password);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen items-center justify-center"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
