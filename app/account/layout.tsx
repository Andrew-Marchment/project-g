import SideNavigation from "../_components/SideNavigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid flex-1 px-8 py-12">
      <main className="mx-auto w-full max-w-7xl">
        <div className="grid h-full grid-cols-[16rem_1fr] gap-12 bg-background">
          <SideNavigation />
          <div className="py-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
