import { Building2, Church, Users, TrendingUp } from 'lucide-react';
import { arushadiocese } from '~/components/data';
import { DistrictCard } from '~/components/discrict/DistrictCard';
import { StatCard } from '~/components/ui/stat-card';

export default function DistrictDaboard() {
  const totalChurches = arushadiocese.districts.reduce(
    (acc, d) => acc + d.churchCount,
    0
  );
  const totalMembers = arushadiocese.districts.reduce(
    (acc, d) => acc + d.totalMembers,
    0
  );
  const totalMissionChurches = arushadiocese.districts.reduce(
    (acc, d) =>
      acc + d.churches.reduce((sum, c) => sum + c.missionChurchCount, 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to {arushadiocese.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Overseen by {arushadiocese.bishop}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Districts"
          value={arushadiocese.districts.length}
          icon={Building2}
          variant="primary"
          description="Administrative regions"
        />
        <StatCard
          title="Total Churches"
          value={totalChurches}
          icon={Church}
          variant="gold"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Mission Churches"
          value={totalMissionChurches}
          icon={TrendingUp}
          description="Growing communities"
        />
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={Users}
          trend={{ value: 12, positive: true }}
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
              Select a district to view details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arushadiocese.districts.map((district, index) => (
            <DistrictCard key={district.id} district={district} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
