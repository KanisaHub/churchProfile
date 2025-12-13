import { useLoaderData, data } from 'react-router';
import type { Route } from './+types/church.$id';
import { ChurchTabs } from '~/components/church/churchTabs';
import { Breadcrumb } from '~/layout/Breadcrumb';
import { Button } from '~/components/ui/button';

/* -----------------------------------------------------------
   LOADER - Fetch church and district details
----------------------------------------------------------- */
export async function loader({ params, context }: Route.LoaderArgs) {
  const churchId = parseInt(params.churchId);
  const districtId = parseInt(params.districtId);

  if (isNaN(churchId) || isNaN(districtId)) {
    return data(
      { church: null, district: null, error: 'Invalid church or district ID' },
      { status: 400 }
    );
  }

  try {
    const [church, district] = await Promise.all([
      context.services.church.getChurchById(churchId),
      context.services.district.getById(districtId),
    ]);

    if (!church) {
      return data(
        { church: null, district: null, error: 'Church not found' },
        { status: 404 }
      );
    }

    if (!district) {
      return data(
        { church: null, district: null, error: 'District not found' },
        { status: 404 }
      );
    }

    return data({ church, district, error: null }, { status: 200 });
  } catch (error) {
    console.error('Error loading church details:', error);
    return data(
      {
        church: null,
        district: null,
        error: 'Failed to load church details',
      },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------------
   COMPONENT
----------------------------------------------------------- */
export default function ChurchDetails() {
  const { church, district, error } = useLoaderData<typeof loader>();

  // Handle loader error
  if (error || !church || !district) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-destructive font-medium">
          {error || 'Church not found'}
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Districts', href: '/districts' },
          { label: district.name, href: `/districts/${district.id}` },
          { label: church.name },
        ]}
      />

      {/* Church Tabs */}
      <ChurchTabs church={church} districtId={district.id} />
    </div>
  );
}
