import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/app/admin/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    notFound();
  }

  // Bind the id to the action
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Upravit produkt</h1>
      </div>

      <form action={updateProductWithId} className="space-y-6 bg-card p-6 rounded-lg border">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Název</Label>
            <Input id="name" name="name" defaultValue={product.name} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Popis</Label>
            <Textarea id="description" name="description" defaultValue={product.description} required rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Cena (Kč)</Label>
              <Input id="price" name="price" type="number" defaultValue={product.price} required min="0" step="0.01" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Skladem (ks)</Label>
              <Input id="stock" name="stock" type="number" defaultValue={product.stock} required min="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Typ (kategorie)</Label>
              <Input id="type" name="type" defaultValue={product.type} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="movement">Strojek</Label>
              <Input id="movement" name="movement" defaultValue={product.movement} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="glass">Sklo</Label>
              <Input id="glass" name="glass" defaultValue={product.glass} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bracelet">Náramek</Label>
              <Input id="bracelet" name="bracelet" defaultValue={product.bracelet} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="images">Obrázky (JSON pole URL adres)</Label>
            <Input id="images" name="images" defaultValue={product.images} placeholder='["https://..."]' />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link href="/admin/products">
            <Button variant="outline" type="button">Zrušit</Button>
          </Link>
          <Button type="submit">Uložit změny</Button>
        </div>
      </form>
    </div>
  );
}
