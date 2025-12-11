import { Form, useNavigation } from 'react-router';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { MapPin, User, Building2, Calendar, Home } from 'lucide-react';
import type { SelectChurch } from 'workers/database/schema/church';

interface AddChurchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  church?: SelectChurch | null;
  districtId: number; // passed from page
}

export function AddChurchModal({
  open,
  onOpenChange,
  church,
  districtId,
}: AddChurchModalProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const isEdit = !!church;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Church' : 'Add New Church'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update the church's information below."
              : 'Fill in the details to create a new church.'}
          </SheetDescription>
        </SheetHeader>

        <Form method="post" className="space-y-6 mt-6">
          {/* Hidden input for action */}
          <input
            type="hidden"
            name="_action"
            value={isEdit ? 'update-church' : 'create-church'}
          />

          {isEdit && <input type="hidden" name="id" value={church.id} />}
          <input type="hidden" name="districtId" value={districtId} />

          {/* Church Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Church Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter church name"
              defaultValue={church?.name}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Pastor */}
          <div className="space-y-2">
            <Label htmlFor="pastor" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Pastor Name
            </Label>
            <Input
              id="pastor"
              name="pastor"
              placeholder="Enter pastor name"
              defaultValue={church?.pastor}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Established Date */}
          <div className="space-y-2">
            <Label
              htmlFor="establishedDate"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-primary" />
              Established Date
            </Label>
            <Input
              id="establishedDate"
              name="establishedDate"
              type="date"
              defaultValue={church?.establishedDate}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter church location"
              defaultValue={church?.location}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              City
            </Label>
            <Input
              id="city"
              name="city"
              placeholder="Enter city"
              defaultValue={church?.city}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting
                ? isEdit
                  ? 'Updating...'
                  : 'Creating...'
                : isEdit
                ? 'Update Church'
                : 'Create Church'}
            </Button>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
