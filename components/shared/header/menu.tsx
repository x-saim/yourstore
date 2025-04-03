import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import Link from 'next/link';
import ModeToggle from './mode-toggle';
import UserButton from './user-button';

const Menu = () => {

  return (
    <>

      <div className="flex justify-end gap-3">
        {/* Desktop Menu */}
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          <ModeToggle />

          {/* Cart Button */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>

          {/* User Button */}
          <UserButton />
        </nav>

        {/* Mobile Menu */}
        <nav className="md:hidden">
          <Sheet>
            {/* SheetTrigger is the button that opens the sheet */}
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            {/* SheetContent is the content that appears when the sheet is open */}
            <SheetContent className="flex flex-col items-start">
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant="ghost">
                <Link href="/cart">
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>

              {/* User Button */}
              <UserButton />

              {/* The `SheetTitle` and `SheetDescription` components are required or you will get a warning in the console. */}
              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;