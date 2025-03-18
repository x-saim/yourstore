import { APP_NAME } from "@/lib/constants";



const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t">
      <div className="p-5 flex-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;