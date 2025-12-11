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
import { MapPin, User, Building2 } from 'lucide-react';
import type { SelectDistrict } from 'workers/database/schema/district';

interface AddDistrictModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  district?: SelectDistrict | null;
}

export function AddDistrictModal({
  open,
  onOpenChange,
  district,
}: AddDistrictModalProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const isEdit = !!district;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? 'Edit District' : 'Add New District'}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the district information below.'
              : 'Fill in the details to create a new district.'}
          </SheetDescription>
        </SheetHeader>

        <Form method="post" className="space-y-6 mt-6">
          {/* Hidden input for action type */}
          <input
            type="hidden"
            name="_action"
            value={isEdit ? 'update' : 'create'}
          />
          {isEdit && <input type="hidden" name="id" value={district.id} />}

          {/* District Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              District Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter district name"
              defaultValue={district?.name}
              required
              className="w-full"
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
              placeholder="Enter location"
              defaultValue={district?.location}
              required
              className="w-full"
              disabled={isSubmitting}
            />
          </div>

          {/* Superintendent */}
          <div className="space-y-2">
            <Label htmlFor="superintendent" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Superintendent
            </Label>
            <Input
              id="superintendent"
              name="superintendent"
              placeholder="Enter superintendent name"
              defaultValue={district?.superintendent}
              required
              className="w-full"
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
                ? 'Update District'
                : 'Create District'}
            </Button>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
