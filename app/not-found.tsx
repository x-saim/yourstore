'use client';
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Image
        src={"/images/logo.svg"}
        alt={`${APP_NAME} Logo`}
        width={48}
        height={48}
      />
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-destructive text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">
          Go to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
