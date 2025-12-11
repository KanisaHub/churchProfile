import { useState } from 'react';
import { Link, Form } from 'react-router';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Church as ChurchIcon,
  AlertTriangle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import type { SelectChurch } from 'workers/database/schema/church';

interface ChurchTableProps {
  churches: SelectChurch[];
  districtId: number;
  onEdit?: (church: SelectChurch) => void;
}

export function ChurchTable({
  churches,
  districtId,
  onEdit,
}: ChurchTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [churchToDelete, setChurchToDelete] = useState<SelectChurch | null>(
    null
  );

  const handleDeleteClick = (church: SelectChurch) => {
    setChurchToDelete(church);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Church Name</TableHead>
              <TableHead className="font-semibold">Pastor</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">Est. Date</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {churches.map((church, index) => (
              <TableRow
                key={church.id}
                className="group hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ChurchIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Link
                        to={`/district/${districtId}/church/${church.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {church.name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {church.pastor}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {church.location}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {church.city}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(church.establishedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <MoreHorizontal size={40} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/district/${districtId}/church/${church.id}`}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit?.(church)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(church)}
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Delete Church
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{churchToDelete?.name}</strong>? This action cannot be
              undone and will permanently remove the church from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Form method="post">
              <input type="hidden" name="_action" value="delete-church" />
              <input type="hidden" name="id" value={churchToDelete?.id} />
              <AlertDialogAction
                type="submit"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Delete
              </AlertDialogAction>
            </Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
