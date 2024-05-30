'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login Required</CardTitle>
        </CardHeader>
        <CardContent>
          You will have to login before you can use this app.
        </CardContent>
        <CardFooter>
          <Button onClick={() => signIn()}>Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
