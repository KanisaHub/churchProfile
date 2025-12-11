import { Form, Link } from 'react-router';
import {
  MapPin,
  Church,
  Users,
  ChevronRight,
  AlertTriangle,
  Edit,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import type { SelectDistrict } from 'workers/database/schema/district';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';

// Extended district type with church count
interface DistrictWithCount extends SelectDistrict {
  churchCount?: number;
}

interface DistrictCardProps {
  district: DistrictWithCount;
  index: number;
  onEdit?: (district: SelectDistrict) => void;
}

export function DistrictCard({ district, index, onEdit }: DistrictCardProps) {
  // Format date for display
  const createdDate = new Date(district.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [districtToDelete, setDistrictToDelete] =
    useState<SelectDistrict | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, district: SelectDistrict) => {
    e.preventDefault();
    e.stopPropagation();
    setDistrictToDelete(district);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, district: SelectDistrict) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(district);
  };

  return (
    <>
      <Card
        className="group relative overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <Link to={`/districts/${district.id}`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {district.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {district.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-5">
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Superintendent
                </span>
                <Badge
                  variant="secondary"
                  className="font-medium bg-gradient-gold"
                >
                  {district.superintendent}
                </Badge>
              </div>

              {/* Church count and members */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Church className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {district.churchCount ?? 0}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {district.churchCount === 1 ? 'Church' : 'Churches'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <Users className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xl font-bold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>

        {/* Action Menu - Positioned absolutely in top-right */}
        <div className="absolute top-4.5 right-1 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={(e) => handleEditClick(e, district)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => handleDeleteClick(e, district)}
                className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Delete District
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{districtToDelete?.name}</strong>? This action cannot be
              undone and will permanently remove the district and all its
              associated churches from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Form method="post">
              <input type="hidden" name="_action" value="delete" />
              <input type="hidden" name="id" value={districtToDelete?.id} />
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
