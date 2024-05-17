import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { getUnits } from '@/actions/units';
import {
  Heading,
  HeadingDescription,
  HeadingTitle,
} from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function Units() {
  const units = await getUnits();

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Unit
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>test</DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Heading>
          <HeadingTitle>Units</HeadingTitle>
          <HeadingDescription>
            Units are used to indicate the quantity of a product.
          </HeadingDescription>
        </Heading>

        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Abbreviation</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
                <TableBody>
                  {units.map((unit) => {
                    return (
                      <TableRow>
                        <TableCell className="font-medium">
                          {unit.name}
                        </TableCell>
                        <TableCell>{unit.abbreviation}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableHeader>
            </Table>
          </div>
        </div>
        <div className="flex items-center p-6 pt-0">
          <div className="text-xs text-muted-foreground">
            <strong>{units.length}</strong> products
          </div>
        </div>
      </section>
    </>
  );
}
