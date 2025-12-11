import { useState } from 'react';
import {
  useLoaderData,
  useActionData,
  useNavigation,
  redirect,
  data,
} from 'react-router';
import type { Route } from './+types/DistrictPage';
import { Building2, Church, Users, TrendingUp } from 'lucide-react';
import { DistrictCard } from '~/components/discrict/DistrictCard';
import { AddDistrictModal } from '~/components/modal/AddDistrictModal';
import { Button } from '~/components/ui/button';
import { StatCard } from '~/components/ui/stat-card';
import type { SelectDistrict } from 'workers/database/schema/district';

/* -----------------------------------------------------------
   LOADER - Fetch all districts
----------------------------------------------------------- */
export async function loader({ context }: Route.LoaderArgs) {
  try {
    const districts = await context.services.district.getAll({
      limit: 100,
      offset: 0,
      sortBy: 'name',
      sortOrder: 'asc',
    });

    return data({ districts, error: null }, { status: 200 });
  } catch (error) {
    console.error('Error loading districts:', error);
    return data(
      { districts: [], error: 'Failed to load districts' },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   ACTION - Handle CRUD operations
----------------------------------------------------------- */
export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const actionType = formData.get('_action');

  try {
    switch (actionType) {
      case 'create': {
        const name = formData.get('name') as string;
        const location = formData.get('location') as string;
        const superintendent = formData.get('superintendent') as string;

        if (!name || !location || !superintendent) {
          return data(
            { success: false, error: 'All fields are required' },
            { status: 400 }
          );
        }

        // // Check if district already exists
        // const exists = await context.services.district.exists(name);
        // if (exists) {
        //   return data(
        //     { success: false, error: 'District with this name already exists' },
        //     { status: 400 }
        //   );
        // }

        const newDistrict = await context.services.district.create({
          name,
          location,
          superintendent,
        });

        if (!newDistrict) {
          return data(
            { success: false, error: 'Failed to create district' },
            { status: 500 }
          );
        }

        return data({ success: true, district: newDistrict }, { status: 201 });
      }

      case 'update': {
        const id = parseInt(formData.get('id') as string);
        const name = formData.get('name') as string;
        const location = formData.get('location') as string;
        const superintendent = formData.get('superintendent') as string;

        if (!id || isNaN(id)) {
          return data(
            { success: false, error: 'Invalid district ID' },
            { status: 400 }
          );
        }

        const updatedDistrict = await context.services.district.update(id, {
          name,
          location,
          superintendent,
        });

        if (!updatedDistrict) {
          return data(
            { success: false, error: 'Failed to update district' },
            { status: 500 }
          );
        }

        return data(
          { success: true, district: updatedDistrict },
          { status: 200 }
        );
      }

      case 'delete': {
        const id = parseInt(formData.get('id') as string);

        if (!id || isNaN(id)) {
          return data(
            { success: false, error: 'Invalid district ID' },
            { status: 400 }
          );
        }

        const deleted = await context.services.district.delete(id);

        if (!deleted) {
          return data(
            { success: false, error: 'Failed to delete district' },
            { status: 500 }
          );
        }

        return data({ success: true }, { status: 200 });
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
export default function DistrictDashboard() {
  const { districts, error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<SelectDistrict | null>(
    null
  );

  // Close modal on successful submission
  const isSubmitting = navigation.state === 'submitting';
  if (actionData?.success && isModalOpen && !isSubmitting) {
    setIsModalOpen(false);
    setEditingDistrict(null);
  }

  // Calculate stats
  const totalDistricts = districts.length;

  return (
    <div className="space-y-8">
      {/* Error Alert */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* Action Error Alert */}
      {actionData && !actionData.success && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Error: {actionData.success}</p>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          District Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage all church districts and their information
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Districts"
          value={totalDistricts}
          icon={Building2}
          variant="primary"
          description="Administrative regions"
        />
        <StatCard
          title="Total Churches"
          value={0}
          icon={Church}
          variant="gold"
          description="Coming soon"
        />
        <StatCard
          title="Mission Churches"
          value={0}
          icon={TrendingUp}
          description="Coming soon"
        />
        <StatCard
          title="Total Members"
          value={0}
          icon={Users}
          description="Coming soon"
        />
      </div>

      {/* Districts Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Districts Overview
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {totalDistricts > 0
                ? `Showing ${totalDistricts} district${
                    totalDistricts !== 1 ? 's' : ''
                  }`
                : 'No districts found. Create your first district.'}
            </p>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => {
              setEditingDistrict(null);
              setIsModalOpen(true);
            }}
          >
            Add District
          </Button>
        </div>

        {/* Districts Grid */}
        {totalDistricts > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((district, index) => (
              <DistrictCard
                key={district.id}
                district={district}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No districts yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first district
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Create District
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit District Modal */}
      <AddDistrictModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        district={editingDistrict}
      />
    </div>
  );
}
