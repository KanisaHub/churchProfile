import { useState, useEffect } from 'react';
import {
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
  data,
  Form,
} from 'react-router';
import type { Route } from './+types/district.$id';
import {
  Plus,
  Church,
  Users,
  MapPin,
  Filter,
  Search,
  MoreHorizontal,
  Link,
  Edit,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { StatCard } from '~/components/ui/stat-card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Breadcrumb } from '~/layout/Breadcrumb';
import { ChurchTable } from '~/components/table/ChurchTable';
import { AddChurchModal } from '~/components/modal/addChurchModal';
import { AddDistrictModal } from '~/components/modal/AddDistrictModal';
import { toast } from 'sonner';
import { church, type SelectChurch } from 'workers/database/schema/church';
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
import type { SelectDistrict } from 'workers/database/schema';

/* -----------------------------------------------------------
   LOADER - Fetch district and its churches
----------------------------------------------------------- */
export async function loader({ params, context }: Route.LoaderArgs) {
  const districtId = parseInt(params.id);

  if (isNaN(districtId)) {
    return data(
      { district: null, churches: [], error: 'Invalid district ID' },
      { status: 400 }
    );
  }

  try {
    const [district, churches] = await Promise.all([
      context.services.district.getById(districtId),
      context.services.church.getChurchesByDistrictId(districtId),
    ]);

    if (!district) {
      return data(
        { district: null, churches: [], error: 'District not found' },
        { status: 404 }
      );
    }

    return data({ district, churches, error: null }, { status: 200 });
  } catch (error) {
    console.error('Error loading district details:', error);
    return data(
      {
        district: null,
        churches: [],
        error: 'Failed to load district details',
      },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   ACTION - Handle church and district CRUD operations
----------------------------------------------------------- */
export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const actionType = formData.get('_action');
  const districtId = parseInt(params.id);

  if (isNaN(districtId)) {
    return data(
      { success: false, error: 'Invalid district ID' },
      { status: 400 }
    );
  }

  try {
    switch (actionType) {
      case 'create-church': {
        const name = formData.get('name') as string;
        const pastor = formData.get('pastor') as string;
        const establishedDate = formData.get('establishedDate') as string;
        const location = formData.get('location') as string;
        const city = formData.get('city') as string;

        if (!name || !pastor || !establishedDate || !location || !city) {
          return data(
            { success: false, error: 'All fields are required' },
            { status: 400 }
          );
        }

        const newChurch = await context.services.church.createChurch({
          name,
          pastor,
          establishedDate,
          location,
          city,
          districtId,
        });

        if (!newChurch) {
          return data(
            { success: false, error: 'Failed to create church' },
            { status: 500 }
          );
        }

        return data(
          {
            success: true,
            church: newChurch,
            message: 'Church created successfully',
          },
          { status: 201 }
        );
      }

      case 'update-church': {
        const id = parseInt(formData.get('id') as string);
        const name = formData.get('name') as string;
        const pastor = formData.get('pastor') as string;
        const establishedDate = formData.get('establishedDate') as string;
        const location = formData.get('location') as string;
        const city = formData.get('city') as string;

        if (!id || isNaN(id)) {
          return data(
            { success: false, error: 'Invalid church ID' },
            { status: 400 }
          );
        }

        const updatedChurch = await context.services.church.updateChurch(id, {
          name,
          pastor,
          establishedDate,
          location,
          city,
        });

        if (!updatedChurch) {
          return data(
            { success: false, error: 'Failed to update church' },
            { status: 500 }
          );
        }

        return data(
          {
            success: true,
            church: updatedChurch,
            message: 'Church updated successfully',
          },
          { status: 200 }
        );
      }

      case 'delete-church': {
        const id = parseInt(formData.get('id') as string);

        if (!id || isNaN(id)) {
          return data(
            { success: false, error: 'Invalid church ID' },
            { status: 400 }
          );
        }

        const deleted = await context.services.church.deleteChurch(id);

        if (!deleted) {
          return data(
            { success: false, error: 'Failed to delete church' },
            { status: 500 }
          );
        }

        return data(
          { success: true, message: 'Church deleted successfully' },
          { status: 200 }
        );
      }

      case 'update': {
        const name = formData.get('name') as string;
        const location = formData.get('location') as string;
        const superintendent = formData.get('superintendent') as string;

        if (!name || !location || !superintendent) {
          return data(
            { success: false, error: 'All fields are required' },
            { status: 400 }
          );
        }

        const updatedDistrict = await context.services.district.update(
          districtId,
          {
            name,
            location,
            superintendent,
          }
        );

        if (!updatedDistrict) {
          return data(
            { success: false, error: 'Failed to update district' },
            { status: 500 }
          );
        }

        return data(
          {
            success: true,
            district: updatedDistrict,
            message: 'District updated successfully',
          },
          { status: 200 }
        );
      }

      case 'delete-district': {
        const deleted = await context.services.district.delete(districtId);

        if (!deleted) {
          return data(
            { success: false, error: 'Failed to delete district' },
            { status: 500 }
          );
        }

        return data(
          {
            success: true,
            message: 'District deleted successfully',
            redirect: '/districts',
          },
          { status: 200 }
        );
      }

      default:
        return data(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Action error:', error);
    return data(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   COMPONENT
----------------------------------------------------------- */
export default function DistrictDetails() {
  const { district, churches, error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [addChurchOpen, setAddChurchOpen] = useState(false);
  const [editingChurch, setEditingChurch] = useState<SelectChurch | null>(null);
  const [editDistrictOpen, setEditDistrictOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [deleteDistrictDialogOpen, setDeleteDistrictDialogOpen] =
    useState(false);

  const isSubmitting = navigation.state === 'submitting';

  // Handle action feedback with toast notifications
  useEffect(() => {
    if (actionData?.success) {
      const message =
        'message' in actionData ? actionData.message : 'Operation successful';
      toast.success(message);
      setAddChurchOpen(false);
      setEditingChurch(null);
      setEditDistrictOpen(false);

      // Redirect to districts page after successful district deletion
      if ('redirect' in actionData && actionData.redirect) {
        navigate(actionData.redirect);
      }
    } else if (actionData && !actionData.success) {
      const error =
        'error' in actionData ? actionData.error : 'Operation failed';
      toast.error(error);
    }
  }, [actionData, navigate]);

  // Handle loader error
  if (error || !district) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-destructive font-medium">
          {error || 'District not found'}
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Calculate stats - for now using simple counts since we don't have mission church data
  const totalMissionChurches = 0; // TODO: Add mission church count to schema

  const filteredChurches = churches
    .filter(
      (church) =>
        church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        church.pastor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'year')
        return (
          new Date(a.establishedDate).getTime() -
          new Date(b.establishedDate).getTime()
        );
      return 0;
    });

  const handleEditChurch = (church: SelectChurch) => {
    setEditingChurch(church);
    setAddChurchOpen(true);
  };

  const handleEditDistrict = () => {
    setEditDistrictOpen(true);
  };

  const handleDeleteDistrict = () => {
    setDeleteDistrictDialogOpen(true);
  };

  const handleAddNewChurch = () => {
    setEditingChurch(null);
    setAddChurchOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Districts', href: '/districts' },
          { label: district.name },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {district.name}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{district.location}</span>
            <span className="text-border">•</span>
            <span>
              Superintendent: <strong> {district.superintendent}</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleAddNewChurch}
            className="bg-gradient-primary gap-2"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4" />
            Add Church
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleEditDistrict}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit District
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteDistrict}
                className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete District
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Churches"
          value={churches.length}
          icon={Church}
          variant="primary"
        />
        <StatCard
          title="Mission Churches"
          value={totalMissionChurches}
          icon={Church}
          variant="gold"
        />
        <StatCard
          title="Total Members"
          value={0}
          icon={Users}
          description="Coming soon"
        />
      </div>

      {/* Churches Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="font-display text-xl font-semibold">Churches</h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search churches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="year">Sort by Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredChurches.length > 0 ? (
          <ChurchTable
            churches={filteredChurches}
            districtId={district.id}
            onEdit={handleEditChurch}
          />
        ) : (
          <div className="text-center py-20 border border-border bg-accent/5  rounded-lg">
            <Church className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No churches yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first church to this district
            </p>
            <Button
              onClick={handleAddNewChurch}
              className="bg-gradient-primary gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Church
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddChurchModal
        open={addChurchOpen}
        onOpenChange={setAddChurchOpen}
        church={editingChurch}
        districtId={district.id}
      />

      <AddDistrictModal
        open={editDistrictOpen}
        onOpenChange={setEditDistrictOpen}
        district={district}
      />

      {/* Delete District Confirmation Dialog */}
      <AlertDialog
        open={deleteDistrictDialogOpen}
        onOpenChange={setDeleteDistrictDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Delete District
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{district?.name}</strong>?
              This action cannot be undone and will permanently remove the
              district and all its associated churches from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Form method="post">
              <input type="hidden" name="_action" value="delete-district" />
              <AlertDialogAction
                type="submit"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete District
              </AlertDialogAction>
            </Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
