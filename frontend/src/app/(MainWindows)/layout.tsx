import type { PropsWithChildren } from "react";

import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["cyrillic"],
  variable: "--var-openSans"
});

export default function MainLayout({children}: PropsWithChildren){
  return (
    <html lang="ru">
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}
